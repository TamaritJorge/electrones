// app/api/secure-pdf/route.ts
import { createClient } from '@/utils/supabase/server'
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // 1. Cliente Estándar
  const supabase = await createClient()
  
  const { searchParams } = new URL(req.url)
  const exerciseId = searchParams.get('id')
  const type = searchParams.get('type') 

  if (!exerciseId || !type) {
    return new NextResponse('Faltan parámetros', { status: 400 })
  }

  // 2. Verificamos sesión
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user || !user.email) {
    return new NextResponse('Debes iniciar sesión', { status: 401 })
  }

  try {
    // 3. Obtenemos el nombre del archivo
    const { data: fileName, error: rpcError } = await supabase.rpc('get_secure_file_path', {
      p_user_id: user.id,
      p_exercise_id: exerciseId,
      p_type: type
    })

    if (rpcError || !fileName) {
      console.error("RPC Error:", rpcError)
      return new NextResponse('No se encontró el archivo o no tienes permiso.', { status: 403 })
    }

    // 4. Descarga SEGURA (RLS)
    const { data: fileBlob, error: downloadError } = await supabase
      .storage
      .from('exam-content')
      .download(fileName)

    if (downloadError) {
      console.error('Error descarga Storage:', downloadError)
      return new NextResponse('No tienes permiso para descargar este archivo.', { status: 403 })
    }

    // 5. Procesamiento PDF (Marca de agua MEJORADA)
    const arrayBuffer = await fileBlob.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const pages = pdfDoc.getPages()
    
    const watermarkText = user.email
    const dateText = new Date().toLocaleDateString('es-ES')
    
    // AJUSTES VISUALES
    const fontSize = 55 // Mucho más grande (antes era 30)
    const textWidth = helveticaFont.widthOfTextAtSize(watermarkText, fontSize)
    const textHeight = helveticaFont.heightAtSize(fontSize)
    
    pages.forEach((page) => {
      const { width, height } = page.getSize()
      
      // CÁLCULO DE CENTRADO EXACTO (Para rotación de 45 grados)
      // El texto rota alrededor de su punto de inicio (x,y).
      // Para que el CENTRO visual del texto coincida con el CENTRO de la hoja:
      // Restamos la mitad de la proyección del ancho en X e Y.
      // (width/2) - (mitad_texto * cos(45º))
      const centerX = (width / 2) - (textWidth / 2) * 0.707
      const centerY = (height / 2) - (textWidth / 2) * 0.707

      // Marca grande central
      page.drawText(watermarkText, {
        x: centerX,
        y: centerY,
        size: fontSize,
        font: helveticaFont,
        color: rgb(0.9, 0.2, 0.2), // Rojo
        opacity: 0.25, // Un pelín más opaco para que se vea bien
        rotate: degrees(45),
      })
      
      // Marca discreta en el pie
      page.drawText(`Documento para uso personal: ${user.email} - ${dateText}`, {
        x: 20,
        y: 20,
        size: 9,
        font: helveticaFont,
        color: rgb(0.5, 0.5, 0.5),
      })
    })

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    })

  } catch (err) {
    console.error('Error interno:', err)
    return new NextResponse('Error del servidor', { status: 500 })
  }
}
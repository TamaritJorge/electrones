// archivo : app/auth/callback/route.ts
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    // AHORA PONEMOS AWAIT AQUÍ PORQUE createClient ES ASÍNCRONO
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Si todo va bien, mandamos al usuario a la Home
      return NextResponse.redirect(`${origin}/`)
    }
  }

  // Si algo falla, lo devolvemos al login con un error
  return NextResponse.redirect(`${origin}/login?error=auth`)
}
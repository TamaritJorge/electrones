import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import { BsBackpackFill } from 'react-icons/bs' // Importamos la mochila

export default function InventoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 pb-24">
      {/* Cabecera Simple */}
      <div className="flex items-center gap-4 mb-8 pt-2">
        <Link href="/" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
          <FaArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Mi Inventario</h1>
      </div>

      {/* Estado Vacío (Placeholder) */}
      <div className="flex flex-col items-center justify-center h-[60vh] text-center opacity-50">
        {/* Mochila grande en el centro */}
        <BsBackpackFill className="text-7xl mb-6 text-slate-600" />
        
        <h2 className="text-xl font-semibold mb-2">Mochila Vacía</h2>
        <p className="text-sm text-slate-400 max-w-xs">
          Próximamente podrás guardar aquí tus recompensas, cartas y objetos de la tienda.
        </p>
      </div>
    </main>
  )
}
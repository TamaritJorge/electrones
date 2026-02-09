import React from 'react'

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 text-slate-300">
      <h1 className="text-3xl font-bold text-white mb-6">Términos de Servicio</h1>
      <p className="mb-4 text-sm text-slate-500">Última actualización: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">1. Aceptación de los términos</h2>
          <p>
            Al acceder y utilizar esta aplicación, aceptas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con alguna parte de los términos, no podrás acceder al servicio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">2. Uso Educativo y de Investigación</h2>
          <p>
            Esta plataforma es una herramienta educativa gamificada. Al utilizar el servicio, reconoces y aceptas que:
          </p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Tu participación es voluntaria.</li>
            <li>Tus métricas de desempeño (puntos, logros) son visibles para otros usuarios en las tablas de clasificación.</li>
            <li>Tus datos de actividad podrán ser procesados de forma <strong>anónima</strong> para fines estadísticos y de investigación académica.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">3. Conducta del usuario</h2>
          <p>
            Te comprometes a utilizar la aplicación de manera ética. Queda prohibido:
          </p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Intentar manipular las puntuaciones o "hackear" el sistema de gamificación.</li>
            <li>Utilizar lenguaje ofensivo o inapropiado en tu perfil (si aplica).</li>
            <li>Hacerse pasar por otra persona o entidad.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">4. Propiedad Intelectual</h2>
          <p>
            El servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de los desarrolladores.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">5. Terminación</h2>
          <p>
            Podemos cancelar o suspender tu acceso inmediatamente, sin previo aviso ni responsabilidad, por cualquier motivo, incluido, entre otros, si incumples los Términos (ej. trampas en el ranking).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">6. Limitación de responsabilidad</h2>
          <p>
            El servicio se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo. No nos hacemos responsables de posibles errores en el software o interrupciones del servicio.
          </p>
        </section>
      </div>
    </div>
  )
}
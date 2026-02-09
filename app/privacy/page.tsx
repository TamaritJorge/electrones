import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 text-slate-300">
      <h1 className="text-3xl font-bold text-white mb-6">Política de Privacidad</h1>
      <p className="mb-4 text-sm text-slate-500">Última actualización: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">1. Introducción</h2>
          <p>
            Bienvenido a nuestra plataforma educativa ("la Aplicación"). Nos comprometemos a proteger tu información personal y tu derecho a la privacidad. Esta política explica qué información recopilamos y cómo la utilizamos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">2. Información que recopilamos</h2>
          <p>Recopilamos la siguiente información necesaria para el funcionamiento del servicio:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li><strong>Datos de la cuenta de Google:</strong> Nombre, dirección de correo electrónico y foto de perfil (para la autenticación y creación de perfil).</li>
            <li><strong>Datos de actividad:</strong> Puntuaciones, rangos, logros y progreso en las actividades gamificadas.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">3. Uso de la información y Fines de Investigación</h2>
          <p>Utilizamos tus datos para:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Gestionar tu cuenta y permitir el inicio de sesión.</li>
            <li>Mostrar tu progreso en las tablas de clasificación (Leaderboards).</li>
          </ul>
          <p className="mt-4 bg-indigo-900/30 p-4 rounded-lg border border-indigo-500/30">
            <strong>🔬 Cláusula de Investigación:</strong><br/>
            Los datos generados por el uso de la aplicación (puntuaciones, tiempos de respuesta, progresión) podrán ser utilizados con fines de <strong>investigación académica y científica</strong>.
            <br/><br/>
            Cualquier dato publicado o compartido en estudios será <strong>estrictamente anonimizado y agregado</strong>. Nunca publicaremos tu nombre, correo electrónico o imagen en relación con estos estudios sin tu consentimiento explícito adicional.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">4. Compartir información</h2>
          <p>
            No vendemos ni alquilamos tus datos personales a terceros. Solo compartimos datos anonimizados para los fines de investigación descritos anteriormente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">5. Tus derechos</h2>
          <p>
            Tienes derecho a acceder, corregir o eliminar tus datos personales. Si deseas eliminar tu cuenta y todos tus datos asociados de nuestra base de datos, por favor contáctanos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-2">6. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta política o el uso de tus datos para investigación, ponte en contacto con los profesores de la asignatura.
          </p>
        </section>
      </div>
    </div>
  )
}
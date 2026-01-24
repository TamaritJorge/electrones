export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-6xl font-bold text-yellow-400 mb-4">
        ⚡ ALTA TENSIÓN ⚡
      </h1>
      <p className="text-xl">
        Bienvenido al sistema de gestión energética de la asignatura.
      </p>
      <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-yellow-500/30">
        Estado del Sistema: <span className="text-green-400 font-mono">ONLINE</span>
      </div>
    </div>
  );
}
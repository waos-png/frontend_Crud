export default function Header() {
  return (
    <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Clara Admin</h1>
        <p className="text-sm text-zinc-500 mt-1">Interfaz ligera para gestionar usuarios y perfiles</p>
      </div>
      <div className="hidden sm:flex items-center gap-3 text-sm text-zinc-500">
        <div className="px-3 py-1 rounded bg-zinc-100">Railway</div>
        <div className="px-3 py-1 rounded bg-zinc-100">API: motivated-patience-production-2422.up.railway.app</div>
      </div>
    </header>
  );
}

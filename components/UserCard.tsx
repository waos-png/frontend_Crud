type Props = { id: number; nombre: string; correo: string; edad?: number };

export default function UserCard({ id, nombre, correo, edad }: Props) {
  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg hover:shadow-md transition bg-white">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 text-blue-800 flex items-center justify-center font-semibold">{nombre ? nombre.charAt(0).toUpperCase() : '?'}</div>
      <div className="flex-1">
        <div className="font-medium">{nombre}</div>
        <div className="text-sm text-zinc-500">{correo} · {edad ?? '—'} años</div>
      </div>
      <div className="text-xs text-zinc-400">ID {id}</div>
    </div>
  );
}

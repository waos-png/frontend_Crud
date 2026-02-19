type Props = { id: number; bio?: string; avatarUrl?: string; fechaNacimiento?: string };

export default function ProfileCard({ id, bio, avatarUrl, fechaNacimiento }: Props) {
  return (
    <div className="border p-3 rounded-lg hover:shadow-md transition bg-white">
      <div className="flex items-center gap-3">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold">P</div>
        )}
        <div className="flex-1">
          <div className="font-medium">{bio ? (bio.length > 60 ? bio.slice(0, 57) + '…' : bio) : 'Perfil'}</div>
          {fechaNacimiento && <div className="text-sm text-zinc-500">Nacido: {fechaNacimiento}</div>}
        </div>
        <div className="text-xs text-zinc-400">ID {id}</div>
      </div>
    </div>
  );
}

import ProfileCard from "./ProfileCard";

type Perfil = { id: number; bio?: string; avatarUrl?: string; fechaNacimiento?: string };
type Props = { perfiles: Perfil[]; loading: boolean };

export default function ProfileList({ perfiles, loading }: Props) {
  if (loading) return <div className="text-sm text-zinc-500">Cargando perfiles...</div>;
  if (!perfiles || perfiles.length === 0) return <div className="text-sm text-zinc-500">No hay perfiles</div>;

  return (
    <div className="space-y-3">
      {perfiles.map((p) => (
        <ProfileCard key={p.id} id={p.id} bio={p.bio} avatarUrl={p.avatarUrl} fechaNacimiento={p.fechaNacimiento} />
      ))}
    </div>
  );
}

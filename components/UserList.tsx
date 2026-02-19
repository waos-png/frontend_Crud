import UserCard from "./UserCard";

type Usuario = { id: number; nombre: string; correo: string; edad?: number };
type Props = { usuarios: Usuario[]; loading: boolean };

export default function UserList({ usuarios, loading }: Props) {
  if (loading) return <div className="text-sm text-zinc-500">Cargando usuarios...</div>;
  if (!usuarios || usuarios.length === 0) return <div className="text-sm text-zinc-500">No hay usuarios</div>;

  return (
    <div className="space-y-3">
      {usuarios.map((u) => (
        <UserCard key={u.id} id={u.id} nombre={u.nombre} correo={u.correo} edad={u.edad} />
      ))}
    </div>
  );
}

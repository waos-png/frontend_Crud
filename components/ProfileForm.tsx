import React from "react";

type Props = {
  bio: string;
  avatarUrl: string;
  fechaNacimiento: string;
  setBio: (v: string) => void;
  setAvatarUrl: (v: string) => void;
  setFechaNacimiento: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function ProfileForm({ bio, avatarUrl, fechaNacimiento, setBio, setAvatarUrl, setFechaNacimiento, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 mb-4">
      <input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300" />
      <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="Avatar URL (opcional)" className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300" />
      <input value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} placeholder="Fecha de nacimiento (YYYY-MM-DD)" className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300" />
      <button className="rounded-md bg-green-600 text-white px-3 py-2 hover:bg-green-700 transition">Crear perfil</button>
    </form>
  );
}

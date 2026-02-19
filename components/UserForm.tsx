import React from "react";

type Props = {
  nombre: string;
  correo: string;
  edad: number | "";
  setNombre: (v: string) => void;
  setCorreo: (v: string) => void;
  setEdad: (v: number | "") => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function UserForm({ nombre, correo, edad, setNombre, setCorreo, setEdad, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" />
      <input value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" />
      <input value={edad as any} onChange={(e) => setEdad(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Edad" type="number" min={18} max={100} className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" />
      <button className="rounded-md bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 transition">Crear usuario</button>
    </form>
  );
}

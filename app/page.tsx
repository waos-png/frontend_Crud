"use client";

import React, { useEffect, useState } from "react";
import { fetchUsuarios, crearUsuario, fetchPerfiles, crearPerfil } from "../lib/api";

type Usuario = { id: number; nombre: string; email: string };
type Perfil = { id: number; nombre: string; descripcion?: string };

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoEmail, setNuevoEmail] = useState("");

  const [nuevoPerfilNombre, setNuevoPerfilNombre] = useState("");
  const [nuevoPerfilDescripcion, setNuevoPerfilDescripcion] = useState("");

  async function cargarDatos() {
    try {
      setLoading(true);
      const [u, p] = await Promise.all([fetchUsuarios(), fetchPerfiles()]);
      setUsuarios(u || []);
      setPerfiles(p || []);
      setError(null);
    } catch (e: any) {
      setError(e.message ?? "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  async function handleCrearUsuario(e: React.FormEvent) {
    e.preventDefault();
    try {
      const nuevo = await crearUsuario({ nombre: nuevoNombre, email: nuevoEmail });
      setUsuarios((s) => [nuevo, ...s]);
      setNuevoNombre("");
      setNuevoEmail("");
    } catch (e: any) {
      setError(e.message ?? "Error al crear usuario");
    }
  }

  async function handleCrearPerfil(e: React.FormEvent) {
    e.preventDefault();
    try {
      const nuevo = await crearPerfil({ nombre: nuevoPerfilNombre, descripcion: nuevoPerfilDescripcion });
      setPerfiles((s) => [nuevo, ...s]);
      setNuevoPerfilNombre("");
      setNuevoPerfilDescripcion("");
    } catch (e: any) {
      setError(e.message ?? "Error al crear perfil");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12 font-sans">
      <header className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clara Admin</h1>
          <p className="text-sm text-zinc-600 mt-1">Interfaz ligera para gestionar usuarios y perfiles</p>
        </div>
        <div className="text-sm text-zinc-500">API: motivated-patience-production-2422.up.railway.app</div>
      </header>

      <main className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
        <section className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Usuarios</h2>
            <div className="text-sm text-zinc-500">{loading ? 'Cargando...' : usuarios.length + ' usuarios'}</div>
          </div>

          <form onSubmit={handleCrearUsuario} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <input value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} placeholder="Nombre" className="border p-3 rounded-md focus:ring-2 focus:ring-blue-300" />
            <input value={nuevoEmail} onChange={(e) => setNuevoEmail(e.target.value)} placeholder="Email" className="border p-3 rounded-md focus:ring-2 focus:ring-blue-300" />
            <button className="rounded-md bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 transition">Crear usuario</button>
          </form>

          <div className="grid gap-3">
            {usuarios.length === 0 && !loading && <div className="text-sm text-zinc-500">No hay usuarios</div>}
            {usuarios.map((u) => (
              <div key={u.id} className="flex items-center gap-4 p-3 border rounded-md hover:shadow transition">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">{u.nombre ? u.nombre.charAt(0).toUpperCase() : '?'}</div>
                <div className="flex-1">
                  <div className="font-medium">{u.nombre}</div>
                  <div className="text-sm text-zinc-500">{u.email}</div>
                </div>
                <div className="text-sm text-zinc-500">ID {u.id}</div>
              </div>
            ))}
          </div>
        </section>

        <aside className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Perfiles</h3>

          <form onSubmit={handleCrearPerfil} className="flex flex-col gap-3 mb-4">
            <input value={nuevoPerfilNombre} onChange={(e) => setNuevoPerfilNombre(e.target.value)} placeholder="Nombre perfil" className="border p-2 rounded-md focus:ring-2 focus:ring-green-300" />
            <input value={nuevoPerfilDescripcion} onChange={(e) => setNuevoPerfilDescripcion(e.target.value)} placeholder="Descripción (opcional)" className="border p-2 rounded-md focus:ring-2 focus:ring-green-300" />
            <button className="rounded-md bg-green-600 text-white px-3 py-2 hover:bg-green-700 transition">Crear perfil</button>
          </form>

          <div className="space-y-3">
            {perfiles.length === 0 && !loading && <div className="text-sm text-zinc-500">No hay perfiles</div>}
            {perfiles.map((p) => (
              <div key={p.id} className="border p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{p.nombre}</div>
                  <div className="text-xs text-zinc-500">ID {p.id}</div>
                </div>
                {p.descripcion && <div className="text-sm text-zinc-600 mt-1">{p.descripcion}</div>}
              </div>
            ))}
          </div>
        </aside>
      </main>

      {error && (
        <div className="max-w-6xl mx-auto mt-6 text-red-700">Error: {error}</div>
      )}
    </div>
  );
}

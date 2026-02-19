"use client";

import React, { useEffect, useState } from "react";
import { fetchUsuarios, crearUsuario, fetchPerfiles, crearPerfil } from "../lib/api";
import Header from "../components/Header";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import ProfileForm from "../components/ProfileForm";
import ProfileList from "../components/ProfileList";

type Usuario = { id: number; nombre: string; correo: string; edad?: number };
type Perfil = { id: number; bio?: string; avatarUrl?: string; fechaNacimiento?: string };

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [nuevoEdad, setNuevoEdad] = useState<number | "">("");

  const [nuevoPerfilBio, setNuevoPerfilBio] = useState("");
  const [nuevoPerfilAvatarUrl, setNuevoPerfilAvatarUrl] = useState("");
  const [nuevoPerfilFechaNacimiento, setNuevoPerfilFechaNacimiento] = useState("");

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
      const payload: any = { nombre: nuevoNombre, correo: nuevoCorreo };
      if (nuevoEdad !== "") payload.edad = Number(nuevoEdad);
      const nuevo = await crearUsuario(payload);
      setUsuarios((s) => [nuevo, ...s]);
      setNuevoNombre("");
      setNuevoCorreo("");
      setNuevoEdad("");
    } catch (e: any) {
      setError(e.message ?? "Error al crear usuario");
    }
  }

  async function handleCrearPerfil(e: React.FormEvent) {
    e.preventDefault();
    try {
      const nuevo = await crearPerfil({ bio: nuevoPerfilBio, avatarUrl: nuevoPerfilAvatarUrl, fechaNacimiento: nuevoPerfilFechaNacimiento });
      setPerfiles((s) => [nuevo, ...s]);
      setNuevoPerfilBio("");
      setNuevoPerfilAvatarUrl("");
      setNuevoPerfilFechaNacimiento("");
    } catch (e: any) {
      setError(e.message ?? "Error al crear perfil");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12 font-sans">
      <Header />

      <main className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
        <section className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Usuarios</h2>
            <div className="text-sm text-zinc-500">{loading ? 'Cargando...' : usuarios.length + ' usuarios'}</div>
          </div>

          <UserForm nombre={nuevoNombre} correo={nuevoCorreo} edad={nuevoEdad} setNombre={setNuevoNombre} setCorreo={setNuevoCorreo} setEdad={setNuevoEdad} onSubmit={handleCrearUsuario} />

          <div className="grid gap-3">
            <UserList usuarios={usuarios} loading={loading} />
          </div>
        </section>

        <aside className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Perfiles</h3>

          <ProfileForm bio={nuevoPerfilBio} avatarUrl={nuevoPerfilAvatarUrl} fechaNacimiento={nuevoPerfilFechaNacimiento} setBio={setNuevoPerfilBio} setAvatarUrl={setNuevoPerfilAvatarUrl} setFechaNacimiento={setNuevoPerfilFechaNacimiento} onSubmit={handleCrearPerfil} />

          <div className="space-y-3">
            <ProfileList perfiles={perfiles} loading={loading} />
          </div>
        </aside>
      </main>

      {error && (
        <div className="max-w-6xl mx-auto mt-6 text-red-700">Error: {error}</div>
      )}
    </div>
  );
}

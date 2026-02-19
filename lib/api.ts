export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://motivated-patience-production-2422.up.railway.app";

export async function fetchUsuarios() {
  const res = await fetch(`${API_BASE}/usuarios`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}

export async function crearUsuario(payload: { nombre: string; email: string }) {
  const res = await fetch(`${API_BASE}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al crear usuario");
  return res.json();
}

export async function fetchPerfiles() {
  const res = await fetch(`${API_BASE}/perfiles`);
  if (!res.ok) throw new Error("Error al obtener perfiles");
  return res.json();
}

export async function crearPerfil(payload: { nombre: string; descripcion?: string }) {
  const res = await fetch(`${API_BASE}/perfiles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al crear perfil");
  return res.json();
}

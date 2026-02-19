export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function fetchUsuarios() {
  const res = await fetch(`${API_BASE}/usuarios`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}

export async function crearUsuario(payload: { nombre: string; edad: number; correo: string; profile?: any }) {
  const res = await fetch(`${API_BASE}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al crear usuario: ${res.status} ${text}`);
  }
  return res.json();
}

export async function fetchPerfiles() {
  const res = await fetch(`${API_BASE}/perfiles`);
  if (!res.ok) throw new Error("Error al obtener perfiles");
  return res.json();
}

export async function crearPerfil(payload: { bio?: string; avatarUrl?: string; fechaNacimiento?: string }) {
  const res = await fetch(`${API_BASE}/perfiles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al crear perfil: ${res.status} ${text}`);
  }
  return res.json();
}

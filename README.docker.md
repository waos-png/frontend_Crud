# Docker — frontend

Buildar la imagen (desde `c:\CRUD\frontend`):

```powershell
docker build -t clara-frontend:latest .
```

Ejecutar (mapear puerto 3000):

```powershell
docker run -e NEXT_PUBLIC_API_URL="https://motivated-patience-production-2422.up.railway.app" -p 3000:3000 --rm clara-frontend:latest
```

Notas:
- Puedes sustituir `NEXT_PUBLIC_API_URL` si necesitas otra URL.
- El contenedor expone el puerto `3000` y corre `npm run start`.

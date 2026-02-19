# Docker Compose — Clara (frontend + backend + db)

From the repository root (`c:\CRUD`) you can build and run the full stack with Docker Compose.

Build and start:

```powershell
cd C:\CRUD
docker compose up --build -d
```

Check logs:

```powershell
# backend logs
docker compose logs -f backend

# frontend logs
docker compose logs -f frontend
```

Stop and remove:

```powershell
docker compose down
```

Notes:
- The frontend will call the backend at `http://backend:8080` inside the compose network; from your host open `http://localhost:3000`.
- Edit `.env` to set secure DB passwords before using in production.
- The backend service uses the Dockerfile in `./backend`; the frontend uses the Dockerfile in `./frontend`.

# PetFind

Projeto fullstack com React (Next.js), Express API (backend) e PostgreSQL.

Estrutura inicial:

- `backend` - Express API (auth + DB)
- `frontend` - Next.js (UI)

Rápido start (Windows / PowerShell):

1) Backend (Express API)

```powershell
cd backend
npm install
# criar .env.local a partir de .env.example e ajustar DATABASE_URL/FRONTEND_URLS
npm run dev
```

2) Frontend (Next.js UI)

```powershell
cd frontend
npm install
npm run dev
```

Banco de dados:
- Instale Docker e execute: `docker-compose up -d`
- Postgres: localhost:5433
- Adminer (GUI DB): http://localhost:8080 (login: postgres/postgres/petfind)

Migrations (backend):

```powershell
cd backend
npm run db:migrate
```

Portas:
- Backend: http://localhost:4000
- Frontend: http://localhost:5423

Uploads de imagens:
- Arquivos são salvos em `backend/public/uploads`
- URLs são servidas pelo backend em `http://localhost:4000/uploads/<arquivo>`

Páginas disponíveis:
- / (home)
- /login
- /register
- /pets
- /pet-details
- /matches
- /chat

Fluxo rápido (UI):
- Cadastre usuário em `/register`
- Faça login em `/login`
- Cadastre pet em `/pets`
- Veja matches em `/matches`
- Use `/chat` com o Match ID

Endpoints (Backend API):
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/me
- GET /api/pets
- POST /api/pets
- GET /api/pets/:id
- PUT /api/pets/:id
- DELETE /api/pets/:id
- POST /api/pets/:id/like
- GET /api/matches
- GET /api/matches/:id/messages
- POST /api/matches/:id/messages

Resposta de `POST /api/pets/:id/like` (exemplo):
```json
{
	"message": "Match created",
	"matched": true,
	"match": {
		"id": 1,
		"petAId": 10,
		"petBId": 20,
		"status": "active",
		"createdAt": "2026-02-03T10:00:00.000Z",
		"updatedAt": "2026-02-03T10:00:00.000Z"
	}
}
```

Env de CORS:
Backend Express (produção e dev):

```powershell
cd backend
npm run dev
```
- `FRONTEND_URLS` aceita múltiplas origens separadas por vírgula.
	Ex: `FRONTEND_URLS=http://localhost:5423,http://localhost:3000`

Próximos passos sugeridos:
- Adicionar storage externo para uploads (S3/GCS)
- Documentar API com OpenAPI/Swagger
- Adicionar testes de integração para auth e pets

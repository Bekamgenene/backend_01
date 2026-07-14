# Task API

A small Express CRUD API for managing tasks in memory. It supports creating, reading, updating, and deleting tasks, and it exposes Swagger UI at `/docs`.

## Run locally

```bash
npm install
npm start
```

Then open:

- http://localhost:3000/
- http://localhost:3000/docs

## Endpoints

| Method | Path         | Description                 |
| ------ | ------------ | --------------------------- |
| GET    | `/`          | Returns the API description |
| GET    | `/health`    | Health check                |
| GET    | `/tasks`     | List all tasks              |
| GET    | `/tasks/:id` | Get one task                |
| POST   | `/tasks`     | Create a task               |
| PUT    | `/tasks/:id` | Update a task               |
| DELETE | `/tasks/:id` | Delete a task               |

## Example request

```bash
curl -i http://localhost:3000/tasks/1
```

Example response:

```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"id":1,"title":"Learn Express","done":false}
```

## Notes

- The task data lives in memory only, so restarting the server resets it.
- Swagger UI is available at `/docs` for interactive testing.
- A screenshot of the Swagger page can be added here after opening `/docs` in a browser.

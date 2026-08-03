# flyrank-ai-todolist
# FlyRankAI To-do List CRUD APP
This program demosntrates the use of a backend systems with CRUD(Create, Read, Update, Delete), functionality with Node.js and Express.   
As well as PostgreSQL and Docker. 
  
Full CRUD Operations: Create, Read, Update, and Delete tasks via intuitive REST endpoints.
  
Interactive API Documentation: Auto-generated UI for testing and exploring endpoints using Swagger UI.
  
In-Memory Storage: Fast, zero-configuration state management perfect for prototyping and local development.
  
Health Monitoring: Dedicated health check endpoint (/health) to instantly verify API uptime.
  
Tech Stack:
  
Language: JavaScript(Module)
  
Runtime: Node.js
  
Framework:Express
  
Database: PostgreSQL
  
Containerization and CI/CD: Docker
  
Docker makes a development environment repeatable. 
  
Getting Started
  
Prerequisites:
  
Node.js
  
npm(Node package manager)
  
An openapi.json file defining the Swagger UI specification in the root directory.
  
The description of this project is to create a basic CRUD API To-do list. The tech stack I used was JavaScript with Express and Swagger   
UI to show the OpenAPI documentation. 
  
So here's how it works and the API Endpoints: 
# Here's how to install it:
# 0. Clone the repository and navigate it into the directory and run it in docker:
```
git clone https://github.com/harito-git/flyrank-ai-todolist.git
cd flyrank-ai-todolist
cp .env.example .env
docker compose up
#variables to set, see .env.example file.
```
# 1. To close the app, and the container use the command below on docker compose down.
```
docker compose down

```
# Why Docker was chosen
Docker makes a dev environment repeatable.  

# Example of SQL Query
```
SELECT * from tasks -- which lists every tasks. --
```
Screenshot of example query
<img width="861" height="694" alt="Screenshot_for_SQL_Database" src="https://github.com/user-attachments/assets/1ce03e11-1262-40a3-9dd7-16f8b02a33b6" />



# Table of API Endpoints
Here is a clear summary of all the available API endpoints implemented in your Express application.
## Endpoints

### `GET /`

Returns metadata about the API.

**Response**

```json
{
  "name": "Task API",
  "version": "1.0",
  "endpoints": ["/tasks"]
}
```

**Example**

```bash
curl http://localhost:3000/
```

### `GET /health`

Health check endpoint.

**Response**

```json
{
  "status": "ok"
}
```

**Example**

```bash
curl http://localhost:3000/health
```

### `GET /tasks`

Returns all tasks. Optional query parameters filter the list (the part after `?` — filters, not addresses).

| Query | Example | Effect |
|-------|---------|--------|
| `done` | `?done=true` | Only finished tasks |
| `done` | `?done=false` | Only open tasks |
| `search` | `?search=milk` | Title contains the word (case-insensitive) |

Filters can be combined: `?done=false&search=book`

**Response**

```json
[
  {
    "id": 1,
    "title": "Wash hands",
    "done": false,
  },
  {
    "id": 2,
    "title": "Buy groceries",
    "done": false,
  },
  {
    "id": 3,
    "title": "Clean room",
    "done": false,
  }
]
```

**Example**

```bash
curl http://localhost:3000/tasks

```


### `GET /tasks/:id`

Returns a single task by id.

**Response (200)**

```json
{ "id": 1, "title": "Buy groceries", "done": false}
```

**Response (404)**

```json
{ "error": "Task 99 not found" }
```

**Example**

```bash
curl http://localhost:3000/tasks/1
curl http://localhost:3000/tasks/99
```

### `POST /tasks`

Creates a new task.

**Request body**

```json
{ "title": "Buy milk" }
```

**Response (201)**

```json
{ "id": 4, "title": "Buy milk", "done": false, "created_at": "2026-07-24 11:20:00", "updated_at": "2026-07-24 11:20:00" }
```

**Response (400)**

```json
{ "error": "title is required and cannot be empty" }
```

**Example**

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy milk"}'
```

### `PUT /tasks/:id`

Updates a task's `title` and/or `done`. Send one or both fields; omitted fields stay unchanged.

**Request body**

```json
{ "title": "Buy oat milk", "done": true }
```

**Response (200)**

```json
{ "id": 1, "title": "Buy oat milk", "done": true, "created_at": "2026-07-24 09:15:00", "updated_at": "2026-07-24 11:45:00" }
```

**Response (400)**

```json
{ "error": "request body must include title and/or done" }
```

**Response (404)**

```json
{ "error": "Task 99 not found" }
```

**Example**

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'
```

### `DELETE /tasks/:id`

Deletes a task.

**Response (204)**

Empty body — success, nothing to return.

**Response (404)**

```json
{ "error": "Task 99 not found" }
```

**Example**

```bash
curl -X DELETE http://localhost:3000/tasks/1
```
 <br>


Output of A Curl Endpoint: 

example: GET /tasks

![alt text](<Screenshot 2026-08-03 at 4.11.50 PM.png>)


Screenshot of Swagger UI:

<img width="1436" height="731" alt="The screenshot of Swagger UI" src="https://github.com/user-attachments/assets/7627bec6-74ae-4cc0-9535-90a93906b334" />


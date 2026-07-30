# flyrank-ai-todolist
# FlyRankAI To-do List CRUD APP
Full CRUD Operations: Create, Read, Update, and Delete tasks via intuitive REST endpoints.
Interactive API Documentation: Auto-generated UI for testing and exploring endpoints using Swagger UI.
In-Memory Storage: Fast, zero-configuration state management perfect for prototyping and local development.
Health Monitoring: Dedicated health check endpoint (/health) to instantly verify API uptime.
Tech Stack:
Language: JavaScript(Module)
Runtime: Node.js
Framework:Express
API Documentation: `swagger-ui`, OpenAPI
All tasks are stored in an array of objects.
Each task has the following properties:
id(number), title(text) and done(true/false).
Getting Started
Prerequisites:
Node.js
npm(Node package manager)
An openapi.json file defining the Swagger UI specification in the root directory.
The description of this project is to create a basic CRUD API To-do list. The tech stack I used was JavaScript with Express and Swagger UI to show the OpenAPI documentation. 
So here's how it works and the API Endpoints: 
# Here's how to install it:
# 0. Clone the repository and navigate it into the social directory
```
git clone git clone https://github.com/harito-git/flyrank-ai-todolist.git
cd flyrank-ai-todolist
```
# 1. Initialize the repository and install the requried dependencies:
```
npm init -y
npm install express swagger-ui-express better-sqlite3
```
# 2. Get started and use in your terminal:
```
node index.js
 ```
# Why SQLite was chosen
SQLite was chosen as the database since SQLite since it is serverless(no server), self-contained, reads/writes to only one database file, requires zero-setup and survives restarts. As well as requiring really easy to setup and coming with one file tasks.db. Traditional databases, modern ones such as PostgreSQl, you need multiple files of your own, as well as a seperate database. 
The database lives at tasks.db. 

# Example of SQL Query
```
SELECT * from tasks -- which lists every tasks. --
```
Screenshot of example query
<img width="861" height="694" alt="Screenshot_for_SQL_Database" src="https://github.com/user-attachments/assets/1ce03e11-1262-40a3-9dd7-16f8b02a33b6" />

# AI vs me section
So, what the AI did better was use a initilizeDatabase() function to handle the seed task and check if the whole database is empty for handling the seed tasks. Much cleaner code and schema. What the AI missed was that when deleting a task, it ran delete before checking any of the conditions, it did check if info.changes === 0. But, with sqlite or any database if it's empty. You will run into an error right away. What my prompt forget to specify is create a .gitignore file. So, before runnign it, when I ran npm install, there were 20 security vulnerabilties in the npm packages. 

# Table of API Endpoints
Here is a clear summary of all the available API endpoints implemented in your Express application.

| Method | Endpoint | Description | Expected Status Codes & Responses |
| --- | --- | --- | --- |
| **GET** | `/` | Returns API metadata and a list of root endpoints. | `200 OK` — JSON object containing API name, version, and endpoints list. |
| **GET** | `/health` | Application health check to confirm server status. | `200 OK` — `{"status": "ok"}` |
| **GET** | `/tasks` | Retrieves the entire list of tasks. | `200 OK` — Array of all task objects. |
| **GET** | `/tasks/:id` | Retrieves a single task by its unique ID. | `200 OK` — Task object.<br>

<br>`404 Not Found` — Error string if ID does not exist. |
| **POST** | `/tasks` | Creates and appends a new task to the list. | `201 Created` — The newly created task object.<br>

<br>`400 Bad Request` — Error string if title is missing or a duplicate. |
| **PUT** | `/tasks/:id` | Updates an existing task's title and completion status. | `201 Created` — The updated task object.<br>

<br>`400 Bad Request` — Missing fields.<br>

<br>`404 Not Found` — Unknown ID. |
| **DELETE** | `/tasks/:id` | Removes a task from the list by its ID. | `204 No Content` — Successfully removed.<br>

<br>`404 Not Found` — Unknown ID. |
| **GET** | `/docs` | Serves the interactive Swagger UI documentation. | `200 OK` — HTML/JavaScript Swagger documentation interface. |

Output of A Curl Endpoint: 

example: GET /tasks

<img width="543" height="158" alt="Screenshot of API Response" src="https://github.com/user-attachments/assets/52dfd9be-1e71-49ec-a03f-c6d0b8c25748" />

Screenshot of Swagger UI:

<img width="1436" height="731" alt="The screenshot of Swagger UI" src="https://github.com/user-attachments/assets/7627bec6-74ae-4cc0-9535-90a93906b334" />


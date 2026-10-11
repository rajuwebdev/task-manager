# Task Manager REST API

A simple REST API built with Node.js and Express.js to manage tasks using in-memory storage.

## Features

- Get all tasks
- Filter tasks by completion status
- Get a task by ID
- Create a task
- Update a task
- Delete a task
- Input validation and error handling

## Prerequisites

- Node.js 18 or later
- npm

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone <your-fork-repository-url>
cd task-manager
npm install
```

## Run the application

```bash
node app.js
```

The server runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | `/tasks`                 | Get all tasks        |
| GET    | `/tasks?completed=true`  | Get completed tasks  |
| GET    | `/tasks?completed=false` | Get incomplete tasks |
| GET    | `/tasks/:id`             | Get a task by ID     |
| POST   | `/tasks`                 | Create a task        |
| PUT    | `/tasks/:id`             | Update a task        |
| DELETE | `/tasks/:id`             | Delete a task        |

### Create a task

Send a JSON request body:

```json
{
  "title": "Learn Node.js",
  "description": "Practice building REST APIs",
  "completed": false
}
```

## Run tests

```bash
npm test
```

The test suite covers task creation, retrieval, updates, deletion, validation, and invalid IDs.

## Data storage

Tasks are stored in memory and initialized from `task.json`. Changes are not persisted after the server restarts.

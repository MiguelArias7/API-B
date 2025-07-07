# Blossom API

Blossom is an API built with Node.js, TypeScript, and Express, following the hexagonal architecture (ports and adapters). It allows you to query information about creatures from franchises like Pokémon and Digimon, and log operations in a PostgreSQL database.

## Project Structure

- **src/domain**: Domain models and ports (interfaces).
- **src/application**: Use cases (business logic).
- **src/adapters**: External adapters (franchise APIs).
- **src/infrastructure**: Concrete implementations (repositories, HTTP, database, service containers).
- **src/infrastructure/databases**: Repositories for PostgreSQL and in-memory.
- **src/infrastructure/http**: Express routes, controllers, and middlewares.

## Requirements

- Docker and Docker Compose

## Environment Variables

You need to create a `.env` file at the project root with the following variables:

```
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=blossom
POSTGRES_HOST=db
POSTGRES_PORT=5432
PORT=3000
```

## Installation and Running with Docker Compose

1. Make sure you have Docker and Docker Compose installed.
2. Rename the file `.env.example` to `.env`
3. Run the following command at the project root:
   ```
   npm i
   ```
   This will install the project's dependencies.
   
4. Run the following command at the project root:

   ```
   docker-compose up --build
   ```

   This will start both the PostgreSQL database and the Blossom API in separate containers.

5. The server will be available at [http://localhost:3000](http://localhost:3000).

## Main Endpoints
- `GET /api/:franchise/v1?metadata={...}&config={...}`  
  Query information about a creature from the franchise (`pokemon` or `digimon`).  
  **Example:**  
  ```
  GET /api/pokemon/v1?metadata={"name":"pikachu"}&config={"baseUrl":"https://pokeapi.co/api/v2","headers":{},"APIKey":""}
  ```

- `POST /api/log`  
  Create a log.  
  **Body:** `{ "franchise": "pokemon", "version": "v1", "metadata": { "id": "1", "name": "Pikachu" } }`

- `GET /api/log`  
  List all logs.

- `GET /api/log/:id`  
  Get a log by ID.

## Hexagonal Architecture

- **Domain:** Defines entities and ports (interfaces).
- **Application:** Use cases that orchestrate the logic.
- **Adapters:** Implement the ports to interact with external APIs or databases.
- **Infrastructure:** Concrete implementations and Express configuration.

## Notes

- The log repository uses PostgreSQL by default.
- You can switch to an in-memory repository by modifying `ServiceContainer.ts`.
- To stop the services, run `docker-compose down`.

---

This project is built on **NestJS and PostgreSQL** to provide a heavy-duty, type-safe foundation for enterprise applications. By leveraging a **PGSQL Docker image**, the environment setup is nearly instantaneous, with the application handling all table creation and schema synchronization automatically during the initial bootstrap.

The workflow is straightforward: `npm i` for dependencies, `npm run build` for the TypeScript compilation, and `npm start` to launch the service.

### Architectural Logic

The codebase relies on a specific combination of design patterns to maintain a clean separation of concerns. By using **DTOs, Adapters, and Strategies**, the core business logic remains "courier agnostic." This means the system doesn't care about the specific requirements of a third-party provider; it only cares about the internal standard.

To ensure the project is truly pluggable, it implements a **Strategy + Registry + Factory + Template Method** structure. This follows the **Open-Closed Principle**, allowing for new integrations—like the included **BlueDart** module—to be added simply by creating a module in the registry. No core code changes are required to expand the system’s capabilities.

### Performance and Resilience

Concurrency for batch orders is currently managed via **Promise.all**. While efficient for standard operations, the architecture is designed to transition toward a **Producer/Consumer strategy using BullMQ and Redis**. Moving to a message queue is the recommended path for production to ensure that server restarts or spikes in traffic don't result in dropped requests or downtime.

Reliability is further reinforced through:

* **Axios-retry:** Automatically handles intermittent network failures with retry logic.
* **Preflight Token Concept:** Prevents hitting API rate limits by reusing valid authentication tokens instead of generating a new one for every request.

### System Configuration and Error Handling

The application is entirely **config-driven**, meaning all environment-specific settings are managed in a single, centralized location. Error handling is managed through a **Chain of Responsibility filter**, which produces **Normalized Errors**. This system includes built-in **Translation** support, ensuring that error responses are consistent and localized.

The database schema is kept simple to maintain high performance from the start, with a clear path to implement advanced **Indexing and Joins** as the data scales.
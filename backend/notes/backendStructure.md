server.js: The main entry point for the backend.

routes/: A folder to organize all routes.

- authRoutes.js: Handles authentication (sign-up, login, logout).

- taskRoutes.js: Handles task-related operations (create, read, update, delete).

middleware/: A folder for middleware functions.

- authMiddleware.js: Protects routes by verifying the user's authentication.

utils/: A folder for utility functions.

- supabaseClient.js: Initializes the Supabase client.

### Install Axios for making HTTP requests and React Router for routing

src/utils/: Contains utility functions.

- api.js: Functions to interact with the backend API.

- auth.js: Functions to handle authentication (e.g., storing tokens).

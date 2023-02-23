# Install dependencies for server
yarn install

# Install dependencies for client
yarn run client-install

# Run the client & server with concurrently
yarn run dev

# Run the Express server only
yarn run server

# Run the Svelte client only
yarn run client

# Server runs on http://localhost:5678 and client on http://localhost:5173

# When deploying server to prod you need to do the following:

## Run the build command
yarn run build

## Then run the server only
yarn run server


# SuperDoc Client Example

This project demonstrates how to use the `superdoc` library in a Vue 3 application.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)

## Setup

1.  **Install dependencies:**

    ```bash
    cd packages/superdoc
    pnpm pack
    mv superdoc-*.tgz superdoc.tgz
    cd ../../examples/collaboration/production/client
    pnpm install
    ```

2.  **Configure environment variables:**

    Copy the example environment file:

    ```bash
    cp .env.example .env
    ```

## Development

To start the development server:

```bash
pnpm run dev
```

The server is configured to listen on all network interfaces (`0.0.0.0`). You can access the application via:
- `http://localhost:5173`
- `http://<your-ip>:5173`
- `http://<your-domain>:5173`

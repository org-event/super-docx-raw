
# SuperDoc Client Example

This project demonstrates how to use the `superdoc` library in a Vue 3 application.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)

## Setup

1.  **Install dependencies:**

    ```bash
    pnpm install
    ```

    The `superdoc` library is installed directly from the GitHub repository. The `postinstall` script will automatically build the library for you.

2.  **Configure environment variables:**

    Copy the example environment file and configure it:

    ```bash
    cp .env.example .env
    ```

    Open `.env` and set the correct port for your collaboration server if needed (default is usually `3050` or similar, check your server configuration).

## Development

To start the development server:

```bash
pnpm run dev
```

Open your browser at `http://localhost:5173`.

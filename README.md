# tinyCam Monitor Web Client

This is a web client for the tinyCam Monitor application, built with Next.js. It provides a user interface to view and manage camera feeds and events.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org) 15
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI:** [React](https://react.dev/) 19
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) 4
*   **Real-time Communication:** [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
*   **Linting:** [ESLint](https://eslint.org/)

## Project Structure

The project is organized as follows:

```
.
├── src
│   ├── app         # Next.js App Router pages and layouts
│   ├── components  # React components
│   ├── context     # Application-wide context (state management)
│   ├── hooks       # Custom React hooks
│   ├── server      # WebSocket server implementation
│   └── types       # TypeScript type definitions
├── public          # Static assets
└── ...             # Configuration files
```

## Getting Started

### Prerequisites

*   Node.js (v20 or later)
*   npm, yarn, pnpm, or bun

### Installation

1.  Clone the repository:
    ```bash
    git clone [<repository-url>](https://github.com/VisualBoy/tinycam-client-web/edit/dev)
    ```
2.  Navigate to the project directory:
    ```bash
    cd tinycam-client-web
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

This project consists of two main parts: the Next.js web application and a WebSocket server. Both need to be running for the application to be fully functional.

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

2.  **Start the WebSocket server:**
    In a separate terminal, run the following command:
    ```bash
    npm run ws:dev
    ```
    The WebSocket server will be running on `ws://localhost:8081`.

## Features

*   **Dark Mode:** The UI supports a dark theme, which is enabled by default.
*   **Interactive Timeline:** An interactive timeline allows users to view and scrub through recorded events.
*   **WebSocket Communication:** The application uses WebSockets for real-time communication with the server.
*   **PTZ Controls:** Pan-tilt-zoom controls are available for selected cameras.
*   **Camera Grid:** View multiple camera feeds in a grid layout.

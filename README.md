# real-time-system-kroolo
A real-time connectivity system with offline support

# Download Dependencies
## To install the necessary dependencies for the project, run the following command:

    npm install

# Make Build
## To create a production build of the project, run:

    npm run build

# Start the Project
## To start the development server and run the project locally, use the following command:

    npm run dev

# Preview UI
## To preview the UI of the project, use the following command:

    npm run preview

# Folder Structure

## public

    sw.js
    The service worker script responsible for caching specific assets and handling fetch requests in the web application.

## server

    websocket.js
    The WebSocket server implemented using the ws library in a Node.js environment.

# src

## components
    
    ConnectionStatus.tsx
    The component that handles the connection status display.

## services

    websocket.ts
    The WebSocket service used for establishing connections and handling communication.

    App.tsx
    The main app component where the core application logic resides.
    
    index.css
    The main CSS file for styling the application.
    
    main.tsx
    The entry point of the application, where the React app is rendered.

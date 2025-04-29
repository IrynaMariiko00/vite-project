# React + TypeScript + Vite - Interactive Workspace & Bitcoin Transactions Tracker

This project implements a single-page application (SPA) with two main tasks:

1. **Interactive Workspace** with draggable, resizable blocks.
2. **WebSocket-based Bitcoin Transaction Tracker** displaying live transactions.

## Task 1: Interactive Workspace

The interactive workspace consists of five draggable and resizable blocks, arranged on a grid layout. Users can interact with these blocks by dragging them, resizing, and adjusting their z-index.

### Features:
- **Initial State:**
  - Five numbered blocks (1, 2, 3, 4, 5) displayed on page load.
  - Each block has an initial height of 100px and a width of 300px.
  
- **User Interactions:**
  - **Drag & Drop:** Blocks can be moved freely on the grid with a snap-to-grid functionality.
  - **Resizing:** Blocks can be resized both vertically and horizontally.
  - **Z-Index Control:** Clicking on a block brings it to the front.
  - **Delete Blocks:** Blocks can be removed by the user.
  - **Restore Defaults:** A "Reset" button restores all blocks to their default size and positions.
  
- **Persistent State:**
  - The positions, sizes, and visibility of the blocks persist after a page refresh or browser reopening.

### Example Use Case:
1. A user opens the app and sees five blocks.
2. The user resizes Block 1 to 200px in height.
3. The user moves Block 4 over Block 2 and clicks Block 2, bringing it to the front.
4. The user shrinks Block 3 to 150px in width and deletes it.
5. Upon refreshing the page, all changes remain.
6. The user clicks "Reset", and all blocks return to their initial state.

## Task 2: WebSocket-based Bitcoin Transactions

This feature displays real-time Bitcoin transactions using the Blockchain WebSocket API.

### Features:
- **Live Transactions List:**
  - A continuously updating list of incoming Bitcoin transactions.
  - The total sum of all received transactions is displayed.
  
- **Controls:**
  - **Start:** Subscribes to real-time transaction updates.
  - **Stop:** Stops updates but keeps the current list.
  - **Reset:** Clears the transaction list and resets the total sum to zero.

### Example Use Case:
1. The user clicks "Start" → Transactions begin to appear, and the total sum updates.
2. The user clicks "Reset" → The list is cleared, and the total sum resets to zero.
3. The user clicks "Stop" → Transactions stop updating, but the existing list and total remain visible.
4. The user clicks "Start" again → Transactions resume from the live feed.

## Technologies Used

- **ReactJS**: Library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Vite**: Build tool that provides fast development server with HMR (Hot Module Replacement).
- **WebSocket API**: For real-time communication in the Bitcoin Transaction Tracker.
- **CSS**: For styling, with media queries for responsive design.

## Features Implemented
- **Lazy Loading**: Sections are only loaded when accessed by the user.
- **Drag-and-Drop**: Blocks in the workspace can be moved freely across the grid.
- **Resizable Blocks**: Users can resize the blocks vertically and horizontally.
- **Z-Index Control**: Blocks can be reordered by clicking to bring them to the front.
- **Persistent State**: The state of the workspace (positions, sizes) persists between page refreshes.
- **WebSocket Integration**: Real-time transaction updates from the Blockchain WebSocket API.
- **Modular and Scalable Code**: Components are reusable and maintainable, promoting clean code structure.

## External Libraries Used

- **React**: For building components and managing the application state.
- **TypeScript**: For type safety and improving code quality.
- **Vite**: For fast and efficient development with HMR.
- **WebSocket API**: For establishing a real-time connection for the Bitcoin Transaction Tracker.
- **CSS Modules / SCSS**: For scoped styling and responsive design.

## Design
This project was designed with the help of Figma. The design focuses on an intuitive and user-friendly interface for managing the interactive workspace and viewing Bitcoin transactions in real-time.
# Mystery Table: Implementation Plan

## 1. Project Goal

To create a modern multiplayer mystery game, "Mystery Table: Clue Collectors," featuring a 3D environment, customizable detective avatars, and collaborative clue-solving gameplay, based on the specifications outlined in the `README.md`.

## 2. Technology Stack

*   **Frontend Framework:** React with Vite
*   **Language:** TypeScript
*   **3D Rendering:** Three.js & React Three Fiber (R3F)
*   **UI Components:** shadcn-ui
*   **Styling:** Tailwind CSS
*   **Networking:** (To be decided - e.g., Socket.IO, Firebase, Supabase Realtime)
*   **State Management:** (To be decided - e.g., Zustand, Jotai, Redux Toolkit)
*   **Backend:** (To be decided - e.g., Node.js/Express for Socket.IO, or BaaS like Firebase/Supabase)

## 3. Implementation Phases

### Phase 1: Core Setup & 3D Environment Foundation

*   **Task 1.1: Project Initialization:**
    *   Confirm Vite, React, TypeScript setup is functional.
    *   Install core dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `tailwindcss`, `shadcn-ui`.
    *   Configure Tailwind CSS and shadcn-ui.
*   **Task 1.2: Basic R3F Scene:**
    *   Set up the main `Canvas` component.
    *   Add basic lighting (ambient, directional).
    *   Create a simple ground plane (representing the table or floor).
    *   Implement basic sky/environment using `@react-three/drei` components (`Sky`, `Environment`).
*   **Task 1.3: Camera Controls:**
    *   Implement orbit controls (`OrbitControls` from `@react-three/drei`) for scene navigation.
    *   Fine-tune camera limits and responsiveness.
*   **Task 1.4: Initial Assets:**
    *   Add placeholder assets for the "table" or central game area.
    *   Integrate basic environmental elements (e.g., simple grass texture/shader if applicable).

### Phase 2: Avatar System (Single Player Focus First)

*   **Task 2.1: Avatar Model:**
    *   Select or create a suitable low-poly 3D model for the base detective avatar. Ensure it's rigged if complex animations are planned later.
    *   Import the model into the R3F scene.
*   **Task 2.2: Customization UI:**
    *   Design and build a React component using `shadcn-ui` elements (e.g., `Card`, `ColorPicker`, `Button`) for customization.
    *   Focus initially on simple options like changing colors of distinct parts (shirt, pants, hat).
*   **Task 2.3: Linking UI to 3D Model:**
    *   Implement state management (e.g., Zustand) to hold avatar customization settings.
    *   Use the state to dynamically update material properties (like `color`) on the avatar model's meshes within the R3F scene.
*   **Task 2.4: Basic Avatar Placement:**
    *   Position the customizable avatar within the 3D scene.

### Phase 3: Networking & Multiplayer Foundation

*   **Task 3.1: Technology Selection & Setup:**
    *   Evaluate and choose a real-time networking solution (e.g., Socket.IO for flexibility, Firebase/Supabase for BaaS simplicity).
    *   Set up the chosen backend (Node.js server for Socket.IO or configure BaaS).
*   **Task 3.2: Connection Management:**
    *   Implement client-side logic to connect to the server/service.
    *   Implement server-side logic to handle new connections, disconnections, and assign unique IDs.
    *   Establish basic "room" or "session" logic for players to join the same game instance.
*   **Task 3.3: Basic State Synchronization:**
    *   Transmit basic player information (e.g., ID, initial position) upon joining.
    *   Synchronize avatar positions in the 3D scene. When one player moves their avatar (TBD in later phase), broadcast the new position to others.
    *   Synchronize avatar *appearance* (customization data) so players see each other's customized avatars.

### Phase 4: Core Gameplay Mechanics

*   **Task 4.1: Game Session Management:**
    *   Define server-side logic to start, manage state (e.g., current case, time remaining), and end a game session.
*   **Task 4.2: Clue System:**
    *   Define data structure for clues (ID, description, location, associated suspect).
    *   Implement 3D interaction (e.g., clicking on objects) to "collect" clues.
    *   Create a UI panel (using `shadcn-ui`) to display collected clues for each player.
    *   Synchronize clue collection events across players.
*   **Task 4.3: Suspect System:**
    *   Define data structure for suspects (ID, name, details, potential motives).
    *   Create a UI panel for displaying suspect information and potentially dialogue options ("interrogation").
*   **Task 4.4: Collaboration & Voting:**
    *   Implement a basic in-game text chat using the networking layer.
    *   Design and implement a UI for players to propose a solution (select the culprit).
    *   Implement server-side logic to handle votes, determine consensus or majority, and trigger game end conditions.
*   **Task 4.5: Game Timer:**
    *   Implement a visible timer synchronized across all clients.

### Phase 5: Polish, Enhancements & Content

*   **Task 5.1: Refine Visuals:**
    *   Improve 3D models, textures, lighting, and environmental details.
    *   Add subtle animations or effects.
*   **Task 5.2: UI/UX Improvements:**
    *   Refine all UI panels for clarity and usability.
    *   Ensure smooth transitions and interactions.
*   **Task 5.3: Expand Customization:**
    *   Add more avatar customization options (e.g., different clothing items, accessories).
*   **Task 5.4: Develop Mystery Scenarios:**
    *   Create specific sets of clues, suspects, and case narratives for players to solve. Load these dynamically per game session.

### Phase 6: User Accounts & Persistence (Optional / Future)

*   **Task 6.1: Authentication:**
    *   Integrate an authentication provider (Firebase Auth, Supabase Auth, Auth0) for user login/signup.
*   **Task 6.2: Data Persistence:**
    *   Link saved avatar customizations to user accounts.
    *   Potentially save game statistics or progress.

### Phase 7: Testing & Deployment

*   **Task 7.1: Testing:**
    *   Conduct thorough testing, especially for multiplayer synchronization and gameplay logic.
*   **Task 7.2: Build & Deployment:**
    *   Configure build process using Vite.
    *   Deploy frontend to a static hosting service (Netlify, Vercel, GitHub Pages).
    *   Deploy backend (if applicable) to a suitable platform (Heroku, Fly.io, Cloud Functions).
    *   Set up CI/CD pipelines for automation.

## 4. Next Steps

1.  Finalize technology choices for Networking, State Management, and Backend (Phase 3.1).
2.  Begin implementation starting with Phase 1.

This plan provides a structured approach. We can adjust priorities and details as development progresses. 
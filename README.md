# To-Do List (New)

Simple React + TypeScript to‑do list app built with Vite. Allows creating tasks, tracking progress and viewing completed task logs.

## Requirements / addons
- Node.js 14+ (recommended 16+)
- npm (or yarn)
- Git (optional, for cloning/pushing)
- Dependencies are managed in package.json (Vite, React, TypeScript, etc.)

## Quick start (Windows / PowerShell)
1. Open a terminal in the project root:
   cd "d:\visual studio project tests\New folder"
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the dev server:
   ```powershell
   npm run dev
   ```
4. Open the app in your browser:
   http://localhost:3001

## Build & preview
```powershell
npm run build
npm run preview
```

Notes
- Dev server port is set to 3001 in vite.config.ts.
- If the page is blank, open the browser devtools Console and Network tab to check for missing module paths (common cause: incorrect script path in index.html or misplaced src files).

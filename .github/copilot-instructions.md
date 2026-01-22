# GitHub Copilot Repository Instructions

## Project Overview

This is a React + TypeScript application built with Vite, using TanStack Router and React Query. It serves as a hands-on workshop repository for learning and practicing GitHub Copilot.

## Development Setup

### Prerequisites
- Node.js (version 20 or higher recommended)
- npm package manager

### Installation
```bash
npm install
```

## Running the Application

### Development Server
Start the development server with hot module replacement:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

### Preview Production Build
To preview the production build locally:
```bash
npm run preview
```

## Building the Application

Build the application for production:
```bash
npm run build
```

This command:
1. Runs TypeScript compiler (`tsc -b`)
2. Creates an optimized production build with Vite

Build output is generated in the `dist` directory.

## Testing

### Run Tests
Execute the test suite using Vitest:
```bash
npm test
```

### Run Tests with UI
Launch the Vitest UI for interactive testing:
```bash
npm run test:ui
```

### Generate Coverage Report
Run tests with coverage analysis:
```bash
npm run test:coverage
```

## Linting

### Check for Lint Issues
Run ESLint to check for code style and quality issues:
```bash
npm run lint
```

### Auto-fix Lint Issues
Automatically fix linting issues where possible:
```bash
npm run lint:fix
```

## Project Structure

- `src/` - Source code directory
- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration

## Key Dependencies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Router** - Type-safe routing
- **TanStack React Query** - Data fetching and caching
- **Vitest** - Testing framework
- **ESLint** - Code linting

## Coding Guidelines

- Follow TypeScript best practices with strict type checking
- Use ESLint configuration provided in the repository
- Write tests for new features using Vitest
- Keep components modular and reusable

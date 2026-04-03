# AGENTS.md - Guidelines for Claude Code Agent

## Project Overview

Vue 3 application with Pinia, Tailwind CSS, PWA support, and Docker deployment.
Uses OpenData Angers API for displaying city data (works, baby names).

## Build/Lint/Test Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build

# Testing
npm run test:unit        # Run all unit tests
npm run test:unit -- src/__tests__/apiHelpers.spec.js  # Run single test file

# Linting & Formatting
npm run lint             # Run all linters (oxlint + eslint)
npm run lint:oxlint      # Oxlint only
npm run lint:eslint      # ESLint only
npm run format           # Format with Prettier
```

## Code Style Guidelines

### Naming Conventions
- **Components**: PascalCase (e.g., `TravauxListe.vue`)
- **Stores**: camelCase with `use` prefix (e.g., `useTravauxStore`)
- **Services**: camelCase (e.g., `travaux.js`)
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **No abbreviations** for domain-specific terms (use French for UI labels)

### Variable Naming
- Use descriptive names in French for UI elements
- Technical terms (path, id, data) can remain in English
- Minimum 3 characters per variable name
- Examples: `listeTravaux`, `termeRecherche`, `anneeSelectionnee`

### Architecture (MVVM with Pinia)

```
src/
├── stores/           # Pinia stores (state management)
│   ├── useTravauxStore.js
│   └── usePrenomsStore.js
├── components/        # Vue components (template only)
│   ├── TravauxListe.vue
│   └── PrenomsListe.vue
├── views/             # Page components
├── services/         # API calls
├── config/            # Configuration
└── lib/               # Utilities
```

### Vue Component Guidelines
- Use `<script setup>` syntax
- Components should be "dumb" - use Pinia store for state/logic
- Template should be clean with minimal logic
- Emit events for parent communication

### Pinia Store Guidelines
- Use Composition API style (`defineStore` with function)
- Separate state, getters, and actions
- Naming: `use{Entity}Store` pattern

### API Service Guidelines
- Use `fetch` for HTTP calls
- Centralize API endpoints in `src/config/api.js`
- Handle errors with try/catch
- Return parsed JSON

### Git Workflow
- Development on `dev` branch
- PR to `main` for production
- Tests run on PR to `main` only
- Build and deploy on merge to `main`

### Docker
- Multi-stage build (Node for build, Nginx for serving)
- Expose port 80 inside container
- External port mapped via docker run

## Error Handling
- Display user-friendly error messages in French
- Log technical errors to console for debugging
- Use try/catch for all async operations

## Formatting
- Use Prettier for code formatting
- 2 spaces indentation
- Single quotes for strings
- No semicolons

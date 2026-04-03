# StarWars Angers

Application web dediee a l'univers Star Wars avec donnees de la ville d'Angers.

## Stacks

### Frontend
- **Vue 3** - Framework JavaScript progressif
- **Vue Router 5** - Routage SPA
- **Pinia** - State management
- **Tailwind CSS 4** - Framework CSS
- **shadcn-vue** - Composants UI

### Outils de developpement
- **Vite 8** - Build tool et serveur de dev
- **Vitest** - Tests unitaires
- **ESLint** - Linting
- **Prettier** - Formatage

### PWA
- **vite-plugin-pwa** - Progressive Web App
- Service Worker pour le mode offline
- Manifest pour l'installation

### APIs
- **OpenData Angers** - Donnees travaux et prenoms

## Scripts

```bash
npm run dev        # Serveur de developpement
npm run build      # Build production
npm run preview    # Preview build
npm run test:unit  # Tests unitaires
npm run lint       # Linting
```

## Structure

```
src/
├── components/     # Composants Vue
├── views/          # Pages
├── stores/         # Pinia stores
├── services/      # API et services
├── router/        # Configuration router
├── lib/           # Utilitaires
└── __tests__/    # Tests
```

## CI/CD

- **GitHub Actions** - Automatisation build et tests
- **Docker** - Conteneurisation
- **VPS** - Deploiement production (port 40110)

## Installation

```bash
npm install
npm run dev
```

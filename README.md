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

## Commentaires

J'ai pas mal galerer pour la CI/CD principalement pour me connecter a mon vps depuis github actions.
Finalement le merge de la dev vers la main déclanche un pipeline qui teste l'application, build une image docker et la pousse depuis github vers mon vps.
Je n'ai pas pris le temps (restant) pour me pencher sur la PWA. 
J'ai préféré mettre en place une persistance de données via indexedDB pour decouvrir cette technologie.
Je me suis rendu compte que dans l'etat actuel ca n'est pas tres pertinent, il faudrait que je mette en place un SQLite sur mon vps surement inclu dans une api perso que je 
pourrais utiliser pour stocker les scores de manieres plus globale et pouvoir comparer les scores de tous les utilisateurs. Avec une mise a jour de la BDD a chaque reconnection de 
l'application web.
Coté interraction avec une API, je me suis branché sur les informations fournies par data.angers.fr.

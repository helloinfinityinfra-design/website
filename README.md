## Updating Website Content

Edit `public/content/site-content.json` to update the brand name, navigation, services, team, testimonials, contact details, map, projects, and articles. The app loads this file at runtime with bundled data as a fallback.

For a deployed site, replace `/content/site-content.json` on the server or CDN and refresh the page. No rebuild is needed. To change the bundled fallback, edit `src/siteContent.js`, `src/projectsData.js`, or `src/blogData.js`, then run `npm run build` and deploy the generated `dist` folder.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

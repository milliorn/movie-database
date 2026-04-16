# React Movie Database

A movie database application built with React and Vite. Browse and search movies using a clean, responsive interface.

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

The app runs at `http://localhost:5173`.

## Scripts

| Script                   | Description                            |
| ------------------------ | -------------------------------------- |
| `npm start`              | Start the Vite dev server              |
| `npm run build`          | Build for production                   |
| `npm run preview`        | Preview the production build locally   |
| `npm run lint`           | Lint with ESLint                       |
| `npm run lint:fix`       | Lint and auto-fix with ESLint          |
| `npm run prettier:check` | Check formatting with Prettier         |
| `npm run prettier:write` | Format all files with Prettier         |
| `npm test`               | Run tests with Vitest                  |
| `npm run test:ui`        | Run tests with Vitest UI               |
| `npm run test:coverage`  | Run tests with coverage report         |
| `npm run release`        | Create a release with standard-version |

## Dependencies

- [react](https://react.dev/): UI library
- [react-dom](https://react.dev/): DOM bindings for React
- [react-router-dom](https://reactrouter.com/): Declarative client-side routing
- [react-helmet-async](https://github.com/staylor/react-helmet-async): Async-safe document head manager
- [styled-components](https://styled-components.com/): CSS-in-JS styling
- [history](https://github.com/remix-run/history): Session history management

### Dev Dependencies

- [vite](https://vitejs.dev/): Build tool and dev server
- [typescript](https://www.typescriptlang.org/): Static type checking
- [vitest](https://vitest.dev/): Unit test framework
- [@testing-library/react](https://testing-library.com/): React component testing utilities
- [msw](https://mswjs.io/): API mocking for tests
- [eslint](https://eslint.org/) + typescript-eslint: Linting
- [prettier](https://prettier.io/): Code formatting

## Contributing

1. Fork the repository and create a branch for your change.
2. Make your changes and commit them.
3. Push the branch to your fork.
4. Open a pull request targeting the `main` branch.

Please follow the project's coding style. Run `npm run lint:fix` and `npm run prettier:write` before submitting.

## License

This project is licensed under the [MIT License](LICENSE).

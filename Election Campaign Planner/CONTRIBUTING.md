# Contributing to Bangladesh Election Campaign Planner

Thank you for your interest in contributing to this project! We welcome contributions from the community.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/naimulhaque214/bangladesh-election-planner/issues)
2. If not, create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (browser, OS, etc.)

### Suggesting Features

1. Check existing [Issues](https://github.com/naimulhaque214/bangladesh-election-planner/issues) for similar requests
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Any relevant mockups or examples

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/naimulhaque214/bangladesh-election-planner.git
   cd bangladesh-election-planner
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Follow React best practices
- Use meaningful variable and function names
- Write comments for complex logic

### Testing

- Ensure your changes don't break existing functionality
- Test on different browsers and devices
- Verify responsive design works correctly

### Submitting Changes

1. Make sure your code follows the project's coding standards:
   ```bash
   npm run lint
   npm run format:check
   npm run type-check
   ```

2. Build the project to ensure it compiles:
   ```bash
   npm run build
   ```

3. Commit your changes with a clear commit message:
   ```bash
   git commit -m "Add feature: description of what you added"
   ```

4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request with:
   - Clear title and description
   - Reference any related issues
   - Screenshots if UI changes are involved

## Development Guidelines

### Component Structure

- Keep components small and focused
- Use TypeScript interfaces for props
- Follow the existing folder structure
- Use Tailwind CSS for styling

### File Organization

```
components/
├── ui/              # Reusable UI components
├── feature/         # Feature-specific components
└── common/          # Common utility components
```

### Naming Conventions

- Components: PascalCase (`MyComponent.tsx`)
- Files: kebab-case (`my-utility.ts`)
- Variables: camelCase (`myVariable`)
- Constants: UPPER_SNAKE_CASE (`MY_CONSTANT`)

### Git Commit Messages

Follow conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## Questions?

If you have questions about contributing, please:
1. Check the [README](README.md) for basic information
2. Look through existing [Issues](https://github.com/naimulhaque214/bangladesh-election-planner/issues)
3. Create a new issue with your question

Thank you for contributing! 🚀
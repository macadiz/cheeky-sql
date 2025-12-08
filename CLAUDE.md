# Claude Code Instructions for Cheeky SQL

## Project Overview
This is a React-based database management application built with:
- **React 19.2.1** (latest version)
- **TailwindCSS 4.1.17** (latest version with new CSS-first configuration)
- **TypeScript**
- **Vite** as build tool
- **Electron** for desktop application

## Component Organization Rules

### Directory Structure
Every component MUST be created following this structure:

```
src/components/
└── ComponentName/
    ├── index.tsx              # Main component file
    ├── types.ts               # Type definitions
    ├── styles.css             # CSS classes with @apply rules for TailwindCSS
    ├── ComponentName.test.tsx # Test file (when needed)
    └── components/            # Nested components (if any)
        └── NestedComponent/
            ├── index.tsx
            ├── types.ts       # Type definitions
            ├── styles.css     # CSS classes with @apply rules for TailwindCSS
            └── NestedComponent.test.tsx
```

### Examples

**Single Component:**
```
src/components/
└── Button/
    ├── index.tsx
    ├── types.ts
    ├── styles.css
    └── Button.test.tsx
```

**Component with Nested Components:**
```
src/components/
└── Layout/
    ├── index.tsx
    ├── styles.css
    ├── Layout.test.tsx
    └── components/
        ├── Sidebar/
        │   ├── index.tsx
        │   ├── styles.css
        │   └── Sidebar.test.tsx
        └── MainContent/
            ├── index.tsx
            ├── styles.css
            └── MainContent.test.tsx
```

**Deeply Nested Structure:**
```
src/components/
└── DatabaseExplorer/
    ├── index.tsx
    ├── styles.css
    └── components/
        ├── TableList/
        │   ├── index.tsx
        │   ├── styles.css
        │   └── components/
        │       └── TableItem/
        │           ├── index.tsx
        │           └── styles.css
        └── QueryEditor/
            ├── index.tsx
            ├── styles.css
            └── components/
                ├── SqlHighlighter/
                │   ├── index.tsx
                │   └── styles.css
                └── QueryResults/
                    ├── index.tsx
                    └── styles.css
```

### CSS Styling Rules

**Using styles.css with @apply:**
```css
/* Component/styles.css */
@import "tailwindcss" reference;

.container {
  @apply flex h-screen bg-gray-900 overflow-hidden;
}

.sidebar {
  @apply w-64 bg-gray-800 shadow-2xl flex flex-col h-full border-r border-gray-700;
}

.nav-item {
  @apply w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors;
}

.nav-item--active {
  @apply bg-green-900/30 text-green-400 border border-green-500/30 shadow-sm;
}

.nav-item--inactive {
  @apply text-gray-300 hover:bg-gray-700/50 hover:text-green-300;
}
```

**Importing in Component:**
```typescript
// Component/index.tsx
import './styles.css';

const Component = () => {
  return (
    <div className="container">
      <nav className="sidebar">
        <button className="nav-item nav-item--active">
          Active Item
        </button>
        <button className="nav-item nav-item--inactive">
          Inactive Item
        </button>
      </nav>
    </div>
  );
};
```

### Import Rules

**From Parent Component:**
```typescript
// In Layout/index.tsx
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
```

**From App/Other Components:**
```typescript
// In App.tsx or other components
import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';
```

**Path Alias Usage:**
Always prefer path aliases over relative imports when importing from different directories. Use relative imports only for immediate child components.

## Code Conventions

### Component Structure
```typescript
import React from 'react';
import './styles.css';
import type { ComponentNameProps } from './types';

const ComponentName: React.FC<ComponentNameProps> = ({ children, ...props }) => {
  return (
    <div className="tailwind-classes">
      {children}
    </div>
  );
};

export default ComponentName;
```

**Corresponding types.ts file:**
```typescript
import React from 'react';

export type ComponentNameProps = {
  children?: React.ReactNode;
  // Other props...
};
```

### TypeScript Rules
- Always define types for component props in separate `types.ts` files
- Use `type` declarations instead of `interface` (prefer `type` over `interface`)
- Use intersection types (`&`) instead of `extends` for combining types
- Import types with `import type { }` syntax for better tree-shaking
- Use `React.FC<Props>` for functional components
- Export types when they might be reused
- Use proper typing for event handlers and refs

### Type Declaration Conventions
- **Prefer type over interface**: Use `export type ComponentProps = { }` instead of `export interface ComponentProps { }`
- **Use intersection types**: Use `React.HTMLAttributes<HTMLDivElement> & { }` instead of `extends`
- **Separate files**: Keep all type definitions in `types.ts` files within component directories
- **Import syntax**: Use `import type { }` for type-only imports

### TailwindCSS 4 Notes
- Uses new CSS-first configuration (`@import "tailwindcss";` in index.css)
- No `tailwind.config.js` needed by default
- ESM-only architecture requires async import in vite.config.mts
- Same utility classes as TailwindCSS 3.x
- **IMPORTANT**: All component styles.css files MUST start with `@import "tailwindcss" reference;` to use @apply

### IDE Configuration for TailwindCSS
You may see "Unknown at rule @apply" warnings in your IDE. This is normal and does not affect the build.

**For VS Code users**, add these settings to your user/workspace settings:
```json
{
  "css.lint.unknownAtRules": "ignore",
  "css.validate": false,
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

**Recommended Extension:**
- `bradlc.vscode-tailwindcss` - TailwindCSS IntelliSense

**Reference:** See `CSS_SETUP.md` for detailed IDE configuration instructions

**Important:** Do NOT add `tailwind.config.js` or `postcss.config.js` files as they may conflict with TailwindCSS 4's CSS-first approach.

### Path Aliases Configuration
The project uses TypeScript and Vite path mapping to avoid relative imports:

**Available Path Aliases:**
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/ui/*` → `./src/components/ui/*` (shorthand for UI components)
- `@/utils/*` → `./src/utils/*`
- `@/types/*` → `./src/types/*`
- `@/assets/*` → `./src/assets/*`

**Examples:**
```typescript
// ❌ Avoid relative imports
import Layout from '../../../components/Layout';
import { Button } from '../../../ui';

// ✅ Use path aliases instead
import Layout from '@/components/Layout';
import { Button } from '@/components/ui';
```

## Build Commands

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Electron (desktop)
npm run electron
```

## Testing Guidelines

- Place test files alongside components in their respective directories
- Use descriptive test file names: `ComponentName.test.tsx`
- Test files should import from the local index.tsx file

## File Naming

- **Components**: PascalCase directories and files (`Button/`, `DatabaseExplorer/`)
- **Files**: Use `index.tsx` for main component files
- **Tests**: Use `ComponentName.test.tsx` format
- **Utilities**: camelCase for utility files and functions

## UI Design System

### Available Components
The project includes a comprehensive UI design system located in `src/components/ui/`:

**Button Component:**
```typescript
import { Button } from '@/components/ui';

<Button variant="primary" size="md">Click Me</Button>
<Button variant="secondary" size="lg">Secondary</Button>
<Button variant="nav" active={isActive}>Navigation</Button>
```

**Card Component:**
```typescript
import { Card } from '@/components/ui';

<Card title="Card Title" titleVariant="primary" padding>
  Card content here
</Card>
<Card variant="interactive" icon="🔗">Interactive card</Card>
```

**Badge Component:**
```typescript
import { Badge } from '@/components/ui';

<Badge variant="primary" size="sm">5</Badge>
<Badge variant="danger">Error</Badge>
```

**Avatar Component:**
```typescript
import { Avatar } from '@/components/ui';

<Avatar variant="primary" size="md">U</Avatar>
<Avatar src="/path/to/image.jpg" alt="User" />
```

**StatusIndicator Component:**
```typescript
import { StatusIndicator } from '@/components/ui';

<StatusIndicator status="online" size="md" />
<StatusIndicator status="connecting" pulse />
```

**Modal Component:**
```typescript
import { Modal } from '@/components/ui';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content goes here</p>
</Modal>
```

### UI Component Variants

**Button Variants:** `primary`, `secondary`, `outline`, `ghost`, `danger`, `nav`
**Button Sizes:** `sm`, `md`, `lg`
**Card Variants:** `default`, `feature`, `interactive`
**Badge Variants:** `primary`, `secondary`, `danger`, `warning`, `info`, `success`
**Avatar Variants:** `primary`, `secondary`, `blue`, `purple`, `red`, `yellow`
**Avatar Sizes:** `sm`, `md`, `lg`, `xl`
**Modal Sizes:** `sm`, `md`, `lg`, `xl`, `full`
**Status:** `online`, `offline`, `busy`, `away`, `connecting`

### Import Pattern
```typescript
import { Button, Card, Badge, Avatar, StatusIndicator, Modal } from '@/components/ui';
// Or import specific components
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
```

## DO NOT Rules

- ❌ Never create flat component files directly in `src/components/`
- ❌ Never use default TailwindCSS 3.x configuration
- ❌ Never define type definitions inline in component files (use separate `types.ts` files)
- ❌ Never use `interface` when you can use `type` (prefer `type` over `interface`)
- ❌ Never use `extends` for combining types (use intersection types `&` instead)
- ❌ Never use CommonJS imports for TailwindCSS 4 plugin
- ❌ Never add `tailwind.config.js` or `postcss.config.js` files (conflicts with TailwindCSS 4)
- ❌ Never create custom buttons/cards/badges when UI components exist
- ❌ Never bypass the UI design system for common elements
- ❌ Never use relative imports (`../../../`) when path aliases are available

## Current Implementation Status

### ✅ Completed Features
- React 19 upgrade
- TailwindCSS 4 setup with Vite plugin
- Layout system with Sidebar and MainContent
- Component organization structure with CSS files
- Independent scrolling areas
- UI Design System with reusable components
- Dark theme with green accents
- TypeScript path aliases configuration (no more `../../../` imports)
- Abbreviated size conventions (`sm`, `md`, `lg`, `xl`)
- Type-first architecture with separated `types.ts` files
- Type declarations over interfaces (`type` vs `interface`)

### 📋 Project Structure
```
src/
├── components/
│   ├── ui/                    # UI Design System
│   │   ├── Button/
│   │   │   ├── index.tsx
│   │   │   └── styles.css
│   │   ├── Card/
│   │   │   ├── index.tsx
│   │   │   └── styles.css
│   │   ├── Badge/
│   │   │   ├── index.tsx
│   │   │   └── styles.css
│   │   ├── Avatar/
│   │   │   ├── index.tsx
│   │   │   └── styles.css
│   │   ├── StatusIndicator/
│   │   │   ├── index.tsx
│   │   │   └── styles.css
│   │   └── index.ts           # Export all UI components
│   └── Layout/
│       ├── index.tsx
│       ├── styles.css
│       └── components/
│           ├── Sidebar/
│           │   ├── index.tsx
│           │   └── styles.css
│           └── MainContent/
│               ├── index.tsx
│               └── styles.css
├── index.tsx
├── App.tsx
└── index.css
```

## Future Development Notes

When adding new components:
1. Always create the directory structure first
2. Create index.tsx with proper TypeScript interfaces
3. Use consistent TailwindCSS classes
4. Add tests when component logic becomes complex
5. Follow the import patterns established

Remember: The goal is maintainability, testability, and clear organization!
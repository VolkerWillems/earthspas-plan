# Earth Spas design system

This directory is the reusable UI foundation for the decision site and future Earth Spas products.

## Component layers

- `components/ui` contains small, accessible primitives such as Button, Card, Badge, Input, Checkbox and Table.
- `components/layout` contains SiteShell, SiteHeader, SiteFooter and page-level composition.
- `components/navigation` contains navigation data and desktop/mobile navigation.
- `components/forms` is reserved for composed form fields and validated form sections.
- `components/data-display` is reserved for tables, metrics, chart shells and dashboards.
- `components/feedback` is reserved for alerts, progress, empty states, loading and errors.
- `components/motion` contains reusable motion wrappers, flow nodes and reduced-motion behavior.
- `components/blocks` contains complete business sections such as growth cards, diagrams and showcases.
- `components/pwa` contains install and device-specific behavior.

Import through public index files where possible. Root-level components remain compatibility entrypoints while pages are migrated.

## UI rules

1. Use a shared primitive before creating route-specific markup.
2. Use `Card` for card surfaces, `Button` for actions and `Table` for tabular data.
3. Use Phosphor as the Earth Spas product icon set. Lucide remains installed for shadcn and external registry compatibility.
4. Use `motion` from `motion/react` for React animation. Do not add Framer Motion beside it.
5. Use CSS transitions for simple hover and focus effects. Use Motion only for state, layout, gesture and orchestrated animation.
6. Respect `prefers-reduced-motion` in every animated block.
7. Do not hardcode brand colors, spacing, radii or type sizes. Use the variables from `styles/theme.css` and `styles/responsive.css`.
8. Do not add route-specific CSS files or CSS modules.

## Stylesheet layers

`app/globals.css` imports only `styles/index.css`.

- `styles/theme.css`: colors, surfaces, typography, radii, shadows and semantic tokens.
- `styles/responsive.css`: fluid type, spacing, controls and viewport rules.
- `styles/components.css`: shared component and layout selectors. This file is being split by responsibility as components migrate.
- `styles/motion.css`: durations, easing, reveals and reduced-motion behavior.
- `styles/flows.css`: software and agent-flow presentation.
- `styles/charts.css`: map and chart presentation.
- `styles/index.css`: import order only; no component rules.

## Package policy

- `@phosphor-icons/react`: primary product icons.
- `lucide-react`: shadcn and registry compatibility only.
- `@tanstack/react-table`: typed headless table logic. Do not install `@types/react-table`.
- `motion`: the single React animation library.
- `recharts` and `@visx/brush`: charting and time-series interaction.
- Radix packages: accessible behavior for controls that need it.
- shadcn: pinned development CLI and source-component workflow, not a runtime component package.

## Registry components

`components.json` configures shadcn and the `@bklit` and `@7ovr` registries. Registry components must be adapted to Earth Spas tokens and reviewed before promotion into `components/ui` or `components/blocks`.

A registry component is never the source of truth merely because a remote generator produced it. Humans have already tried that management strategy elsewhere.

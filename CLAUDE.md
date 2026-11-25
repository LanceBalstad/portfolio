# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site, scaffolded from the Vite React + TypeScript template. It is being built from a Figma mockup: the only page is `Home`, a single scrolling page made of section components.

## Project Documentation

- Keep CLAUDE.md up to date as the project evolves.
- When significant architectural decisions, technology changes,
  or coding conventions are established, update this file.
- Don't document minor changes or individual bug fixes.
- Keep documentation concise and avoid duplicating existing information.

## Commands

- `npm run dev`: start the Vite dev server with HMR
- `npm run build`: type-check with `tsc -b` (project references), then run `vite build` to produce `dist/`
- `npm run lint`: lint with oxlint (config in `.oxlintrc.json`: react, typescript and oxc plugins). `eslint-plugin-react-hooks` is loaded via oxlint `jsPlugins` under the alias `react-hooks-js` (the `react-hooks` name is reserved for oxlint's native rules, whose overlapping rules are turned off). Its compiler-based rules such as `set-state-in-effect` and `no-deriving-state-in-effects` enforce the useEffect guidance below.
- `npm run preview`: serve the production build locally

There is no test framework set up yet.

## Architecture

- Stack: React 19, TypeScript ~7, Vite 8 with `@vitejs/plugin-react` (Oxc-based). The React Compiler is not enabled.
- Entry: `index.html` → `src/main.tsx`, which renders `<App />` inside a `div.index-body` wrapper under `StrictMode`. `src/App.tsx` composes the page components.
- Pages go in `src/pages/`. Each page has its own `.tsx` file and a matching `.css` file that the component imports directly, with a page-scoped root class (for example `home-body`). Global styles go in `src/index.css`. There is no routing library yet.
- Reusable or self-contained page sections go in `src/components/`, each in its own folder holding its `.tsx` and `.css` (for example `src/components/card/card.tsx` and `card.css`). Folders and files use camelCase names; components use PascalCase. Each `.css` file has a root class whose root class is named after the component (for example `.intro`, with children like `.intro-title`).
- Clickable section cards use the shared `Card` button; their modal content is a single `CardModal` (native `<dialog>`) rendered in `Home`, which owns the open card id so both cards and header nav links can open it. Card titles and modal content live in `src/data/cards.ts`, keyed by `CardId`.
- Breakpoints: `1104px` is where full-width blocks (banner, hands-on panel) touch the screen edges and drop their side borders; `720px` switches sections to the stacked phone layout.
- Load animation: elements get the global `fade-in` class (`src/index.css`) and set `--fade-order` in their own component CSS. Each step adds 50ms of delay, and the whole sequence from header to footer finishes in about 1s. The 720px layout uses an identically defined keyframe under its own name, so crossing that breakpoint changes `animation-name` and replays the sequence.
- Falling leaves: the leaf list lives outside React in `fallingLeaves/leafStore.ts`, capped at 200 leaves. `TreeBanner` ignores clicks for 3s after each shake. Only `FallingLeaves` subscribes to it, via `useSyncExternalStore`, so leaf changes never re-render `Home`. `Home` passes `dropLeaves` to `TreeBanner` without subscribing. `FallingLeaves` runs the timed spawn and one shared `requestAnimationFrame` loop, which runs only while leaves exist. Each leaf's random motion state comes from `leafMotion.ts`, and its transform is written straight to the DOM. Everything below the banner sits in `div.home-content`, which uses `isolation: isolate` so `FallingLeaves`, at `z-index: -1`, renders behind the sections. Leaves spawn within the banner's width. The container clips them only at the top and bottom (`overflow-y: clip`), so they can drift past the banner's sides, and `.index-body` uses `overflow-x: clip` to cut them off at the screen edges without a horizontal scrollbar.
- SVG icons are React components in `src/assets/icons/`; images go in `src/assets/images/` and are imported into the component that uses them.
- Static assets go in `public/` and are served from the site root (for example `/favicon.svg`).

## TypeScript constraints

`tsconfig.app.json` enables settings that make `npm run build` fail on code that would otherwise compile:

- `noUnusedLocals` / `noUnusedParameters`: unused imports or variables are build errors. With the `react-jsx` transform, do not add `import React from "react"` unless `React` is actually used.
- `verbatimModuleSyntax`: type-only imports must use `import type`.
- `erasableSyntaxOnly`: no `enum`, `namespace` or constructor parameter properties.
- `allowImportingTsExtensions`: imports may include the `.tsx` extension (as in `main.tsx`).

## Coding Conventions

- Avoid comments in code. The only exception is a short summary comment at the top of a larger function or method.
- Fix the underlying issue with a proper refactor instead of patching symptoms with a quick fix, when the refactor is the better solution.

## React Best Practices

### useEffect Restrictions

- Avoid using `useEffect` by default. Only use it when synchronizing with an external system or when there is a legitimate lifecycle-related reason.
- Never use `useEffect` to calculate derived state that can be computed during rendering.
- Never use `useEffect` to respond to user interactions. Use event handlers instead.
- Avoid using `useEffect` to synchronize multiple pieces of React state. Consider deriving values or lifting state up.
- Avoid chains of effects that trigger additional state updates and renders.
- When an effect is necessary, ensure its dependency array is complete and accurate.
- Always implement appropriate cleanup for subscriptions, event listeners, timers, and other persistent side effects.
- Never suppress React Hook dependency warnings just to make an effect behave as intended.

### General Guidelines

- Prefer simple, declarative React patterns.
- Use `useState`, `useMemo`, `useCallback`, and `useRef` only when there is a clear reason.
- Follow React's official documentation and recommended patterns.
- Before introducing a `useEffect`, consider whether the problem can be solved without one.
- Do not sacrifice code readability just to avoid a particular React hook.

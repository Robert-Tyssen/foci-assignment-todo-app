# Foci To-Do App Assignment

_A simple To-Do list app for the Foci interview process_

[![codecov](https://codecov.io/gh/Robert-Tyssen/foci-assignment-todo-app/branch/main/graph/badge.svg)](https://codecov.io/gh/Robert-Tyssen/foci-assignment-todo-app)

## Overview

Thank you for taking a look at my repository! This repo contains a simple To-Do app developed for the [Foci Solutions](https://www.focisolutions.com/) interview process.

For this assignment, I chose to build a web application for a To-Do app, using the browser's local storage for persistence. The goal of this repository is to highlight clean architecture patterns. Although this application is quite simple, these patterns are intended to scale easily to larger applications with more complex functionality. As a result, portions of the code, while straighforward to reason about, may seem over-engineered for the use case. See laters sections for rationale behind my technical design.

This README includes details on installing and deploying this repo locally; however, the finished product is also available on GitHub Pages:

https://robert-tyssen.github.io/foci-assignment-todo-app/

## Tech Stack Used

- **Development** - React + Typescript + Vite (see information [here](https://vite.dev/guide/))
- **Testing** - [vitest](https://vitest.dev/)
- **UI Library** - [Mantine v8](https://mantine.dev/)
- **Hosting** - GitHub Pages

TypeScript was selected as the primary development language, as it provides type-safety to standard JavaScript development code. This helps create consistency across the application, ensuring that all variables, inputs and APIs are consumed as intended. Any typing errors are highlighted in the code editor, rather than causing unexpected bugs at runtime.

Additional packages were used to aid development:

**Key Packages Used**

- **@mantine/core** and **@mantine/hooks** - provide the core UI library, including preset styles and built-in components to reduce the amount of UI development needed.
- **@mantine/dates** - provides additional components for date inputs (e.g. used for selecting To-Do due dates)
- **@mantine/form** - provides form entry functionality, such as input validation and submission
- **@mantine/notifications** - provides popup notifications, which are useful for feedback (e.g. success and failure messages)
- **@tabler/icons-react** - provides several pre-made icons to provide better visual cues on the UI.
- **@tanstack/react-query** - provides hooks to simplify state management when loading asynchronous data (e.g. loading and error handling, caching, cache keys, etc.)
- **@tanstack/react-router** - provides type-safe routing

## Installation and Usage

TODO

## Technical Architecture

TODO

## Future Improvements

TODO

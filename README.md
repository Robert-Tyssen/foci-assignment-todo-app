# Foci To-Do App Assignment

_A simple To-Do list app for the Foci interview process_

[![codecov](https://codecov.io/gh/Robert-Tyssen/foci-assignment-todo-app/branch/main/graph/badge.svg)](https://codecov.io/gh/Robert-Tyssen/foci-assignment-todo-app)
[![GitHub Pages](https://img.shields.io/badge/Live-App-brightgreen)](https://Robert-Tyssen.github.io/foci-assignment-todo-app/)

## Overview

Thank you for taking a look at my repository! This repo contains a simple To-Do app developed for the [Foci Solutions](https://www.focisolutions.com/) interview process.

For this assignment, I chose to build a web application for a To-Do app, using the browser's local storage for persistence. The goal of this repository is to highlight clean architecture patterns. Although this application is quite simple, these patterns are intended to scale easily to larger applications with more complex functionality. As a result, portions of the code, while straighforward to reason about, may seem over-engineered for the use case. See laters sections for rationale behind my technical design.

This README includes details on installing and deploying this repo locally; however, the finished product is also available on GitHub Pages:

https://robert-tyssen.github.io/foci-assignment-todo-app/

This application has two primary pages:

- **/foci-assignment-todo-app/#/todos** - is the main page, displaying a list of all the To-do's.
- **/foci-assignment-todo-app/#/todos/$todoId** - is the detail page, displaying the details for a single To-do. The _$todoId_ URL parameter is populated when selecting a To-do from the main list page

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

## Getting Started

### Prerequisites

- Node.js (v18+ recommended) - download [here](https://nodejs.org/en/download)
- npm (packaged with Node.js)

### Installation

First clone the repository:

```bash
git clone https://github.com/Robert-Tyssen/foci-assignment-todo-app.git
cd foci-assignment-todo-app
```

> **NOTE** - the rest of the guide assumes commands are being run from the project root (i.e. within `foci-assignment-todo-app` after cloning the repo)

Once the repo is cloned, install dependencies:

```bash
npm install
```

### Run the app locally

To run the app locally, run the following command in the terminal:

```bash
npm run dev
```

By default, the app will be available at http://localhost:5173/foci-assignment-todo-app/

> NOTE - this app uses a base URL of `foci-assignment-todo-app` in the Vite configuration, this is for compatibility with GitHub Pages.

### Testing

This project uses Vitest and React Testing Library for unit and component tests. To run tests, run the following from the terminal:

```bash
npm run test
```

To generate a coverage report:
```bash
npm run test:cov
```

### Build

To create a production-ready build, run the following command:
```bash
npm run build
```

This will generate a `dist/` directory in the project root directory which is ready for deployment. To preview the product build, run:
```bash
npm run preview
```

By default, the production preview will become available at http://localhost:4173/foci-assignment-todo-app/

## Technical Architecture

The project has the following folder structure (some files and folders omitted for clarity):

```text
.
├── dist/
├── src/
│   ├── app/
│   │   ├── di/
│   │   ├── App.tsx
│   │   └── routes.js
│   ├── domain/
│   │   ├── usecases/
│   │   ├── todo.ts
│   │   └── todo-repository.ts
│   ├── infra/
│   │   └── local-storage-todo-repository.ts
│   ├── ui/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── pages/
│   ├── utils/
│   └── main.tsx
└── README.md
```

This folder structure was selected to provide a good separation of concerns between _presentation_, _application_, and _business_ logic. Here is a description of each folder and its contents:

**1. Domain (Business Logic Layer)**

The _domain/_ layer contains our business logic, which is the core of the application. It includes the data models for all of the entities our app uses (e.g. the 'Todo'). Any core business rules are implemented here as well, such as To-do list filtering logic.

The domain layer also includes 'use cases' which orchestrate any complex business logic, such as creating / reading / updating / deleting a To-do item. Use cases receive a _Repository_ object as an input. The interface definition is defined in the domain layer as well, but is implemented in external layers (see _Infra_ layer below). This ensures that the domain layer defines the operations which should exist (e.g. `createTodo()`, `updateTodo()`, etc.) but has no dependencies on the actual implementation.

Concrete implementations of the To-do repository are instantiated at application startup, and stored as react contexts which can be injected into the usecases when they are invoked (implemented in the **di/** folder).

The domain layer has the following design goals:

- Should not depend on any code from other layers (e.g. _ui/_ or _infra/_)
- Should not depend on any third-party frameworks (e.g React, UI frameworks)
- Should have 100% test coverage

The design goals stated above help ensure that our domain layer is independent of our technical implementation, allowing easier refactoring should the implementation change in the future. For example, if we were to migrate our local storage persistence layer to a database, we only need to swap out the repository implementation with zero modifications to the domain.

**2. Infra (Infrastructure and Persistence Layer)**

The _infra/_ layer primarily contains the concrete implementation of the `TodoRepository` interface which is defined in _domain/_. It uses local storage to persist To-do objects across browser sessions. The `LocalStorageTodoRepository` is instantiated within the dependency-injection (DI) logic called at startup, and injected into domain usecases during runtime. This DI approach ensures that the usecases remain domain-first - they are unaware of the actual local storage implementation, only that it follows the contract defined in `TodoRepository`.

This approach means we can easily swap out our repository implementation. For example, we could implement a new `DatabaseTodoRepository` or `RestAPITodoRepository`. As long as the implementation satisfies the `TodoRepository` interface, they can be easily swapped out without changing other parts of the application.

**3. UI (User Interface / Presentation Layer)**

The _ui/_ layer is the user interface and presentation layer. It is the layer that the user interacts with when using the application. It consists of a few sub-layers:

- **components** - these are straighforward React components which implement the user interface for small portions of the app. For example, there is a `TodoListTile.tsx` component, which contains all of the UI logic for a single To-do item in the list.
- **pages** - these are larger, more complex React components which implement entire pages of the application. They typically will be composed of smaller components.
- **hooks** - React hooks are used to provide interactivity between the presentation and domain layers. For example, the `useCreateTodo` hook receives form inputs when creating a To-do item, fetches the `TodoRepository` implementation from the DI container, and consolidates them to inovke the `createTodo()` use case. It exposes state management variables, such as loading and error parameters which can be consumed in the UI, and returns the results of the use case execution.

The typical control flow of the application is as follows:

1. User performs an action on the UI
2. The corresponding hook is called with any necessary inputs from the UI
3. The hook fetches the DI container to locate the `TodoRepository` implementation
4. The hook invokes the domain use case, providing the repo and any other inputs
5. The use case executes any business logic by calling the repo as needed (unaware of its concrete implementation, only the interface definition)
6. Results are propagated from the use case, to the hook, and finally to the UI.

This pattern is quite involved for a fairly simple application such as a To-do list, but allows us to easily scale and add new features, and makes the application easier to reason about since we can more clearly follow the data flow to identify issues or areas to improve.

**Additional Layers**

In addition to the primary _domain/_, _infra_/ and _ui/_ folders described above, we have the following additional folders:

- **app/** - contains the URL route definitions, and the DI container logic. These are generally globally available throughout the app.
- **utils/** - any additional helper functions and utilities are defined here. This is usually for code that is not domain-specific (e.g. manipulating Date objects, etc.)

This application architecture is inspired heavily by _Clean Architecture_ - the below image provides a good viusualization:

![Clean Architecture Example](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

Image Credit: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

## Future Improvements

There are a few improvements that could be added to further extend this application. They have been omitted from this project in the interest of time, but here are a few ideas, and high-level discussion on how they might be implemented:

**1. To-Do Sorting**

The app has some simple filtering logic, but does not have any sorting functionality currently. To build this, the suggested approach would be to create a new domain model `TodoSortOption` which contains the field to be sorted by, and an ascending / descending indicator. Based on this model, Array.sort() functions could be built to sort `Todo` objects accordingly. Next, a component would be added to the Todo list page to control the selected sort options, in a similar fashion to the existing `FilterPicker`.

**2. Multi-tenancy**

Currently, the app is for a single user. For a production application on the cloud, it would be necessary to have To-do's scoped only to the user who created it. To add this, we would extend the `Todo` model with a `userId` field, and would incorporate this into the `TodoRepository` function definitions.

Practically, the app would then need to integrate with an Auth provider to manage user accounts, such as login and registration flows to ensure users are authenticated. All repository requests for To-do CRUD operations would be need to be made auth-aware, so requests can be scoped to the user performing the request. The backend would need to then perform authorization checks, to ensure users can only read or modify their own data.

**3. Backend persistence**

Currently, the application uses browser local storage for persistence of To-do information. This would quickly cause scalability problems as the number of To-do's increases, and is not stable storage (e.g. clearing browser data may delete a user's To-dos).

To improve the design, we would implement a database system to store To-do's on the cloud. We would modify our `LocalStorageTodoRepository` to connect to the database (e.g. via Rest APIs) to handle CRUD operations.

It is worth noting that moving the To-do's to the cloud may introduce extra latency in requests, so we may need to also review state management to ensure UX remains good during longer running operations (e.g. loading and error indicators, optimistic cache updates, etc.).

# Thank you!

Thank you for taking the time to review this project and README. I am happy to answer any additional questions, or provide a demonstration if necessary.

Cheers,

Robert Tyssen
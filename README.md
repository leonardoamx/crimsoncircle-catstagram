# Crimson Circle - Catstagram

## Important resources:

- Vercel Live demo: https://crimson-circle-catstagram.vercel.app/
- Github repository: https://github.com/leonardoamx/crimsoncircle-catstagram (Request access to leonardoamx@outlook.com)


## Setting up the project

After cloning the repository, follow these steps:

- Install dependencies:
```
npm install
```

- Create a `.env` file based on `.env.example`.
- Register at https://thecatapi.com/ to get your own API token and replace the value of `VITE_CAT_API_TOKEN` in the `.env` file.


## Running the development server

```
npm run dev
```
Then open the localhost URL (by default http://localhost:5173) in your browser to see the app.


## Building the project

```
npm run build
```


# Technical questions

## What is the React Lifecycle?

With the modern functional components approach, the lifecycles follows this sequence:

1. Render: The engine calls the component functions that might need be re-rendered (in memory process only).
2. Commit: The rendered components are compared against the Virtual DOM to find differences and spot nodes that needs to be repainted.
3. Paint: Virtual DOM changes are applied to the Document DOM.
3. Passive effects: The engine iterates over useEffects, asynchronous process and cleaning up resources. This phase can trigger a new rendering loop.


## What are the different ways to pass data between components, and which approach are you using in your current project, and why?

So far I have passed data to components using properties.
I have also used a Provider pattern, due to using PrimeReact, but not because I built it myself.
As this applications scope grows (for example when adding history and a full featured API), we'll need features as state management and useContext.


## What data should be stored in state?

The rule of thumb is to use a state management when:
- Different views or components use the same information and they're in different nesting leves, for example `user data`.
- When we need a single source of truth or some data, for example `cart items` or when multiple components can modify the data.


## How does a state affect rendering?

There are recommendations to prevent that a state affects performance. That's important because changing state data can causes re-rendering of extensive parts of the Virtual DOM. Some of them are memoize techniques, useMemo, and useReducer.


## What is componentDidMount() and componentWillUnmount(), and how can they be implemented with React Hooks?

Those are methods from the legacy Class components approach, their equivalent for functional components is useEffect, with this structure:
```
const [dataItem, setDataItem] = useEffect(() => {
  // bussiness logic for these properties
  // Equivalent to componentDidMount

  return {
    // Additional logic when these properties are being flushed (unsubscribe from observers and even listeners, stopping intervals, closing socket connections, etc.)
    // Equivalent to componentWillUnmount
  }
}, [
  // List of properties that will cause this effect to be re-evaluated.
])
```

## Can you demonstrate those concepts in this Challenge?

So far I have used a basic useEffect implementations with this features in mind:
- Linking an useEffect to another property change (the relation between cat breeds and the current list).
- Using AbortController to cancel ongoing request if the component is unmounted or flushed mid-process


## A short justification of any additional libraries used.

- Tailwind CSS: It offers a modern approach when modeling the UI
- PrimeReact: Between the list of UI I could use, I picked this one
- Vite: It's the current toolkit to develop and compile React. In a future version I would like to implement Vite+ instead

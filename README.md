# pomodoro-timer

This is pomodoro timer app that served as a study case for frontend tools (and their concepts) like react.js, react context api, react reducer api, vitejs, styled components, react hook form, zod, react router dom and immer.

The application allows users to set custom timer intervals and keep track of their work interval history. The application runs only on the client side; therefore, there is no persistent data stored in a long-term storage solution like a database.

[Figma](https://www.figma.com/file/r8dpKcu4kuFkXMmqn3BmbK/Ignite-Timer-(Community)?type=design&node-id=127-2340&mode=design&t=CkFuTL68tnawT6sc-0)


### Project creation with vite

Run `npm create vite@latest` and answer the interactive questions and clean up the bootstrapped project (css, images, etc).

#### Default export and Named export

In general the choice doesn't make much of a difference - especially when you are trying to keep one component per file to keep the project organised and the components complexity low.

The only slight advantage of the named export is that devs tends to copy and paste a lot during development. Should a component initially created as a copy of another not have its name properly (re)defined, the default export may hide it as clients using the component can set their own names (it doesn't have to match the exported one).


### Styled Components

Styled components uses a concept known as CSS in JS (write the application's css in js syntax).

Installation: `npm i styled-components` (newer versions come with built-in TS declarations, but until quite recently it didn't so in case the version you are working with doesn't, just add them `npm i @types/styled-components -D`).

_Similarly to vanilla css (maybe sligthly easier and more flexible), it's possible to define different themes on styled components via the component ThemeProvider and the props theme (`${props => props.theme.primary}`) - more info check commit_

_Styled components does not automatically extend its types with custom themes properties. It's necessary to extend it manually to have IDE completion and typescript type enforcement and validation._
 
 #### Application Custom Types (overloading external libs definition)

 When working with TS, it's possible to create type definition files (declaration files) specific for an application - the custom types for that application.

In the styled components case when (custom) themes are created, it enabled typescript type enforcement and validation and also IDE completion suggestion.

Check `./src/@types/styled.d.ts` and git commit for details of implementation.

Ps directory `@types` and file name `styled.d.ts` is not mandatory and could be anything. The suffix `.d.ts` indicates that it is a file with types definition.


### ESLint

ESLint enforces standards defined by the project (double vs single quotes, semi-colon or not at the end of lines, etc). It automatically applies the rules without burdening developers to remember them.

Popular config: airbnb: `npm i eslint-config-airbnb -D`

To run eslint from command line: `npx eslint src --ext .ts,.tsx`

https://eslint.org/docs/latest/rules/

https://eslint.org/docs/latest/use/getting-started


### React Router (works with web and native)

`npm i react-router-dom`


#### Layout Routes / Outlets

When users navigate to different components via react router routes, parts of the application that do not change get rerendered if they are simply replicated inside those components.

Example:

```javascript

function Header() {...}

function Home() {
    return (
        <div>
            <Header />
            ...
        </div>
    )
}

function History() {
    return (
        <div>
            <Header />
            ...
        </div>
    )
}

<Routes>
    <Route path="/" element={<Home />}>
    <Route path="/history" element={<History />}>
</Routes>
```

React dom outlet allows the creation of layouts where the wrapping components do not get rerender when users nagivate to within subcomponents.

```javascript

function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet /> <!-- Where react router will render the sub components -->
    </div>
  );
}

function Header() {...}

function Home() {...}

function History() {...}

<Routes>
    <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />}>
        <Route path="/history" element={<History />}>
    </Route>
</Routes>
```


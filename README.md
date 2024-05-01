# pomodoro-timer

This is pomodoro timer app that served as a study case for frontend tools (and their concepts) like react.js, react context api, react reducer api, vitejs, styled components, react hook form, zod, react router dom and immer.

The application allows users to set custom timer intervals and keep track of their work interval history. The application runs only on the client side; therefore, there is no persistent data stored in a long-term storage solution like a database.

[Figma](https://www.figma.com/file/r8dpKcu4kuFkXMmqn3BmbK/Ignite-Timer-(Community)?type=design&node-id=127-2340&mode=design&t=CkFuTL68tnawT6sc-0)


### Project creation with vite

Run `npm create vite@latest` and answer the interactive questions and clean up the bootstrapped project (css, images, etc).

#### Default export and Named export

In general the choice doesn't make much of a difference - especially when you are trying to keep one component per file to keep the project organised and the components complexity low.

The only slight advantage of the named export is that devs tends to copy and paste a lot during development. Should a component initially created as a copy of another not have its name properly (re)defined, the default export may hide it as clients using the component can set their own names (it doesn't have to match the exported one).







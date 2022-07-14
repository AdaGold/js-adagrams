# gamestate
This is where you find functions controlling the game's underlying state, which includes things like what screen the game is displaying, how many rounds have been requested, what players have guessed, etc. There are a few types of things here that you will commonly find in code following a [state reducer](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers) pattern:
- Actions
- Reducers
- Middleware
- Selectors

## Actions
An action is just an object. It's expected to have a `type` field with a string value that tells you what type of action it is. Beyond that, it's completely up to you what's in the action object, but most people put the data it contains in a field called `payload`. The point of an action is to indicate, via its type, which part of the reducer should run and provide whatever data is needed to calculate the next state.

## Reducers
The `reducer` at the bottom of [reducer.js](./reducer.js) looks complicated. Fundamentally, it's a function that is just like the callback you pass to [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce). In fact, you can imagine React, under the covers, taking an array of action objects that it has been given via `dispatch`, and literally calling `reduce` on that array using your reducer function. The `reduce` function will use your reducer to calculate the new `state`, starting with `initialState`, for every action that it was provided. (You do have to imagine this, though. React doesn't actually use `reduce`. It needs to prioritize, defer, and occasionally discard work it has done to update state, so the mechanism it uses to loop over actions is more complicated.) Once the actions are applied, you end up with a brand new state object that is the result of previous state and action running through your reducer function.

## Middleware
So why is the `reducer` surrounded by a bunch of other function calls? These are "middleware". They apply the [Decorator Pattern](https://blog.logrocket.com/understanding-javascript-decorators/) to modify the core behavior of `gameStateReducer`. For example, while `gameStateReducer` will happily set `desiredPlayers` to whatever the action payload's value is, it is wrapped in [validateOptionsInput](./options.js), which will swap the action out for an error action if the payload isn't in a valid range. You could achieve the same result with a big, monolithic reducer function, but using the decorator pattern gives you more flexibility to change the reducer without modifying its existing implementation. (That's the O in [SOLID](https://www.geeksforgeeks.org/solid-principle-in-programming-understand-with-real-life-examples/), open/closed: the reducer is open for extension, but closed for modification.) The separation of middleware also presents opportunity to test the middleware independently, though the current suite of tests simply tests the reducer with all the middleware wrapping it.

## Selectors
There aren't many selectors; the purpose of selectors is to take the `state` object and retrieve information from it. Most places in the application just read what they need directly from `state`, but the win screen has some more complicated calculations to do. Those have gone in [WinScreenInfo](./win-selectors.js).
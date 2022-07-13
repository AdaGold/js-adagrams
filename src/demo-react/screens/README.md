# Screens
This is the game's "presentation layer". If you think of the app as following the [Model-View-Controller (MVC) pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), the screens (and the [components](../components/) they depend on) contain the View and Controller. They render the jsx that comprises the View. They register functions that handle input by dispatching actions to manipulate state, thereby Controlling it. In fact, had the [gamestate](../gamestate/) been simple enough, they would also have been the place where state, the Model, is defined and stored.

## Following MVC
### MVC and the structure of files, functions, and classes
The prior statement is a big hint that "following the MVC pattern" does not mean separating files, or even classes, or even functions (!) into "model", "view", and "controller". Following the MVC pattern means:
1. A user manipulates some input device (mouse, keyboard, touch, microphone, etc.)
1. That input is interpreted by a controller, with enough additional information from the context of the running application, to modify an underlying "model".
1. The change made to the model is observed by a "view" layer, which takes the model changes and renders it into a form that an output device can interpret
1. The rendered output is displayed to the user via some means (screen, printed document, audio output, tactile display, etc.)

The model is the core. Around it, there are many many layers of Controller and View that sit between the user and the model that an application defines. The screens in this folder organize certain aspects of the application's View and Controller, segmenting them in a way that matches the original developer's mental model of how the application is supposed to behave from a user perspective. There are screen component because the wireframes started with screens. The View & Controller layer might have been organized differently, depending on what the original specifications had looked like. Likewise, the "game state" model might not have been monolithic, global, and located in a single folder. There are some obvious seams. Were the application to grow, it would benefit from refactoring to separate the state that changes independently, similar to how these screens are factored to display screens that are independent of each other from a View perspective.

### Specifying the screens
These rough wireframes were used to guide development of the View. The "screens" concept evolved directly from the wireframes:

![This is a high level description of screens in the Adagrams application. Five screens are listed: Main Menu, How to Play, Set up game (with a name entry sub-screen), In-game, and Win Screen. All of the screens' layouts except for in-game are shown in this wireframe. The "Main Menu" screen has three options: Start New Game, How to Play, and Quit. "Start New Game" is highlighted. The "How to Play" screen provides the following explanation: "Select # and names of players. Each round, a new set of 10 letters is chosen. Every player has a certain number of seconds to guess. The winner is whoever has the highest score at the end of all rounds." The Set up Game screen has three areas to enter numbers: Number of players (1-4), Number of rounds, and Seconds per player per round. It lists initial values of 2, 3, and 15, respectively. 2 is highlighted. The player entry sub-screen of "Set up Game" prompts the user with "Player whatever, enter name". As an example of input, "Matt" is the name entered. The subs-screen is prescribed to show for each of the number of players entered in "Set Up Game". The In-Game screen is part of the next wireframe image and not present. Finally, the Win Screen shows that a message will display after the game is complete. The message is: "Player wins with Number points!", where Player and Number are placeholders for the winner and how many points they earned. Additionally, a list of players and the points they earned appears below.](../docs/screens-wireframe-1.png)
![This second wireframe displays the In-Game screen listed in the first wireframe. Along the top of the screen is an example Adagrams hand: I A H Z R D H E S G. The round number and time remaining are displayed below this. Then, each player name is displayed in its own column, with the first player highlighted. A note points out that the highlight indicates the current guesser. Below the first player, a guess, "DEAR" is shown, along with its score. Below that, a blank area is highlighted, and a note is attached: "Highlight where you're entering words." The second player column has a note that says: "Not allowed to guess another player's word." It also has a note that says: "Start here on next round", which means the wireframes suggest that the round following this one should start with the second, rather than first, player.](../docs/screens-wireframe-2.png)

It's worth mentioning that the final result does not implement these wireframes exactly. The rough, hand-drawn nature of these wireframes is a big hint that they are not intended to be a full specification, followed rigorously; they are merely a jumping-off point. That is exactly how development played out.

## Magic index.js
The root component of the screens, `ScreenDisplayer`, is inside of `index.js`. That lets the import statement in [app.js](../app.js) look a little magical:

```
import ScreenDisplayer from './screens';
```

JavaScript `import` knows to look for `index.js` when it's given a folder instead of a file, and that's how `App` ends up getting the `ScreenDisplayer` without mentioning "index" anywhere.

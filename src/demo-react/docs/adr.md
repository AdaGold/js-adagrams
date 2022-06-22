_This document is an Architecture Decision Record (ADR). It is based on the [MADR template](https://adr.github.io/madr/). Learn more about ADRs: https://adr.github.io/_

# Rewrite Demo Game for maintainability and to facilitate React understanding

## Context and Problem Statement

The demo game for Adagrams has presented some challenges for TAs
in the past few years:

1. Fixes and featues are difficult to apply.
1. The demo game fundamentally depends on [Vorpal](https://github.com/dthree/vorpal), which is no longer being maintained.
1. Students try to understand the demo game architecture and get discouraged. The architecture suffers from a few issues that make it difficult for even seasoned developers to understand, including:
   - There is tight coupling among the Controller and View classes in the game.
   - The classes violate the Single Responsibility Principle.
   - Most of the interesting functionality is in difficult-to-follow callbacks.

It would be preferable for this demo game to be architected and written in a way that is less cumbersome for students to detangle and also more desirable for them to emulate.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Students need to be able to use the demo game to manually test their Adagrams solution.
* Ada staff need to be able to keep the demo game up to date and maintain its tests and functionality.
* The demo game's architecture should match Ada pedagogy and ought to serve as a model for application development that students might reasonably choose to emulate.
* Students should be able to follow the demo game's flow of control with guidance from instructional staff or TAs.
* The volunteer who wrote this thinks it would be fun to write a command line utility that depends on React.

## Considered Options

* Refactor the existing Vorpal demo game.
* Rewrite the demo game using [Ink](https://github.com/vadimdemedes/ink).

## Decision Outcome

Chosen option: Rewrite the demo game using Ink, because:
- Modifying and refactoring the existing Vorpal-based demo game proved difficult.
- Ink is being actively maintained and relies on React, which is a core part of the Ada curriculum. Vorpal requires effort to learn, and in the context of the Ada curriculum is only useful in this application.

<!-- This is an optional element. Feel free to remove. -->
### Positive Consequences

* Students now have an example game written in a framework that they are more likely to be able to emulate and be productive with. Ink has obvious adoption, e.g. it is used by Jest.
* Students who try to understand the programming model, which is React-based, will have an easier time connecting the architecture to concepts they are about to learn. Students who don't find the concepts accessible at this point in the curriculum, but decide to put some effort into exploring this code, may benefit from revisiting the architecture of this app once they've learned some React.
* Staff will not be required to learn Vorpal in order to fix or extend the app.


<!-- This is an optional element. Feel free to remove. -->
### Negative Consequences

* Time spent coding the rewrite
* Fewer examples of non-React JavaScript in the curriculum

<!-- This is an optional element. Feel free to remove. -->
## More Information

Here is a deeper discussion of the problem context and challenges presented to maintaining the existing demo game:

1. Fixes and featues are difficult to apply. The architecture of the app makes bugs hard to investigate. For example, the game offers a round timer in its arguments, but it does not implement this round timer. One of the volunteer TAs (this document's author) [created a one-line fix](https://github.com/mmcknett/js-adagrams/commit/5a4535f7b5212b704fa6a478ba98b75ae67d9ee7) for this behavior, yet it is not obvious from inspecting the code--not even to that TA, upon reviewing the commit--why this fix works. Additionally, the tests for the demo game have sporadically led to student submissions failing even though the tests pass locally. It would be nice to apply the principle of "if it ain't broke, don't fix it." However, it is difficult to tell if the demo game is broke and, should it be determined to **be** broke, how one might fix it.

1. The demo game fundamentally depends on [Vorpal](https://github.com/dthree/vorpal), which is no longer being maintained. Some forks of Vorpal had been created with the intention of keeping the library maintained, including [moleculerjs/vorpal](https://github.com/moleculerjs/vorpal) and [vorpaljs-reforged](https://github.com/vorpaljs-reforged/vorpal), but these forks also appear to have fallen into inactivity. Keeping Vorpal updated has been necessary in the past to suppress `npm audit` security notices, which have scared and distracted students. At this point, there is no known drop-in replacement for Vorpal.

1. Each cohort, students look to the demo game as a model for how they oght to write JavaScript. Most, understandably, get discrouaged and give up trying to unravel it. As a student, it is easy to blame yourself for an inability to understand code, especially when it follows a "simple" pattern, as Model View Controller (MVC) is purported to be. The demo game even has classes named Model, View, and Controller! Simple, right? TAs, tutors, or instructors are forced to provide the context that this app's architecture is not simple, and is actually difficult for even seasoned developers to approach with intuition. The difficulty arises from a few issues, including:
   1. Tight coupling among the Controller and View classes in the game. For example, the entrypoint to the game is `Controller.start`, which is called from `demo.js`. All that this function does is call `View.start`. All that *that* function does is log a message, then call `show` on the `Vorpal` singleton in the `view.js` module. Two function calls into the demo game, and a trip to the Vorpal docs is necessary to make any informed inferences on the game's behavior.

      The tight coupling among classes seems to have come from an attempt to strictly adhere to the MVC "pattern." During the game's execution, from the very beginning, the flow of control passes back and forth between `Controller`, which invokes `View` after manipulating the model, and `View` which invokes `Controller`-- though it unexpectedly does so via `callbacks` objects. This flow of control likely surprises anyone who looks at [the MVC Wikipedia page](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) for an illustration of the pattern. View and Controller are entirely separate in that illustration. Nonetheless, the connection between the two classes does sensibly arise from the constaints of Vorpal and the need to keep the code relatively simple. Attempting to satisfy the conflicting needs of satisfying Vorpal and satisfying MVC has resulted in classes that are named in a way that defies their true relationship.

   1. The classes violate the Single Responsibility Principle. `View` handles all responsibilities that seem view-related; `Controller` handles all responsibilities that link the model and the view. The `Model` object is probably doing the best job having a single responsibility. That single responsibility is "manage all of the game state", but because the game state is small and interconnected it is arguably singular.

   1. Most of the interesting functionality driving the game is relegated to difficult-to-follow callbacks. This is a result of Vorpal's interface, and not necessarily unexpected. One must become familiar with the expectations of a framework in order to modify an application that depends on that framework. Wrapping your mind around Vorpal's asynchronous model is simply a tax you as a developer must pay to reap the framework's benefits. That said, the tightly-coupled, large classes that are named after abstract concepts do nothing to reduce the complexity of following the asynchronous callbacks. They make it harder, adding an extra layer to the abstraction-detangling.

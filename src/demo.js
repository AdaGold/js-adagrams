import Model from './demo/model.js';
import View from './demo/view.js';
import Controller from './demo/controller.js';

// Initialize the controller I guess
const game = new Controller(Model, View);
game.start();

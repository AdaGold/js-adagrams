const { SWITCH_SCREEN } = require('./action-types');

const ScreenId = {
  ENTER_PLAYERS: 'enter-players',
  HOW_TO: 'how-to',
  MAIN_MENU: 'main-menu',
  SETUP: 'game-setup',
};

class SwitchScreenAction {
  constructor(screenId) {
    this.type = SWITCH_SCREEN;
    this.payload = screenId;
  }
}

function onHelpScreen(state) {
  return state.currentScreen === ScreenId.HOW_TO;
}

function onSetupScreen(state) {
  return state.currentScreen === ScreenId.SETUP;
}

module.exports = {
  SwitchScreenAction,
  ScreenId,
  onHelpScreen,
  onSetupScreen
};

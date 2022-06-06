const { SWITCH_SCREEN } = require('./action-types');

const ScreenId = {
  MAIN_MENU: 'main-menu',
  HOW_TO: 'how-to',
  SETUP: 'game-setup'
};

class SwitchScreenAction {
  constructor(screenId) {
    this.type = SWITCH_SCREEN;
    this.payload = screenId;
  }
}

function onHelpScreen(state) {
  return state.currentScreen === ScreenId.HOW_TO
}

module.exports = {
  SwitchScreenAction,
  ScreenId,
  onHelpScreen
};

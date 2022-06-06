const { SWITCH_SCREEN } = require('./action-types');

const ScreenId = {
  MAIN_MENU: 'mainmenu',
  HELP: 'help'
};

class SwitchScreenAction {
  constructor(screenId) {
    this.type = SWITCH_SCREEN;
    this.payload = screenId;
  }
}

function onHelpScreen(state) {
  return state.currentScreen === ScreenId.HELP
}

module.exports = {
  SwitchScreenAction,
  ScreenId,
  onHelpScreen
};

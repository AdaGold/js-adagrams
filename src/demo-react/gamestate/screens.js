import { SWITCH_SCREEN } from './action-types';

export const ScreenId = {
  ENTER_PLAYERS: 'enter-players',
  HOW_TO: 'how-to',
  MAIN_MENU: 'main-menu',
  SETUP: 'game-setup',
  GAME: 'game',
  WIN: 'win'
};

export class SwitchScreenAction {
  constructor(screenId) {
    this.type = SWITCH_SCREEN;
    this.payload = screenId;
  }
}

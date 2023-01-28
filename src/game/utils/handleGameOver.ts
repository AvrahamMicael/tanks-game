import { Player } from "../bodies/Player.js";
import { removeAllFromBodiesArray } from "../bodiesArray.js";
import { toggleCanvasAndMenu } from "../display/menu.js";

const handleGameOver = (p: Player, animationInterval: number, bodiesInterval: number): void => {
  p.removeEvents();
  removeAllFromBodiesArray();
  clearInterval(animationInterval);
  clearInterval(bodiesInterval);
  toggleCanvasAndMenu();
};

export default handleGameOver;

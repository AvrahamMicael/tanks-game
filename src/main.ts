import { Canvas } from "./game/display/Canvas.js";
import { MOVE_RATE } from "./game/constants.js";
import { Player } from './game/bodies/Player.js';
import { getBodiesArray, pushToBodiesArray, removeFromBodiesArray, removeFromBodiesArrayIfCollided } from "./game/bodiesArray.js";
import { CannonBall } from "./game/bodies/CannonBall.js";
import enemiesSpawn from "./game/utils/enemiesSpawn.js";
import { onClickStartBtn } from "./game/display/menu.js";

const canvas: Canvas = new Canvas();

onClickStartBtn(() => {
  const player: Player = new Player();
  pushToBodiesArray<Player>(player);
  
  const animationInterval: number = setInterval(() => {
    requestAnimationFrame(() => {
      canvas.paintGame();
    });
  });
  
  const bodiesInterval: number = setInterval(() => {
    for(const b of getBodiesArray())
    {
      b.move(
        !(b instanceof CannonBall)
          ? undefined
          : () => {
            removeFromBodiesArray(b);
          }
      );
    }
    removeFromBodiesArrayIfCollided();
  }, 1000 / MOVE_RATE);  

  enemiesSpawn(player, animationInterval, bodiesInterval);
});

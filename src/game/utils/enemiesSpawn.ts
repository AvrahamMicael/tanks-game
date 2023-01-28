import { EnemyWithCannon } from "../bodies/EnemyWithCannon.js";
import { pushToBodiesArray } from "../bodiesArray.js";
import { Enemy } from "../bodies/Enemy.js";
import { Player } from "../bodies/Player.js";
import handleGameOver from "./handleGameOver.js";
import { ENEMIES_SPAWN_INITIAL_INTERVAL, ENEMIES_SPAWN_MIN_INTERVAL, ENEMIES_SPAWN_SUBTRACT_AMOUNT } from "../constants.js";

let interval: number = ENEMIES_SPAWN_INITIAL_INTERVAL;

const enemiesSpawn = (p: Player, animationInterval: number, bodiesInterval: number): void => {
  if(p.lost)
  {
    handleGameOver(p, animationInterval, bodiesInterval);
    interval = ENEMIES_SPAWN_INITIAL_INTERVAL;
    return;
  }
  if(interval > ENEMIES_SPAWN_MIN_INTERVAL)
  {
    let nextInterval: number = interval - ENEMIES_SPAWN_SUBTRACT_AMOUNT;
    if(nextInterval <= ENEMIES_SPAWN_MIN_INTERVAL) interval = ENEMIES_SPAWN_MIN_INTERVAL;
    else interval = nextInterval;
  }
  setTimeout(() => {
    pushToBodiesArray<Enemy>(
      new Enemy(p),
      new EnemyWithCannon(p)
    );
    enemiesSpawn(p, animationInterval, bodiesInterval);
  }, interval);
};

export default enemiesSpawn;

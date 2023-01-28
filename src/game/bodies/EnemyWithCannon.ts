import { Cannon } from '../weapons/Cannon.js';
import { Enemy } from './Enemy.js';
import { BLOCK_LENGTH } from '../constants.js';
import { Player } from './Player.js';

export class EnemyWithCannon extends Enemy
{
  protected readonly _cannon: Cannon;
  
  constructor(
    player: Readonly<Player>,
    COLOR: string = 'grey',
  )
  {
    super(player, 0, COLOR);

    this._cannon = new Cannon(
      this.RADIUS / 2,
      this.RADIUS + BLOCK_LENGTH,
      player,
      this,
    );

    const intervalId: number = setInterval(() => {
      if(this.lost)
      {
        clearInterval(intervalId);
        return;
      }
      this.cannon!.fire();
    }, 2000);
  }
}

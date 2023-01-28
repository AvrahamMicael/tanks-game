import { Body } from './abstract/Body.js';
import { BodyWithAngle } from './abstract/BodyWithAngle.js';
import { BODY_TEAM, ENEMY_SPEED } from '../constants.js';
import { Player } from './Player.js';

export class Enemy extends BodyWithAngle
{
  protected _lost: boolean = false;

  constructor(
    private readonly player: Readonly<Player>,
    speed: number = ENEMY_SPEED,
    COLOR: string = 'green'
  )
  {
    super(...Body.getInitialPosition(player), speed, COLOR, BODY_TEAM.ENEMY);

    const intervalId: number = setInterval(() => {
      if(this.lost)
      {
        clearInterval(intervalId);
        return;
      }
      this.directToPlayer();
    }, 100);
  }

  private directToPlayer(): void
  {
    const { x, y } =  this.player.getCenterPositionB();
    this.angle = Math.atan2(
      y - this.y,
      x - this.x,
    );
  }
}

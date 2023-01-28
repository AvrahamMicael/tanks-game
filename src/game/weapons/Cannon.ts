import { unshiftCannonBallsToBodiesArray } from '../bodiesArray.js';
import { CannonBall } from '../bodies/CannonBall.js';
import { Canvas } from '../display/Canvas.js';
import { DEG90 } from '../constants.js';
import { Player } from '../bodies/Player.js';
import { PositionBlock } from '../types.js';
import { Body } from '../bodies/abstract/Body.js';

export class Cannon
{
  readonly halfWidth: number;
  readonly threeHalfWidth: number;

  constructor(
    readonly width: number,
    readonly height: number,
    private readonly target: Readonly<PositionBlock | Player>,
    private readonly owner: Readonly<Body>,
  )
  {
    this.halfWidth = width / 2;
    this.threeHalfWidth = width * 1.5;
  }

  get angle(): number
  {
    const { x: targetP_x, y: targetP_y }: PositionBlock = this.target instanceof Player
      ? this.target.getCenterPositionB()
      : this.target;

    const { x, y } = this.owner.getCenterPositionB();

    let atan2Y: number = targetP_y - y;
    let atan2X: number = targetP_x - x;
    if(!(this.target instanceof Player))
    {
      const { offsetLeft, offsetTop } = Canvas.el;
      atan2Y += this.threeHalfWidth - offsetTop;
      atan2X += this.threeHalfWidth - offsetLeft;
    }

    return Math.atan2(atan2Y, atan2X) - DEG90;
  }

  fire(): void
  {
    const { X, Y } = this.owner.getCenterPosition();
    unshiftCannonBallsToBodiesArray(new CannonBall(
      X,
      Y,
      this.angle,
      this.halfWidth,
      this.owner.TEAM,
    ));
  }
}

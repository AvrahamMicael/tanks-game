import { BodyWithAngle } from './abstract/BodyWithAngle.js';
import { BLOCK_LENGTH, CANNON_BALL_SPEED, DEG90 } from '../constants.js';

export class CannonBall extends BodyWithAngle
{
  protected readonly angle: number;
  
  constructor(
    X: number,
    Y: number,
    ANGLE: number,
    readonly RADIUS: number,
    ownerTeam: symbol,
  )
  {
    super(
      ...CannonBall.adjustPositionToCenter(X, Y, RADIUS),
      CANNON_BALL_SPEED,
      'red',
      ownerTeam,
    );
    this.angle = ANGLE + DEG90;
  }

  private static adjustPositionToCenter(X: number, Y: number , RADIUS: number): [number, number]
  {
    const adjustAmount = RADIUS / BLOCK_LENGTH;
    return [
      X - adjustAmount,
      Y - adjustAmount,
    ];
  }
}

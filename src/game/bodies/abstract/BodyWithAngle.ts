import { Body } from './Body.js';

export abstract class BodyWithAngle extends Body
{
  /**
   * @unused
   */
  protected readonly velocityX: number = 0;
  /**
   * @unused
   */
  protected readonly velocityY: number = 0;
  protected readonly shot: boolean = true;
  protected angle: number = 0;

  constructor(
    X: number,
    Y: number,
    SPEED: number,
    COLOR: string,
    TEAM: symbol,
  )
  {
    super(X, Y, SPEED, COLOR, TEAM);
  }

  protected getNextPositions(): [number, number]
  {
    return [
      this.X + this.SPEED * Math.cos(this.angle),
      this.Y + this.SPEED * Math.sin(this.angle),
    ];
  }
}

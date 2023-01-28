import { Canvas } from "../../display/Canvas.js";
import { BLOCK_LENGTH, ENEMY_MAX_RADIUS, SAFE_SPAWNING_RADIUS, SAFE_SPAWNING_RADIUS_DOUBLE } from '../../constants.js';
import { Player } from "../Player.js";
import { Position, PositionBlock, PositionBlockAndRadius } from "../../types.js";
import { Cannon } from "../../weapons/Cannon.js";

export abstract class Body
{
  readonly RADIUS: number = BLOCK_LENGTH / 2;

  protected readonly _cannon?: Cannon;
  protected readonly shot: boolean = false;
  protected velocityX: number = 0;
  protected velocityY: number = 0;
  protected _lost?: boolean;
  
  private readonly RADIUS_DIV_BY_BLOCK_LENGTH: number = this.RADIUS / BLOCK_LENGTH;

  protected abstract getNextPositions(): [ number, number ];

  constructor(
    protected X: number,
    protected Y: number,
    protected readonly SPEED: number,
    readonly COLOR: string,
    readonly TEAM: symbol,
  )
  {  }

  get lost(): boolean | undefined
  {
    return this._lost;
  }

  get cannon(): Readonly<Cannon> | undefined
  {
    return this._cannon;
  }

  get x(): number
  {
    return this.X * BLOCK_LENGTH;
  }

  get y(): number
  {
    return this.Y * BLOCK_LENGTH;
  }

  get xCenter(): number
  {
    return this.x + this.RADIUS;
  }

  get yCenter(): number
  {
    return this.y + this.RADIUS;
  }

  get XCenter(): number
  {
    return this.X + this.RADIUS_DIV_BY_BLOCK_LENGTH;
  }

  get YCenter(): number
  {
    return this.Y + this.RADIUS_DIV_BY_BLOCK_LENGTH;
  }

  static checkCollision(b: PositionBlockAndRadius, _b: PositionBlockAndRadius): boolean
  {
    const double_b_RADIUS: number = _b.RADIUS * 2;
    const doubleB_RADIUS: number = b.RADIUS * 2;
    return ((b.x >= _b.x && b.x <= _b.x + double_b_RADIUS)
      || (_b.x >= b.x && _b.x <= b.x + doubleB_RADIUS))
      && ((b.y >= _b.y && b.y <= _b.y + double_b_RADIUS)
      || (_b.y >= b.y && _b.y <= b.y + doubleB_RADIUS));
  }

  lose(): void
  {
    if(this.lost === undefined) return;
    this._lost = true;
  }

  getPositionB(): Readonly<PositionBlock>
  {
    if(!(this instanceof Body))
      throw new Error(`Class must be subclass of 'Body'`);
    return {
      x: this.x,
      y: this.y,
    };
  }

  getCenterPosition(): Readonly<Position>
  {
    if(!(this instanceof Body))
      throw new Error(`Class must be subclass of 'Body'`);
    return {
      X: this.XCenter,
      Y: this.YCenter,
    };
  }

  getCenterPositionB(): Readonly<PositionBlock>
  {
    if(!(this instanceof Body))
      throw new Error(`Class must be subclass of 'Body'`);
    return {
      x: this.xCenter,
      y: this.yCenter,
    };
  }

  move(destroyFunc?: () => void): void
  {
    if(this.SPEED == 0) return;
    const [ nextX, nextY ] = this.getNextPositions();

    if(this.isPositionInsideTheBoundaries(nextX, true)) this.X = nextX;
    else if(typeof destroyFunc == 'function')
    {
      destroyFunc();
      return;
    }
    else if(nextX < 0) this.X = 0;
    else this.X = Canvas.blockQty(true) - 1;

    if(this.isPositionInsideTheBoundaries(nextY, false)) this.Y = nextY;
    else if(typeof destroyFunc == 'function')
    {
      destroyFunc();
      return;
    }
    else if(nextY < 0) this.Y = 0;
    else this.Y = Canvas.blockQty(false) - 1;
  }

  protected static getInitialPosition(player?: Readonly<Player>): [ number, number ]
  {
    const randomBlock = (maxBlocks: number): number => Math.floor(maxBlocks * Math.random());
    const initialX: number = randomBlock(Canvas.WIDTH_BLOCKS_QTY);
    const initialY: number = randomBlock(Canvas.HEIGHT_BLOCKS_QTY);
    if(player !== undefined)
    {
      const positionAndRadius: Readonly<PositionBlockAndRadius> = {
        x: initialX * BLOCK_LENGTH, y: initialY * BLOCK_LENGTH, RADIUS: ENEMY_MAX_RADIUS
      };
      if(Body.insideSafeArea(player, positionAndRadius))
      {
        return Body.getInitialPosition(player);
      }
    }
    return [ initialX, initialY ];
  }

  protected isPositionInsideTheBoundaries(position: number, horizontally: boolean): boolean
  {
    return position >= 0 && position < (Canvas.blockQty(horizontally) - (this.shot ? 0 : 1));
  }

  protected setVelocityTo0(horizontally: boolean): void
  {
    this.setVelocity(0, horizontally);
  }

  protected changeVelocity(horizontally: boolean, start: boolean): void
  {
    this.setVelocity((start ? -1 : 1) * this.SPEED, horizontally);
  }

  private static insideSafeArea(p: Readonly<Player>, bodyInitialPosition: Readonly<PositionBlockAndRadius>): boolean
  {
    const { x: px, y: py } = p.getCenterPositionB();
    const bodyDoubleRadius: number = bodyInitialPosition.RADIUS * 2;
    return (bodyInitialPosition.x + bodyDoubleRadius >= px - SAFE_SPAWNING_RADIUS
      && bodyInitialPosition.x <= px + SAFE_SPAWNING_RADIUS_DOUBLE)
      && (bodyInitialPosition.y + bodyDoubleRadius >= py - SAFE_SPAWNING_RADIUS
      && bodyInitialPosition.y <= py + SAFE_SPAWNING_RADIUS_DOUBLE);
  }

  private setVelocity(value: number, horizontally: boolean): void
  {
    this[`velocity${ horizontally ? 'X' : 'Y' }`] = value;
  }  
}

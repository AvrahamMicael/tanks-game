import { Body } from './abstract/Body.js';
import { Cannon } from '../weapons/Cannon.js';
import { BLOCK_LENGTH, BODY_TEAM, PLAYER_COLOR, PLAYER_SPEED } from '../constants.js';
import { PositionBlock } from '../types.js';

export class Player extends Body
{
  private readonly targetPosition: PositionBlock = {
    x: 0,
    y: 0,
  };
  
  protected readonly _cannon: Cannon = new Cannon(
    this.RADIUS / 2,
    this.RADIUS + BLOCK_LENGTH,
    this.targetPosition,
    this,
  );
  protected _lost: boolean = false;

  private xStartKeyPressed: boolean = false;
  private xEndKeyPressed: boolean = false;
  private yStartKeyPressed: boolean = false;
  private yEndKeyPressed: boolean = false;

  constructor()
  {
    super(...Body.getInitialPosition(), PLAYER_SPEED, PLAYER_COLOR, BODY_TEAM.PLAYER);
    
    window.onkeydown = this.onKeydownEvent.bind(this);

    window.onkeyup = this.onKeyupEvent.bind(this);

    window.onmousemove = this.updateMousePosition.bind(this);

    setTimeout(() => {
      window.onclick = this.cannon.fire.bind(this.cannon);
    });
  }

  get cannon(): Readonly<Cannon>
  {
    return this._cannon;
  }

  removeEvents(): void
  {
    window.onkeydown = null;
    window.onkeyup = null;
    window.onmousemove = null;
    window.onclick = null;
  }

  protected getNextPositions(): [number, number]
  {
    return [
      this.X + this.velocityX,
      this.Y + this.velocityY,
    ];
  }

  private onKeydownEvent(e: KeyboardEvent): void
  {
    const keyData = this.getPressedKeyData(e);
    if(!keyData) return;
    const { horizontally, start } = keyData;
    this.updateKeyPressed(horizontally, start, true);
    this.changeVelocity(horizontally, start);
  }

  private onKeyupEvent(e: KeyboardEvent): void
  {
    const keyData = this.getPressedKeyData(e);
    if(!keyData) return;
    const { horizontally, start } = keyData;
    this.stop(horizontally, start);
    this.updateKeyPressed(horizontally, start, false);
  }

  private updateMousePosition({ clientX, clientY }: MouseEvent): void
  {
    this.targetPosition.x = clientX;
    this.targetPosition.y = clientY;
  }

  private getPressedKeyData({ key }: KeyboardEvent): { horizontally: boolean, start: boolean } | undefined
  {
    let horizontally: boolean = true;
    let start: boolean = true;
    switch(key)
    {
      case 'w':
        horizontally = false;
        break;
      case 's':
        horizontally = false;
        start = false;
        break;
      case 'a':
        break;
      case 'd':
        start = false;
        break
      default:
        return;
    }
    return { horizontally, start };
  }

  private stop(horizontally: boolean, start: boolean): void
  {
    if(this.isReverseKeyPressed(horizontally, start)) return;
    this.setVelocityTo0(horizontally);
  }

  private isKeyPressed(horizontally: boolean, start: boolean): boolean
  {
    return this[`${ horizontally ? 'x' : 'y' }${ start ? 'Start' : 'End' }KeyPressed`];
  }

  private updateKeyPressed(horizontally: boolean, start: boolean, value: boolean): void
  {
    this[`${ horizontally ? 'x' : 'y' }${ start ? 'Start' : 'End' }KeyPressed`] = value;
  }

  private isReverseKeyPressed(horizontally: boolean, start: boolean): boolean
  {
    return this.isKeyPressed(horizontally, !start);
  }
}

import { BLOCK_LENGTH, DEG360 } from '../constants.js';
import { Body } from "../bodies/abstract/Body.js";
import { getBodiesArray } from "../bodiesArray.js";

export class Canvas
{
  static readonly BACKGROUND_COLOR: string = 'black';
  static readonly WIDTH: number = 600;
  static readonly HEIGHT: number = 600;

  static readonly WIDTH_BLOCKS_QTY: number = Math.round(this.WIDTH / BLOCK_LENGTH);
  static readonly HEIGHT_BLOCKS_QTY: number = Math.round(this.HEIGHT / BLOCK_LENGTH);

  static readonly el: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
  private readonly ctx: CanvasRenderingContext2D = Canvas.el.getContext('2d')!;

  constructor()
  {
    Canvas.el.width = Canvas.WIDTH;
    Canvas.el.height = Canvas.HEIGHT;
    this.clean();
  }

  static blockQty(horizontally: boolean): number
  {
    return Canvas[`${ horizontally ? 'WIDTH' : 'HEIGHT' }_BLOCKS_QTY`];
  }

  paintGame(): void
  {
    this.clean();
    for (const body of getBodiesArray())
    {
      this.paintBody(body);
    }
  }

  private paintBody<T extends Body>(b: T): void
  {
    this.ctx.fillStyle = b.COLOR;
    if(b?.cannon)
    {
      const { cannon: c } = b;
      this.ctx.save()
      this.ctx.translate(b.xCenter, b.yCenter);
      this.ctx.rotate(c.angle);
      this.ctx.beginPath();
      this.ctx.rect(
        -c.halfWidth,
        -c.halfWidth,
        c.width,
        c.height,
      );
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
    }

    this.ctx.beginPath();
    this.ctx.arc(
      b.xCenter,
      b.yCenter,
      b.RADIUS,
      0,
      DEG360,
    );
    this.ctx.closePath();
    this.ctx.fill();
  }

  private clean(): void
  {
    this.ctx.fillStyle = Canvas.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
  }
}

import { Body } from "./bodies/abstract/Body.js"
import { CannonBall } from "./bodies/CannonBall.js"

export type DisplayOptions = 'inline' | 'none';

export type BodyExceptCannonBall<T extends Body = Body> = T extends CannonBall ? never : T;

export type BodyTeam = { PLAYER: symbol, ENEMY: symbol };

export interface PositionBlock
{
  x: number,
  y: number,
}

export interface Position
{
  X: number,
  Y: number,
}

export interface PositionBlockAndRadius extends PositionBlock
{
  RADIUS: number
}

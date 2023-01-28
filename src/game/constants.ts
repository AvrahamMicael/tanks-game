import { BodyTeam } from "./types.js";

export const BLOCK_LENGTH: number = 20;

export const MOVE_RATE: number = 30;

export const DEG360: number = Math.PI * 2;
export const DEG90: number = Math.PI / 2;

export const PLAYER_SPEED: number = .4;
export const ENEMY_SPEED: number = .1;
export const CANNON_BALL_SPEED: number = 1;

export const SAFE_SPAWNING_RADIUS: number = BLOCK_LENGTH * 3;
export const SAFE_SPAWNING_RADIUS_DOUBLE: number = SAFE_SPAWNING_RADIUS * 2;

export const ENEMY_MAX_RADIUS: number = 30;

export const BODY_TEAM: BodyTeam = {
  PLAYER: Symbol(),
  ENEMY: Symbol(),
};

export const ENEMIES_SPAWN_INITIAL_INTERVAL: number = 3000;
export const ENEMIES_SPAWN_MIN_INTERVAL: number = 1000;
export const ENEMIES_SPAWN_SUBTRACT_AMOUNT: number = 100;

export const PLAYER_COLOR: string = 'white';

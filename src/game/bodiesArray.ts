import { Body } from "./bodies/abstract/Body.js";
import { CannonBall } from "./bodies/CannonBall.js";
import { BodyExceptCannonBall } from './types.js';

const bodiesArray: Body[] = [];

export const getBodiesArray = (): ReadonlyArray<Body> => bodiesArray;

export const pushToBodiesArray = <T extends Body>(...b: BodyExceptCannonBall<T>[]): number => bodiesArray.push(...b);

export const unshiftCannonBallsToBodiesArray = (...cb: CannonBall[]): number => bodiesArray.unshift(...cb);

export const removeFromBodiesArray = (...bodies: Body[]): void => {
  for(const b of bodies)
  {
    b.lose();
    bodiesArray.splice(
      bodiesArray.indexOf(b),
      1,
    );
  }
};

export const removeFromBodiesArrayIfCollided = (): void => {
  bodiesArray.forEach((b, _, arr) => {
    for(const _b of arr)
    {
      if(b === _b
      || b.TEAM == _b.TEAM
      )
        continue;
      if(Body.checkCollision(b, _b))
      {
        removeFromBodiesArray(b, _b);
        return;
      }
    }
  });
};

export const removeAllFromBodiesArray = (): void => {
  bodiesArray.splice(0, bodiesArray.length).forEach(b => b.lose());
};

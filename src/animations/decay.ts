import { Animate, IAnimateConfig } from './base';

export interface IDecayConfig extends IAnimateConfig {
  deceleration: number;
  velocity: number;
}

export const calcDelta = (
  velocity: number,
  deltaTime: number,
  deceleration: number,
) => {
  return (
    (velocity / (1 - deceleration)) *
    (1 - Math.exp(-(1 - deceleration) * deltaTime))
  );
};

export class Decay extends Animate<IDecayConfig> {
  protected _getDefaultConfig() {
    return {
      deceleration: 0.998,
      velocity: 0,
      from: 0,
    };
  }

  deceleration(deceleration: number) {
    this.__config.deceleration = deceleration;
    return this;
  }

  velocity(velocity: number) {
    this.__config.velocity = velocity;
    return this;
  }

  calcDelta(velocity = this.__config.velocity) {
    return calcDelta(velocity, this.__deltaTime, this.__config.deceleration);
  }

  protected _animate() {
    const curr = this.__config.from + this.calcDelta();
    this.__finished = Math.abs(curr - this.__curr) < 0.1;
    this.__curr = curr;
  }
}

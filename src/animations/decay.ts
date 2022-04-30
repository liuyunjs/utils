import { Animate, IAnimateConfig } from './base';

export interface IDecayConfig extends IAnimateConfig {
  deceleration: number;
  // 速度应该是按秒算的，毫秒的话要乘1000
  velocity: number;
}

export class Decay extends Animate<IDecayConfig> {
  protected __configDefine() {
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

  protected _animate(subscribe: (curr: number, finished: boolean) => any) {
    const startTime = Date.now();

    if (Math.abs(this.__config.velocity) < 5) {
      subscribe(this.__curr, true);
    } else {
      const step = () => {
        const now = Date.now();
        const kv = Math.pow(this.__config.deceleration, now - startTime);
        const kx =
          (this.__config.deceleration * (1 - kv)) /
          (1 - this.__config.deceleration);
        const v0 = this.__config.velocity / 1000;
        this.__config.velocity = v0 * kv * 1000;
        const distance = v0 * kx;

        const finished = Math.abs(this.__config.velocity) < 5;

        if (!finished) {
          this.__frame.request(step);
        }
        subscribe((this.__curr += distance), finished);
      };

      step();
    }
  }
}

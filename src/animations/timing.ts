import { IAnimateConfig, Animate } from './base';

export interface TimingConfig extends IAnimateConfig {
  to: number;
  easing: (t: number) => number;
  duration: number;
}

export class Timing extends Animate<TimingConfig> {
  protected __configDefine() {
    return {
      from: 0,
      to: 1,
      easing: (t: number) => t,
      duration: 300,
    };
  }

  protected _animate(subscribe: (curr: number, finished: boolean) => any) {
    const startTime = Date.now();
    const distance = this.__config.to - this.__config.from;

    const step = () => {
      const now = Date.now();
      const deltaTime = (now - startTime) / this.__config.duration;
      const finished = deltaTime >= 1;
      if (finished) {
        this.__curr = this.__config.to;
      } else {
        this.__curr =
          this.__config.from + distance * this.__config.easing(deltaTime);
        this.__frame.request(step);
      }
      subscribe(this.__curr, finished);
    };

    step();
  }

  to(to: number) {
    this.__config.to = to;
    return this;
  }

  duration(duration: number) {
    this.__config.duration = duration;
    return this;
  }

  easing(easing: (t: number) => number) {
    this.__config.easing = easing;
    return this;
  }
}

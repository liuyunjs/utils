import { IAnimateConfig, Animate } from './base';

export interface TimingConfig extends IAnimateConfig {
  to: number;
  easing: (t: number) => number;
  duration: number;
}

export class Timing extends Animate<TimingConfig> {
  protected _getDefaultConfig() {
    return {
      from: 0,
      to: 1,
      easing: (t: number) => t,
      duration: 300,
    };
  }

  calcDelta(distance: number = this.__config.to - this.__config.from): number {
    return (
      distance * this.__config.easing(this.__deltaTime / this.__config.duration)
    );
  }

  protected _animate() {
    this.__finished = this.__deltaTime / this.__config.duration >= 1;
    this.__curr = this.__finished
      ? this.__config.to
      : this.__config.from + this.calcDelta();
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

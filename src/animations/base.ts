import { AnimationFrame } from './animation-frame';

export interface IAnimateConfig {
  from: number;
}

export abstract class Animate<Config extends IAnimateConfig = IAnimateConfig> {
  protected __curr = 0;
  protected __frame = new AnimationFrame();

  protected __config!: Config;

  protected __finished: boolean = true;

  constructor(config?: Partial<Config>) {
    this.__config = this._mergeConfig(config);
  }

  protected __configDefine(): Config {
    return {} as Config;
  }

  private _mergeConfig(config?: Partial<Config>): Config {
    return Object.assign({}, this.__configDefine(), config);
  }

  get finished() {
    return this.__finished;
  }

  create(config: Partial<Config>) {
    return new (this.constructor as typeof Object)(this._mergeConfig(config));
  }

  stop() {
    this.__frame.cancel();
    this.__finished = true;
  }

  start(subscribe: (curr: number, finished: boolean) => any) {
    this.stop();
    this.__curr = this.__config.from;
    this._animate((curr: number, finished: boolean) => {
      this.__finished = finished;
      subscribe(curr, finished);
    });

    return this;
  }

  protected abstract _animate(
    subscribe: (curr: number, finished: boolean) => any,
  ): any;

  from(from: number) {
    this.__config.from = from;
    return this;
  }
}

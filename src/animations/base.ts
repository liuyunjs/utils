import { AnimationFrame } from './animation-frame';

export interface IAnimateConfig {
  from: number;
}

export abstract class Animate<Config extends IAnimateConfig = IAnimateConfig> {
  protected __curr = 0;
  protected __frame = new AnimationFrame();

  protected __config!: Config;

  protected __finished: boolean = true;

  protected __deltaTime: number = 0;

  constructor(config?: Partial<Config>) {
    this.__config = this._mergeConfig(config);
  }

  protected _getDefaultConfig(): Config {
    return {} as Config;
  }

  private _mergeConfig(config?: Partial<Config>): Config {
    return Object.assign({}, this._getDefaultConfig(), config);
  }

  get finished() {
    return this.__finished;
  }

  create(config: Partial<Config>) {
    return new (this.constructor as typeof Object)(this._mergeConfig(config));
  }

  calcDelta() {
    return 0;
  }

  stop() {
    this.__frame.cancel();
    this.__finished = true;
  }

  start(subscribe: (curr: number, finished: boolean) => any) {
    this.stop();
    this.__curr = this.__config.from;

    const startTime = Date.now();

    const step = () => {
      const now = Date.now();
      this.__deltaTime = now - startTime;

      this._animate();

      if (!this.__finished) {
        this.__frame.request(step);
      }

      subscribe(this.__curr, this.__finished);
    };

    step();
    return this;
  }

  protected abstract _animate(): any;

  from(from: number) {
    this.__config.from = from;
    return this;
  }
}

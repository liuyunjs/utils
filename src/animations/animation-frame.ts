export class AnimationFrame {
  private _handle?: number | null;

  request(step: FrameRequestCallback) {
    this._handle = requestAnimationFrame(step);
  }

  cancel() {
    if (this._handle != null) {
      cancelAnimationFrame(this._handle);
      this._handle = null;
    }
  }
}

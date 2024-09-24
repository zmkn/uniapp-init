export class Spinner {
  private _spinnerElement?: PlusNativeUIWaitingObj;
  private _mountStatus: boolean = false;
  private _mountTimestamp?: number;
  private _unmountTimestamp?: number;

  private _options: Spinner.Options = {
    overlay: true,
  };

  private create(title: string = "") {
    // #ifdef APP-PLUS
    this.nativeCreate(title);
    // #endif
    // #ifndef APP-PLUS
    this.webCreate(title);
    // #endif
  }

  private webCreate(title: string = "") {
    uni.showLoading({
      mask: this._options.overlay,
      title,
    });
  }

  private nativeCreate(title: string = "") {
    this._spinnerElement = plus.nativeUI.showWaiting(title, {
      modal: this._options.overlay,
      loading: {
        display: "block",
      },
    });
  }

  private remove() {
    // #ifdef APP-PLUS
    this.nativeRemove();
    // #endif
    // #ifndef APP-PLUS
    this.webRemove();
    // #endif
  }

  private webRemove() {
    uni.hideLoading();
  }

  private nativeRemove() {
    if (this._spinnerElement && this._spinnerElement.close) {
      this._spinnerElement.close();
      this._spinnerElement = undefined;
    }
  }

  static instanceAll: Spinner[] = [];

  static options: Spinner.Options = {
    overlay: true,
  };

  static clear = () => {
    // #ifdef APP-PLUS
    const instanceAll = Spinner.instanceAll;
    while (instanceAll.length > 0) {
      instanceAll[0].nativeRemove();
      instanceAll.splice(0, 1);
    }
    // #endif
    // #ifndef APP-PLUS
    uni.hideLoading();
    // #endif
  };

  constructor(options: Spinner.Options = {}) {
    this._options = Object.assign(this._options, Spinner.options, options);
    Spinner.instanceAll.push(this);
  }

  mount(millisecond: number = 0, title: string = "") {
    if (!this._mountStatus) {
      this._mountStatus = true;
      if (this._mountTimestamp) {
        clearTimeout(this._mountTimestamp);
        this._mountTimestamp = undefined;
      }
      if (this._unmountTimestamp) {
        clearTimeout(this._unmountTimestamp);
        this._unmountTimestamp = undefined;
      }
      if (millisecond > 0) {
        this._mountTimestamp = setTimeout(() => {
          if (this._mountStatus) {
            this.create(title);
          }
          clearTimeout(this._mountTimestamp);
          this._mountTimestamp = undefined;
        }, millisecond) as unknown as number;
      } else {
        this.create(title);
      }
    }
  }

  unmount(millisecond: number = 0) {
    if (this._mountStatus) {
      if (this._mountTimestamp) {
        clearTimeout(this._mountTimestamp);
        this._mountTimestamp = undefined;
      }
      if (this._unmountTimestamp) {
        clearTimeout(this._unmountTimestamp);
        this._unmountTimestamp = undefined;
      }
      if (millisecond > 0) {
        this._unmountTimestamp = setTimeout(() => {
          this.remove();
          clearTimeout(this._unmountTimestamp);
          this._unmountTimestamp = undefined;
          this._mountStatus = false;
        }, millisecond) as unknown as number;
      } else {
        this.remove();
        this._mountStatus = false;
      }
    }
  }

  isMount() {
    return this._mountStatus;
  }
}

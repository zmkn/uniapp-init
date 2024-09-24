export class Toast {
  private _queues: { message: string; events: Toast.Events }[] = [];
  private _queueStarted = false;
  private _toastShowed = false;
  private _toastElement?: PlusNativeUIWaitingObj;
  private _toastCreateTimespan?: number;

  private _options: Toast.Options = {
    duration: 2000,
    position: "center",
    overlay: false,
  };

  private webCreate(message: string, events: Toast.Events = {}) {
    uni.showToast({
      mask: this._options.overlay,
      icon: "none",
      title: message,
      duration: this._options.duration,
    });
    events.created && events.created.call(this);
    if (events.removed) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        events.removed!.call(this);
      }, this._options.duration);
    }
  }

  private nativeCreate(message: string, events: Toast.Events = {}) {
    if (!this._toastShowed) {
      this._toastShowed = true;
      this._toastElement = plus.nativeUI.showWaiting(message, {
        modal: this._options.overlay,
        loading: {
          display: "none",
          interval: this._options.duration,
        },
      });
      events.created && events.created.call(this);
      events.removed && (this._toastElement.onclose = events.removed);
      this._toastCreateTimespan = setTimeout(() => {
        clearTimeout(this._toastCreateTimespan);
        this.nativeRemove();
      }, this._options.duration) as unknown as number;
    }
  }

  private webRemove() {
    uni.hideToast();
  }

  private nativeRemove() {
    if (this._toastElement && this._toastElement.close) {
      this._toastElement.close();
      this._toastShowed = false;
    }
  }

  static instanceAll: Toast[] = [];

  static options: Toast.Options = {
    duration: 2000,
    position: "center",
    overlay: true,
  };

  static clear = () => {
    // #ifdef APP-PLUS
    const instanceAll = Toast.instanceAll;
    while (instanceAll.length > 0) {
      instanceAll[0].nativeRemove();
      instanceAll.splice(0, 1);
    }
    // #endif
    // #ifndef APP-PLUS
    uni.hideToast();
    // #endif
  };

  constructor(options: Toast.Options = {}) {
    this._options = Object.assign(this._options, Toast.options, options);
    Toast.instanceAll.push(this);
  }

  addQueue(message: string, events: Toast.Events = {}) {
    this._queues.push({
      events,
      message,
    });
  }

  startQueue() {
    if (!this._queueStarted) {
      if (this._queues.length > 0) {
        this._queueStarted = true;
        const item = this._queues[0];
        const events: Toast.Events = {
          removed: () => {
            item.events.removed && item.events.removed.call(this);
            this._queues.splice(0, 1);
            this.startQueue();
          },
        };
        item.events.created && (events.created = item.events.created);
        this.create(item.message, events);
      } else {
        this._queueStarted = false;
      }
    }
  }

  clearQueue() {
    this._queues = [];
  }

  create(message: string, events: Toast.Events = {}) {
    // #ifdef APP-PLUS
    this.nativeCreate(message, events);
    // #endif
    // #ifndef APP-PLUS
    this.webCreate(message, events);
    // #endif
  }

  remove() {
    // #ifdef APP-PLUS
    this.nativeRemove();
    // #endif
    // #ifndef APP-PLUS
    this.webRemove();
    // #endif
  }
}

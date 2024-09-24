import { MESSAGES } from "./message.mock";

export class Message {
  private _data: Message.Messages = {};

  private extend = <T>(target: any = {}, source: any = {}, ...last: any): T => {
    if ({}.toString.call(source) === "[object Object]") {
      if ({}.toString.call(target) !== "[object Object]") {
        target = {};
      }
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          const sourceType = {}.toString.call(source[key]);
          if (sourceType !== "[object Undefined]") {
            const targetType = {}.toString.call(target[key]);
            if (sourceType === "[object Object]") {
              if (targetType !== "[object Object]") {
                target[key] = {};
              }
              this.extend(target[key], source[key]);
            } else if (sourceType === "[object Array]") {
              if (targetType !== "[object Array]") {
                target[key] = [];
              }
              this.extend(target[key], source[key]);
            } else {
              target[key] = source[key];
            }
          }
        }
      }
    } else if ({}.toString.call(source) === "[object Array]") {
      if ({}.toString.call(target) !== "[object Array]") {
        target = [];
      }
      for (let i = 0, length = source.length; i < length; i++) {
        const sourceType = {}.toString.call(source[i]);
        if (sourceType !== "[object Undefined]") {
          const targetType = {}.toString.call(target[i]);
          if (
            sourceType === "[object Object]" &&
            targetType !== "[object Object]"
          ) {
            target[i] = {};
          } else if (
            sourceType === "[object Array]" &&
            targetType !== "[object Array]"
          ) {
            target[i] = [];
          } else {
            target[i] = source[i];
            continue;
          }
          this.extend(target[i], source[i]);
        }
      }
    }
    if (last.length > 0) {
      return this.extend(target, ...last);
    }
    return target;
  };

  private constructor() {
    this._data = this.extend<Message.Messages>({}, MESSAGES);
  }

  get(key: string): Message.MessageItem | undefined {
    return this._data[key];
  }

  private static _instance?: Message;

  static getInstance(): Message {
    if (!this._instance) {
      this._instance = new Message();
    }
    return this._instance;
  }
}

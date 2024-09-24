export class NativeEvent {
  private constructor() {}

  send(eventName: string, data: AnyObject): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        (uni as any).sendNativeEvent(eventName, data, (result: any) => {
          resolve(result);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  private static _instance?: NativeEvent;

  static getInstance(): NativeEvent {
    if (!this._instance) {
      this._instance = new NativeEvent();
    }
    return this._instance;
  }
}

export class Emitter {
  public subscriptions: Subscription[] = [];

  public subscribe(event: string, callback: (...args: any) => void): this {
    this.subscriptions.push({
      event: event,
      callback: callback,
    });

    return this;
  }

  public emit(event: string, ...args: any): this {
    for (const subscription of this.subscriptions) {
      if (subscription.event === event) {
        subscription.callback(...args);
      }
    }
    return this;
  }

  public unsubscribe(event: string, callback: (...args: any) => void): void {
    const subIndex = this.subscriptions.findIndex((subscription) => {
      return subscription.callback === callback && subscription.event === event;
    });

    if (subIndex !== -1) {
      this.subscriptions.splice(subIndex, 1);
    }
  }
}

interface Subscription {
  event: string;
  callback: (...args: any) => void;
}

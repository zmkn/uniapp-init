declare namespace Message {
  interface MessageItem {
    readonly code: string;
    readonly status: number;
    readonly statusText: string;
  }

  type Messages = { [key: string]: MessageItem };
}

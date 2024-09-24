declare namespace Toast {
  interface Events {
    created?: () => void;
    removed?: () => void;
  }

  interface Options {
    duration?: number;
    position?: "center";
    overlay?: boolean;
  }
}

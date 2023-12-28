export enum Event {
  gameStart,
  player1Moved,
  player2Moved,
  aiMoved,
  gameOver,
}

export interface EventHandler<T> {
  publish: (event: Event, data: T) => void;
  subscribe: (event: Event, callback: (data: T) => void) => void;
  unsubscribe: (event: Event, callback: (data: T) => void) => void;
  subscribeOnce: (event: Event, callback: (data: T) => void) => void;
}

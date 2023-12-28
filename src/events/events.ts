import type { Event, EventHandler } from "./types";

function createEventHandler<T>(): EventHandler<T> {
  const events = {} as Record<Event, Array<(data: T) => void>>;

  const handler = {
    publish: (event: Event, data: T) => {
      if (!events[event]) {
        return;
      } else {
        events[event].forEach((callback) => callback(data));
      }
    },
    subscribe: (event: Event, callback: (data: T) => void) => {
      if (!events[event]) {
        events[event] = [];
      }
      events[event].push(callback);
    },
    unsubscribe: (event: Event, callback: (data: T) => void) => {
      if (!events[event]) return;
      events[event] = events[event].filter((cb) => cb !== callback);
    },
    subscribeOnce: (event: Event, callback: (data: T) => void) => {
      const once = (data: T) => {
        callback(data);
        handler.unsubscribe(event, once);
      };
      handler.subscribe(event, once);
    },
  };
  return handler;
}

export const eventHandler = createEventHandler();

/** TODO: Deprecated, replace with Redux action flows */

// eslint-disable-next-line func-names
const EventManagerFn = function () {
  const events = {};

  this.publish = (name, data) => {
    const handlers = events[name];
    if (!!handlers === false) return;
    handlers.forEach((handler) => {
      handler.call(this, data);
    });
  };

  this.subscribe = (name, handler) => {
    let handlers = events[name];
    if (!!handlers === false) {
      handlers = [];
      events[name] = [];
    }
    handlers.push(handler);
  };

  this.unsubscribe = (name, handler) => {
    const handlers = events[name];
    if (!!handlers === false) return;

    const handlerIdx = handlers.indexOf(handler);
    handlers.splice(handlerIdx);
  };
};
const EventManager = new EventManagerFn();

export default EventManager;

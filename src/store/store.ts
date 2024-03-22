export class Store {
  private subsribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.subsribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }

  subscribe(fn: Function) {
    this.subsribers = [...this.subsribers, fn];
    this.notify();
    return () => {
      this.subsribers = this.subsribers.filter((sub) => sub !== fn);
    };
  }

  dispatch<T>(action: T) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify() {
    this.subsribers.forEach((fn) => fn(this.value));
  }

  private reduce<T>(state: any, action: T) {
    const newState = {};
    for (let prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}

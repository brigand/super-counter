import React from 'react';

const initialData = {
  counters: [],
};

const storageKey = 'data';
let subs = [];
let currentData = null;

const storage = {
  set(data) {
    const json = JSON.stringify(data);
    localStorage.setItem(storageKey, json);

    // parse again to ensure consistency
    currentData = JSON.parse(json);
    subs.forEach(sub => sub(currentData));
  },
  get() {
    if (currentData) {
      return currentData;
    }
    const json = localStorage.getItem(storageKey)
    if (!json) {
      currentData = initialData;
    } else {
      currentData = JSON.parse(json);
    }
    return currentData;
  },
  subscribe(fn) {
    subs.push(fn);
    const unsubscribe = () => {
      subs = subs.filter(x => x !== fn);
    };
    return unsubscribe;
  },
  // high order component for injecting storage
  provider(Component) {
    return class StorageProvider extends React.Component {
      componentDidMount() {
        this.unsubscribe = storage.subscribe(() => {
          this.forceUpdate();
        });
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        return (
          <Component
            {...this.props}
            storageData={storage.get()}
            setStorage={storage.set}
          />
        );
      }
    };
  },
}

export default storage;

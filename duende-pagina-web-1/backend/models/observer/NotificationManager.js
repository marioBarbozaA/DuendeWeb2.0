// // observable.js
// class Observable {
//     constructor() {
//         this.observers = [];
//     }

//     addObserver(observer) {
//         this.observers.push(observer);
//     }

//     removeObserver(observer) {
//         this.observers = this.observers.filter(obs => obs !== observer);
//     }

//     notify(message) {
//         this.observers.forEach(observer => observer.update(message));
//     }
// }

// module.exports = Observable;

class NotificationManager {
    constructor() {
      this.observers = {};
    }
  
    subscribe(eventType, observer) {
      if (!this.observers[eventType]) {
        this.observers[eventType] = [];
      }
      this.observers[eventType].push(observer);
    }
  
    unsubscribe(eventType, observer) {
      if (this.observers[eventType]) {
        this.observers[eventType] = this.observers[eventType].filter(obs => obs !== observer);
      }
    }
  
    notify(eventType, data) {
      if (this.observers[eventType]) {
        this.observers[eventType].forEach(observer => observer.update(data));
      }
    }
  }

  module.exports = NotificationManager;

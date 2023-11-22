// observable.js
class Observable {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(message) {
        this.observers.forEach(observer => observer.update(message));
    }
}

module.exports = Observable;

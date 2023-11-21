// observer.js
class Observer {
    update(message) {
        throw new Error("update method must be implemented by subclasses");
    }
}

module.exports = Observer;

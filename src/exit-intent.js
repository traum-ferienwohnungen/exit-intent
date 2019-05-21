import throttle from 'lodash.throttle';

const defaultOptions = {
    threshold: 20,
    maxDisplays: 1,
    eventThrottle: 200,
    onExitIntent: () => {
    }
};
export default class ExitIntent {

    constructor(options = {}) {
        this.config = {...defaultOptions, ...options};
        this.eventListeners = new Map();
        this.displays = 0;
        this.addEvent('mousemove', throttle(this.mouseDidMove, this.config.eventThrottle));
    }

    addEvent(eventName, callback) {
        document.addEventListener(eventName, callback, false);
        this.eventListeners.set(`document:${eventName}`, {eventName, callback});
    }

    removeEvent(key) {
        const {eventName, callback} = this.eventListeners.get(key);
        document.removeEventListener(eventName, callback);
        this.eventListeners.delete(key);
    }

    shouldDisplay(position) {
        if (position <= this.config.threshold && this.displays < this.config.maxDisplays) {
            this.displays++;
            return true;
        }
        return false;
    }

    mouseDidMove(event) {
        if (this.shouldDisplay(event.clientY)) {
            this.config.onExitIntent();
            if (this.displays >= this.config.maxDisplays) {
                this.removeEvents();
            }
        }
    }

    removeEvents() {
        this.eventListeners.forEach((value, key, map) => this.removeEvent(key))
    }
}

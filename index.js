/**
 * @description subscription: var someVar = NetworkDetection.subscribe(isOnline => { // code } )
 *              unscubscribe: NetworkDetection.unsubscribe(someVar)
 */


function SimpleNetworkDetection(){
    this.online = true;
    this.checking = false;
    this.interval = null;
    this.observers = [];
};

SimpleNetworkDetection.prototype.fire = function () {
    if (this.observers.length) {
        this.observers.forEach(fn => {
            return fn(this.online);
        })
    } else {
        clearInterval(this.interval)
    }
}


SimpleNetworkDetection.prototype.check = function () {
    if (!this.checking) {
        this.online = false;
        this.checking = true;
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(res => {
                this.checking = false;
                this.online = true;
                this.fire();
            })
            .catch(err => {
                this.online = false;
                this.checking = false;
                this.fire();
            })
    }
}

SimpleNetworkDetection.prototype.start = function () {
    if (this.interval) {
        clearInterval(this.interval)
    }
    this.interval = setInterval(() => {
       this.check();
    }, this.seconds.get() * 1000)
}

SimpleNetworkDetection.prototype.unsubscribe = function () {
    this.observers = this.observers.filter(f => f !== fn);
}

SimpleNetworkDetection.prototype.subscribe = function (fn) {
    this.observers.push(fn);
    if (this.observers.length) {
        this.start();
    }
    return fn;
}

SimpleNetworkDetection.prototype.seconds = (function () {
    let seconds = 4;

    function setSeconds(sec) {
        if (typeof sec !== 'number') {
            throw new Error('Seconds must be number')
        }
        seconds = sec;
    }

    function getSeconds() {
        return seconds;
    }

    return {
        set: setSeconds,
        get: getSeconds
    }
})();

const NetworkDetection = new SimpleNetworkDetection();
NetworkDetection.subscribe(bool => console.log(bool))

module.exports.NetworkDetection = NetworkDetection;

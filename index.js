/**
 * @description subscription: var someVar = NetworkDetection.subscribe(isOnline => { // code } )
 *              unscubscribe: NetworkDetection.unsubscribe(someVar)
 */


const SimpleNetworkDetection = {
    online: true,
    checking: false,
    interval: null,
    observers: [],
    subscribe: function (fn) {
        if (!this.observers.length) {
            this.start();
        }
        this.observers.push(fn);
        return fn;
    },
    unsubscribe: function (fn) {
        this.observers = this.observers.filter(f => f !== fn);
    },
    seconds: function() {
        let seconds = 4;

        function setSeconds(seconds){
            if(typeof seconds !== 'number'){
                throw new Error('Seconds must be number')
            }
        }

        function getSeconds(){
            return seconds;
        }

        return {
            set: setSeconds,
            get: getSeconds
        }

    }(),

    fire: function () {
        if (this.observers.length) {
            this.observers.forEach(fn => {
                return fn(this.online);
            })
        } else {
            clearInterval(this.interval)
        }

    },
    check: function () {
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
    },
    start: function () {
        if (this.interval) {
            clearInterval(this.interval)
        }
        this.interval = setInterval(() => {
            this.check();
        }, this.seconds.get())
    }
}

SimpleNetworkDetection.seconds.set(4)
SimpleNetworkDetection.start();

module.exports.NetworkDetection = SimpleNetworkDetection;

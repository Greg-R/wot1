/*jshint esversion: 6 */

var validator = {
    get: function (target, key) {
        if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], validator);
        } else {
            return target[key];
        }
    },
    set: function (target, key, value) {
        console.log(target);
        console.log(key);
        console.log(value);
        target[key] = value;
        return true;
    }
};

var person = {
    firstName: "alfred",
    lastName: "john",
    inner: {
        salary: 8250,
        Proffesion: ".NET Developer"
    }
};

var proxy = new Proxy(person, validator);
proxy.inner.salary = 'foo';

console.log(`The value of salary is now ${proxy.inner.salary}.`);

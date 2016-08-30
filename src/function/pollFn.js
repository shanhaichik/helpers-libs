module.exports = function pollFn(fn, callback, errback, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    (function p() {
        if(fn()) {
            callback();
        }
        // Условие не выполнилось, но время ещё не вышло (тик интервала)
        else if (Number(new Date()) < endTime) {
            setTimeout(p, interval);
        }
        // Условие не выполнилось, а отведённое время вышло
        else {
            errback(new Error('timed out for ' + fn + ': ' + arguments));
        }
    })();
}
'use strict'

function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++) {
            zero += '0';
        }
    }
    return zero + n;
}

module.exports = {
    getTime: () => {
        var d = new Date();
        var s =
            leadingZeros(d.getFullYear(), 4).toString() +
            leadingZeros(d.getMonth() + 1, 2).toString() +
            leadingZeros(d.getDate(), 2).toString() +
            leadingZeros(d.getHours(), 2).toString();

        return s;
    }
}
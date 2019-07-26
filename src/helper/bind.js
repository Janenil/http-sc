export default function(fn, thisArg) {
    return function wrap(...params) {
        return fn.apply(thisArg, params);
    };
}
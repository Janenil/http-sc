import bind from './bind';

export function isArray(val) {
    return toString.call(val) === '[object Array]';
}

// function copy(target) {
//     if (target instanceof File) {
//         return target;
//     }
//     if (!target || typeof target !== 'object') {
//         return target;
//     }
//     if (isArray(target)) {
//         let arr = [];
//         for (let i = 0; i < target.length; i += 1) {
//             arr[i] = copy(target[i]);
//         }
//         return arr;
//     }
//     let obj = {};
//     Object.keys(target).forEach((key) => {
//         obj[key] = copy(target[key]);
//     });
//     return obj;
// }
    export function merge(/* obj1, obj2, obj3, ... */) {
        var result = {};
        function assignValue(val, key) {
        if (typeof result[key] === 'object' && typeof val === 'object') {
            result[key] = merge(result[key], val);
        } else {
            result[key] = val;
        }
        }
    
        for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
        }
        return result;
   }
   
  
    export function deepMerge(/* obj1, obj2, obj3, ... */) {
        var result = {};
        function assignValue(val, key) {
            if (typeof result[key] === 'object' && typeof val === 'object') {
                result[key] = deepMerge(result[key], val);
            } else if (typeof val === 'object') {
                result[key] = deepMerge({}, val);
            } else {
                result[key] = val;
            }
        }

        for (var i = 0, l = arguments.length; i < l; i++) {
            forEach(arguments[i], assignValue);
        }
        return result;
    }


/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */

function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
        return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
    }

    if (Array.isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i += 1) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}

export function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg);
        } else {
            a[key] = val;
        }
    });
    return a;
}



export default function randomString() {
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < 3; i += 1) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
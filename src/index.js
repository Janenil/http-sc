
import Instance from './instance';
import bind from './helper/bind';
import { extend } from './helper/utils';


export default class requsetInstance {
    constructor(defaultConfig) {
        this.createInstance = function(defaultConfig = {}) {
            var context = new Instance(defaultConfig);
            // request方法，作用域指向context
            var instance = bind(Instance.prototype.request, context);
            extend(instance, Instance.prototype, context);
            return instance;
        }
        return this.createInstance(defaultConfig);
    }
    create = function(params) {
        return createInstance(params);
    }
}

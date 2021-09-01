"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function classDecorator(target) {
    console.log('Class Decorator');
}
function methodDecorator(target, name, descriptor) {
    console.log('method Decorator');
    console.log("target,被裝飾類別的建構子=>", target);
    console.log("name,被裝飾名稱", name);
    console.log("descriptor,儲存的屬性", descriptor);
}
function propertyDecorator() {
    return function (target, propertyKey) {
        console.log('propertyKey', propertyKey);
        console.log('Inside Property Decorator Function');
        var value;
        Object.defineProperty(target, propertyKey, {
            get: function () {
                console.log("Inside get accessor", value);
                return value;
            },
            set: function (v) {
                console.log("Inside set accessor");
                value = v;
            }
        });
    };
}
function logParameter(target, key, index) {
    var metadataKey = "__log_" + key + "_parameters";
    console.log("logParameter=>", metadataKey);
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
    }
    else {
        target[metadataKey] = [index];
    }
    console.log("target=>", target[metadataKey]);
}
var baseA = /** @class */ (function () {
    function baseA() {
        this.name = "oldName";
        this.age = 0;
    }
    baseA.prototype.methodA = function () {
        console.log("call methodA()");
    };
    baseA.prototype.showAgeWithAdd = function (input) {
        console.log("input=>", input);
    };
    __decorate([
        propertyDecorator()
    ], baseA.prototype, "name", void 0);
    __decorate([
        methodDecorator
    ], baseA.prototype, "methodA", null);
    __decorate([
        __param(0, logParameter)
    ], baseA.prototype, "showAgeWithAdd", null);
    baseA = __decorate([
        classDecorator
    ], baseA);
    return baseA;
}());
var baseCA = new baseA();
baseCA.methodA();
baseCA.name = "newName"; // 這邊會呼叫Inside set accessor
console.log(baseCA.name); // 這邊會呼叫Inside get accessor
console.log(baseCA);
baseCA.showAgeWithAdd(10);

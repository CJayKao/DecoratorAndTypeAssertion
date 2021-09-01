function classDecorator(target: any) {
    console.log('Class Decorator');
}
function methodDecorator(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('method Decorator');
    console.log("target,被裝飾類別的建構子=>", target)
    console.log("name,被裝飾名稱", name)
    console.log("descriptor,儲存的屬性", descriptor)
}
function propertyDecorator() {
    return function (target: Object, propertyKey: string) {
        console.log('propertyKey', propertyKey);

        console.log('Inside Property Decorator Function');
        let value: string;
        Object.defineProperty(target, propertyKey, {
            get: () => {
                console.log("Inside get accessor", value);
                return value;
            },
            set: (v: string) => {
                console.log("Inside set accessor");
                value = v;
            }
        });
    }
}

function logParameter(target: any, key: string, index: number) {
    var metadataKey = `__log_${key}_parameters`;
    console.log("logParameter=>",metadataKey)
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
    }
    else {
        target[metadataKey] = [index];
    }
    console.log("target=>",target[metadataKey])

}

@classDecorator
class baseA {
    @propertyDecorator()
    name: string  // property 受到propertyDecorator注入
    age: number;
    constructor() {
        this.name = "oldName"
        this.age = 0
    }
    @methodDecorator
    public methodA() {
        console.log("call methodA()")
    }
    public showAgeWithAdd(@logParameter input: any) {
        console.log("input=>", input)
    }
}
const baseCA = new baseA()
baseCA.methodA()
baseCA.name = "newName"; // 這邊會呼叫Inside set accessor
console.log(baseCA.name) // 這邊會呼叫Inside get accessor
console.log(baseCA)
baseCA.showAgeWithAdd(10)
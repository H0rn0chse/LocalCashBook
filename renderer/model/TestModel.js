import { Model2 } from "../../core/model/Model2.js";

class _TestModel extends Model2 {
    getProperty (sPath) {

    }
}

export const TestModel = new _TestModel({
    someValue: "someModelValue"
});
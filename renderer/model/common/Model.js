import { deepClone, objectGet, objectSet } from "../../common/Utils.js";
import { EventManager } from "../../common/EventManager.js";

export class Model extends EventManager {
    constructor (oData) {
        super();
        this.name = "";
        this._data = oData;
    }

    push (aPath, vValue, bSuppressUpdate) {
        const aValue = this.get(aPath);
        if (Array.isArray(aValue)) {
            this.set([...aPath, aValue.length], vValue, bSuppressUpdate);
        }
    }

    _evaluatePath (aPath) {
        return aPath.reduce((acc, vCurrentItem) => {
            if (typeof vCurrentItem === "string" || typeof vCurrentItem === "number") {
                acc.push(vCurrentItem);
            } else if (typeof vCurrentItem === "object") {
                const sIdentifier = Object.keys(vCurrentItem)[0];
                const sLookUpValue = vCurrentItem[sIdentifier];
                const vValue = this.get(acc);
                if (Array.isArray(vValue)) {
                    const iIndex = vValue.findIndex(vItem => {
                        return vItem[sIdentifier] === sLookUpValue;
                    });
                    if (iIndex > -1) {
                        acc.push(iIndex);
                    }
                }
            }
            return acc;
        }, []);
    }

    get (aPath, aBindingContextPath = []) {
        if (Array.isArray(aPath)) {
            const aContextPath = deepClone(aBindingContextPath);
            aContextPath.push(...deepClone(aPath));

            return objectGet(this._data, this._evaluatePath(aContextPath));
        }
    }

    onUpdate (oEvent) {
        this.handleEvent("update", oEvent);
    }

    set (aPath, vValue, bSuppressUpdate = false) {
        const aFinalPath = this._evaluatePath(aPath);
        objectSet(this._data, aFinalPath, vValue);
        if (!bSuppressUpdate) {
            this.onUpdate({});
        }
        return aFinalPath;
    }

    mergeObjectIntoData (oData, aPath = []) {
        Object.keys(oData).forEach(sKey => {
            const aCurrentPath = aPath.concat([sKey]);
            this.set(aCurrentPath, oData[sKey], true);
        });
        this.update();
    }

    update () {
        this.onUpdate({});
    }

    addEntry (aPath, vEntry, bSuppressUpdate) {
        const aList = this.get(aPath);
        this.set(aPath.concat(aList.length), vEntry, bSuppressUpdate);
    }

    getName () {
        return this.name;
    }
};

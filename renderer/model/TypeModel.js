import { EventBus } from "../EventBus.js";
import { DatabaseModel } from "./common/DatabaseModel.js";
import { SettingsModel } from "./SettingsModel.js";

class _TypeModel extends DatabaseModel {
    constructor (oData) {
        super(oData, "types");
        this.name = "TypeModel";
    }

    addEntry () {
        const oEntry = {
            DisplayName: ""
        };
        EventBus.sendToDatabase("types-create", oEntry);

        this.push(["types"], oEntry);
    }

    updateEntry (sId, sDisplayName) {
        const oEntry = {
            ID: sId,
            DisplayName: sDisplayName
        };
        EventBus.sendToDatabase("types-update", oEntry);

        const aPath = ["types", { ID: sId }];
        this.set(aPath, oEntry);
    }

    setDefault (iId) {
        SettingsModel.setDefault("Type", iId);
    }

    processCreate (oEvent, oData) {
        const aPath = ["types", { ID: undefined }, "ID"];
        this.set(aPath, oData.lastInsertRowid);
    }

    processRead (...args) {
        super.processRead(...args);
        console.log("TypeModel loaded");
    }

    processUpdate () {
        console.log("TypeModel updated");
    }
}

export const TypeModel = new _TypeModel({
    types: []
});

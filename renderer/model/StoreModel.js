import { EventBus } from "../EventBus.js";
import { DatabaseModel } from "./common/DatabaseModel.js";
import { SettingsModel } from "./SettingsModel.js";

class _StoreModel extends DatabaseModel {
    constructor (oData) {
        super(oData, "stores");
        this.name = "StoreModel";
    }

    addEntry () {
        const oEntry = {
            DisplayName: ""
        };
        EventBus.sendToDatabase("stores-create", oEntry);

        this.push(["stores"], oEntry);
    }

    updateEntry (sId, sDisplayName) {
        const oEntry = {
            ID: sId,
            DisplayName: sDisplayName
        };
        EventBus.sendToDatabase("stores-update", oEntry);

        const aPath = ["stores", { ID: sId }];
        this.set(aPath, oEntry);
    }

    setDefault (iId) {
        SettingsModel.setDefault("Store", iId);
    }

    processCreate (oEvent, oData) {
        const aPath = ["stores", { ID: undefined }, "ID"];
        this.set(aPath, oData.lastInsertRowid);
    }

    processRead (...args) {
        super.processRead(...args);
        console.log("StoreModel loaded");
    }

    processUpdate () {
        console.log("StoreModel updated");
    }
}

export const StoreModel = new _StoreModel({
    stores: []
});
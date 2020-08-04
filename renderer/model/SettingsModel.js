/* eslint-disable quote-props */
import { LanguageModel } from "./LanguageModel.js";
import { EventBus } from "../EventBus.js";
import { DatabaseModel } from "./common/DatabaseModel.js";

class _SettingsModel extends DatabaseModel {
    constructor (oData) {
        super(oData, "settings");
        this.name = "SettingsModel";

        this.updateLanguageModel = true;
    }

    get (aPath, aBindingContextPath = []) {
        if (aPath.length === 1 && aPath[0] === "checked-id") {
            return this.getCheckedId();
        }
        return super.get(aPath, aBindingContextPath);
    }

    getCheckedId () {
        const oCurrentList = {
            id: this.get(["current-list"])
        };
        return this.get(["lists", oCurrentList, "default"]);
    }

    updateList (sList) {
        this.set(["current-list"], sList);
    }

    setDefault (sList, sId) {
        const aPath = ["lists", { "id": sList }, "default"];
        this.set(aPath, sId);
    }

    processRead (oEvent, oData) {
        this.mergeObjectIntoData(oData);

        if (this.updateLanguageModel) {
            this.updateLanguageModel = false;
            LanguageModel.update();
        }
        console.log("SettingsModel loaded");
    }

    processUpdate (oEvent) {
        this.update();

        if (this.updateLanguageModel) {
            this.updateLanguageModel = false;
            LanguageModel.update();
        }
        console.log("SettingsModel updated");
    }

    setLanguage (sLanguage) {
        this.updateLanguageModel = true;

        EventBus.sendToDatabase("settings-update", this.get([]));

        const aPath = ["Language"];
        this.set(aPath, sLanguage, true);
    }

    setDefaultDatabase () {
        EventBus.sendToDatabase("settings-update", this.get([]));
        const sPath = this.get(["CurrentDir"]);
        this.set(["DefaultDir"], sPath);
    }
}

export const SettingsModel = new _SettingsModel({
    "database-section-i18n": ["settings.databaseSettings"],
    "current-database-i18n": ["settings.currentDatabase"],
    "database-create-i18n": ["settings.createDatabase"],
    "database-open-i18n": ["settings.openDatabase"],
    "database-open-user-i18n": ["settings.openUserDatabase"],
    "database-default-i18n": ["settings.setDefaultDatabase"],
    "default-section-i18n": ["settings.defaultValues"],
    "language-i18n": ["common.language"],
    "list-section-i18n": ["settings.lists"],
    "default-i18n": ["common.default"],
    "lists": [{
        "id": "persons",
        "i18n": ["common.persons"],
        "default": 1
    }, {
        "id": "accounts",
        "i18n": ["common.accounts"],
        "default": 2
    }, {
        "id": "types",
        "i18n": ["common.types"],
        "default": 3
    }, {
        "id": "stores",
        "i18n": ["common.stores"],
        "default": 1
    }],
    "current-list": "persons"
});

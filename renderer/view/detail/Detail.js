import { load } from "../../common/load.js";
import { DomElement } from "../common/DomElement.js";
import { ReceiptDetail } from "./ReceiptDetail.js";
import { MultiView } from "../common/MultiView.js";
import { Scanner } from "./Scanner.js";
import { LineDetail } from "./LineDetail.js";
import { FlexContainer } from "../common/FlexContainer.js";

load.css("/renderer/view/Detail/Detail.css");

export class Detail extends MultiView {
    constructor () {
        super();
        this.addEvents([
            "new",
            "delete"
        ]);
        this.addView("receiptDetail", new ReceiptDetail()
            .addGenericListener(this));

        this.addView("lineDetail", new LineDetail()
            .addGenericListener(this));

        this.addView("scanner", new Scanner()
            .addGenericListener(this));
    }

    render () {
        // base DOM element
        const oNode = new DomElement("section")
            .addClass("detail")
            .appendNode(new FlexContainer("div", { flexDirection: "row" })
                .addClass("user-actions")
                .appendNode(new DomElement("div")
                    .addClass("button")
                    .setText(this.getTranslation("new-i18n"))
                    .addEventListener("click", this.onNew, this)
                )
                .appendNode(new DomElement("div")
                    .addClass("button")
                    .setText(this.getTranslation("delete-i18n"))
                    .addEventListener("click", this.onDelete, this)
                )
            )
            .appendNode(new FlexContainer("div", { flexDirection: "row" })
                .appendNode(new DomElement("div", { flexBasis: "100%" })
                    .setChildView(this.getView("receiptDetail"))
                )
                .appendNode(new DomElement("div", { flexBasis: "100%" })
                    .setChildView(this.getView("lineDetail"))
                )
                .appendNode(new DomElement("div", { flexBasis: "100%" })
                    .setChildView(this.getView("scanner"))
                )
            )
            .getNode();

        return oNode;
    }

    onNew (oEvent) {
        this.handleEvent("new", oEvent);
    }

    onDelete (oEvent) {
        oEvent.customData = {
            id: this.getProperty("id")
        };
        this.handleEvent("delete", oEvent);
    }
};

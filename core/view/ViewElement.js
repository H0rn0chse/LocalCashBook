export class ViewElement {
    constructor () {
        this.parentView = null;
    }

    init () {
        // To be implemented by the Element
    }

    setView (oView) {
        this.parentView = oView;
    }

    getModel (sModel) {
        this.parentView.getModel(sModel);
    }

    getHandler (sKey) {
        this.parentView.getHandler(sKey);
    }
}
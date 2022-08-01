sap.ui.define([
    'esb/ei/sm/controller/BaseController',
    ], function (BaseController) {
    'use strict';
    return BaseController.extend("esb.ei.sm.controller.View3", {
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            // Register the event handler for route match handler
            this.oRouter.getRoute("Suppdetail").attachMatched(this.evtSuppl,this);
        },
        evtSuppl: function(oEvent){
            var params = oEvent.getParameter("arguments");   
            var sPath =    "/" +   params.sid;
            this.getView().bindElement(sPath);
        },
    });
});
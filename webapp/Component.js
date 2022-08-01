sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("esb.ei.sm.Component",{
      metadata: {
        manifest: "json"
      },
      init:function(){
        // we call parent class contructor, bacause parent will gift functionality to us er.c, Router object 
            sap.ui.core.UIComponent.prototype.init.apply(this);
        //get the rounter object
        var oRouter = this.getRouter();
        // initialise the router
        oRouter.initialize();  
      },
      // createContent:function(){
      //   // Step 1: Create the object of our Root view and return it out of the Component.js.  
      //     var oView = new sap.ui.view({
      //         viewName: "esb.ei.sm.view.App",
      //         id: "idApp",
      //         type: "XML"
      //       });     
      //   // Step 2 : create whatever additional  views needed in  our app    
      //         var oView1 = new sap.ui.view({
      //           viewName: "esb.ei.sm.view.View1",
      //           id: "idView1",
      //           type: "XML"
      //       });     
      //           var oView2 = new sap.ui.view({
      //             viewName: "esb.ei.sm.view.View2",
      //             id: "idView2",
      //             type: "XML"
      //        });     
      //        // Step 3: Get the object of app container from the App view and place all our views inside of that containmer control of App.
      //         var oAppcon = oView.byId("appCon");
      //         // oAppcon.addPage(oView1).addPage(oView2);
      //         oAppcon.addMasterPage(oView1).addDetailPage(oView2);

      //     return oView;
      // },
      destroy: function(){


      }
    });
    
});
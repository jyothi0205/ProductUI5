sap.ui.define([
    'esb/ei/sm/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/m/MessageBox'
], function(BaseController,Filter,FilterOperator,MessageBox) {
    'use strict';
    return BaseController.extend("esb.ei.sm.controller.View1",{
    onInit: function(){
      this.oRouter = this.getOwnerComponent().getRouter();
    },
    onNext: function(sPath){
    // // Step 1 get current view object 
    // var oView = this.getView();
    // //Step 2 Get parent object
    //     var oAppCon =  oView.getParent();
    // //Step 3 let the parent navigate
    //     oAppCon.to("idView2");
        this.oRouter.navTo("detail",{
          pid: sPath.replace("/","")
        });
  },
  onSearch: function(oEvent){
    //Step1 what user tried to search in the filed
     var sValue =  oEvent.getParameter("query");
     if (sValue === undefined){
        var sValue =  oEvent.getParameter("newValue");
     }
    //Step2 Create a filter object( condition - 2 operands and 1 operator)
     var oFilter1 = new Filter("CATEGORY", FilterOperator.Contains,sValue );
     var oFilter2 = new Filter("type", FilterOperator.Contains,sValue );
     var oFilter = new Filter({
        filters: [oFilter1,oFilter2],
        and    : false
     });
    //Step3 Get the items binding for the list control   
     var oBindingsItems = this.getView().byId("IdList").getBinding("items");
    // //Step4, inject the filter
     oBindingsItems.filter([oFilter1]);
  },

  onItemDelete: function(oEvent){
    // Step 1 Which item is deleted by user
    var oListItemtobedeleted =  oEvent.getParameter("listItem");
    //Step 2 get the  object path of the list control 
    var oList = oEvent.getSource();
    //Step 3 Ask th elist to delete the item
    oList.removeItem(oListItemtobedeleted);
  },
  onselectionChange: function(oEvent){
    // Which item was selected by the user ?
    var oSelectedItem = oEvent.getParameter("listItem");
    //Get the path of the element associated to that item 
    var sPath =  oSelectedItem.getBindingContextPath();
    // // var oView2 = this.getView().getParent().getPages()[1];
    // // in the case of  split view control get parent twice
    // var oView2 = this.getView().getParent().getParent().getDetailPages()[0];
    // oView2.bindElement(sPath,{
    //   expand: 'Product_Nav_Supplier'
    // });
    this.onNext(sPath);
  },
  onAdd: function(){
    this.oRouter.navTo("addProduct");
  }
 
 });
});



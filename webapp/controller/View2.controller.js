sap.ui.define([
    'esb/ei/sm/controller/BaseController',
    'esb/ei/sm/util/formatter',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
], function (BaseController, Formatter, Fragment,Filter,FilterOperator,MessageBox,MessageToast) {
    'use strict';
    return BaseController.extend("esb.ei.sm.controller.View2", {
        formatter: Formatter,
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            // Register the event handler for route match handler
            this.oRouter.getRoute("detail").attachMatched(this.evtlistener,this);
        },
        evtlistener: function(oEvent){
            var params = oEvent.getParameter("arguments");   
            var sPath =    "/" +   params.pid;
            this.getView().bindElement(sPath, {
                expand: "Product_Nav_Supplier"
            });
        },
        onBack: function () {
            // // Step 1 get current view object 
            // var oView = this.getView();
            // //Step 2 Get parent object
            //     var oAppCon =  oView.getParent();
            // //Step 3 let the parent navigate
            //     oAppCon.to("idView1");
            this.getView().getParent().to("idView1");
        },
        cityPopup: null,
        oCityField: null,
        oSupplierField: null,
        oFilter: [],
        onConfirm: function (oEvent) {
            var oWhichObjectSelected = oEvent.getParameter("selectedItem");
            var sLabel = oWhichObjectSelected.getLabel();
            if (oEvent.getSource().getId().indexOf("city") != -1) {
                this.oCityField.setValue(sLabel);
            } else {
                var aWhichSuppliersSelected = oEvent.getParameter("selectedItems");
                for (const Supplier of aWhichSuppliersSelected) {
                    var sLabel_value = Supplier.getLabel();
                    var oFilter1 = new Filter("COMPANY_NAME", FilterOperator.Contains,sLabel_value );
                    this.oFilter.push(oFilter1);
                }
              };
          this.getView().byId("idSuppliers").getBinding("items").filter([this.oFilter]);
        },
        onF4Help: function (oEvent) {
            // alert("this functinality is under construction ");
            var that = this;
            this.oCityField = oEvent.getSource();
            if (!this.cityPopup) {
                Fragment.load({
                    id: 'city',
                    name: 'esb.ei.sm.fragments.popup',
                    controller: this
                }).then(function (oFragment) {
                    that.cityPopup = oFragment;
                    that.cityPopup.setTitle("Cities");
                    that.getView().addDependent(that.cityPopup);
                    that.cityPopup.setMultiSelect(false);
                    that.cityPopup.bindAggregation("items", {
                        path: 'local>/cities', 
                        template: new sap.m.DisplayListItem({
                            label: '{local>name}',
                            value: '{loval>famousfor}'
                        })
                    });
                    that.cityPopup.open();
                });
            } else {
                this.cityPopup.open();
            }
        },
        supplierPopup: null,
        onFilter: function (oEvent) {
            // var sValue =  oEvent.getParameter("query");
            //alert("this functinality is under construction ");
            var that = this;
            this.oSupplierField = oEvent.getSource();
            if (!this.supplierPopup) {
                Fragment.load({
                    id: 'supplier',
                    name: 'esb.ei.sm.fragments.popup',
                    controller: this
                }).then(function (oFragment) {
                    that.supplierPopup = oFragment;
                    that.supplierPopup.setTitle("Suppliers");
                    that.getView().addDependent(that.supplierPopup);
                    that.supplierPopup.bindAggregation("items", {
                        path: '/SupplierSet',
                        template: new sap.m.DisplayListItem({
                            label: '{COMPANY_NAME}',
                            value: '{CITY}'
                        })
                    });
                    that.supplierPopup.open();
                });
            } else {
                this.supplierPopup.open();
            }
        },
        onMsgConfirm: function(status){
            if(status === "OK"){

                var msgCompleted = this.getView().getModel("i18n").getResourceBundle().getText("msgComplete",["20925"]);
                MessageToast.show(msgCompleted);

            }else{
                MessageBox.warning("You have cancelled it");
            }

        },
        onApprove:function(onEvent){
            var msgConfrim = this.getView().getModel("i18n").getResourceBundle().getText("msgConfirm");
            MessageBox.confirm(msgConfrim, {
                // We want event handler to access the controller object
                onClose: this.onMsgConfirm.bind(this)

            });
        },
        onReject:function(){
            MessageBox.error("The Order is rejected");
        },
        onsuppChange: function(oEvent){
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
          onNext: function(sPath){
            // // Step 1 get current view object 
            // var oView = this.getView();
            // //Step 2 Get parent object
            //     var oAppCon =  oView.getParent();
            // //Step 3 let the parent navigate
            //     oAppCon.to("idView2");
                this.oRouter.navTo("Suppdetail",{
                  sid: sPath.replace("/","")
                });
          },
    });
});
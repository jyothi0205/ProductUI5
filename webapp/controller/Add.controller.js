sap.ui.define([
    'esb/ei/sm/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    'sap/m/MessageBox'
], function(BaseController,JSONModel,MessageToast,MessageBox) {
    'use strict';
    return BaseController.extend("esb.ei.sm.controller.Add",{
        onInit: function(){
            var oModel = new  JSONModel();
            oModel.setData({
                "prodData" : 
                    {
                        "PRODUCT_ID" : "",
                        "TYPE_CODE" : "PR",
                        "CATEGORY" : "",
                        "NAME" : "New Laptop",
                        "DESCRIPTION" : "",
                        "SUPPLIER_ID" : "0100000054",
                        "SUPPLIER_NAME" : "AVANTEL",
                        "PRICE" : "0.00",
                        "CURRENCY_CODE" : "USD",
                        "TAX_TARIF_CODE": "1 ",
                        "MEASURE_UNIT": "EA",
                        "DIM_UNIT": "CM"
                    
                       }
                });
                this.getView().setModel(oModel,"prod");
            },
          onSaveProduct: function(){
            // Prepare payload which we want to send to back-end
            var payload = this.getView().getModel("prod").getProperty("/prodData");
            // Get the OData model object
           var  oDataModel = this.getView().getModel();        
            // Trigger POST call from the OData Model to /ProductSet Entityset and send data
            // Handle call back for Sucess and Error
            oDataModel.create("/ProductSet", payload, {

                success: function(data){
                    MessageToast.show("Sucess of Post Message");

                },
                error: function(oErr){
                    MessageBox.error( JSON.parse(oErr.responseText).error.innererror.errordetails[0].message );
                }
            });

           },
           onClearScreen: function(){
            this.getView().getModel("prod").setData({
                "prodData" : {
                            "PRODUCT_ID" : "",
                            "TYPE_CODE" : "PR",
                            "CATEGORY" : "",
                            "NAME" : "New Laptop",
                            "DESCRIPTION" : "",
                            "SUPPLIER_ID" : "0100000054",
                            "SUPPLIER_NAME" : "AVANTEL",
                            "PRICE" : "0.00",
                            "CURRENCY_CODE" : "USD",
                            "TAX_TARIF_CODE": "1 ",
                            "MEASURE_UNIT": "EA",
                            "DIM_UNIT": "CM"
                }
            });

           },
           onEnter: function(oEvent){
            // Get product id entered  by user on the screen"
            var val = oEvent.getParameter("value");
            // Get the local Model object 
            var  oModel = this.getView().getModel("prod");   
            // get the OData Model Object
            var  oDataModel = this.getView().getModel();   
            // Prepare the path to read single product data 
            var sPath = "/ProductSet('"+ val +"')";
            // Fire the OData get call 
            oDataModel.read(sPath, {
                             success: function(data){
                                oModel.setProperty("/prodData",data);
                             },

                            });            
            // Set the data to the local model 

           }

    });
});
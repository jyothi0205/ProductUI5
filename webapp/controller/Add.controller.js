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
                "enable" : true,
                "prodData" : 
                    {
                        "PRODUCT_ID" : "",
                        "TYPE_CODE" : "PR",
                        "CATEGORY" : "Notebooks",
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
                this.getOwnerComponent().getRouter().getRoute("addProduct").attachMatched(this.addNewProduct,this);
            },
            addNewProduct:function(){
                this.changeMode("Create");
            },
          onSaveProduct: function(){
            // Prepare payload which we want to send to back-end
            var payload = this.getView().getModel("prod").getProperty("/prodData");
            // Get the OData model object
           var  oDataModel = this.getView().getModel();        
            // Trigger POST call from the OData Model to /ProductSet Entityset and send data
            // Handle call back for Sucess and Error
            if(this.mode === "Create"){
                oDataModel.create("/ProductSet", payload, {

                    success: function(data){
                        MessageToast.show("Sucess of create.. Message");
                    },
                    error: function(oErr){
                        MessageBox.error( JSON.parse(oErr.responseText).error.innererror.errordetails[0].message );
                    }
                });
            }else{

                oDataModel.update(this.sPath, payload, {

                    success: function(data){
                        MessageToast.show("Sucess of Update.. Message");
    
                    },
                    error: function(oErr){
                        MessageBox.error( JSON.parse(oErr.responseText).error.innererror.errordetails[0].message );
                    }
                });

            };


           },
           onClearScreen: function(){
            this.changeMode("Create");
            this.getView().getModel("prod").setData({
                "enable" : true,
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
           sPath: null,
           onEnter: function(oEvent){
            // Get product id entered  by user on the screen"
            var val = oEvent.getParameter("value");
            // Get the local Model object 
            var  oModel = this.getView().getModel("prod");   
            // get the OData Model Object
            var  oDataModel = this.getView().getModel();   
            // Prepare the path to read single product data 
            var sPath = "/ProductSet('"+ val +"')";
            // Fire the OData get call & // Set the data to the local model
            var that = this;   
            oDataModel.read(sPath, {
                             success: function(data){
                                oModel.setProperty("/prodData",data);
                                that.changeMode("Change");
                                that.sPath =  sPath;
                                that.loadPhoto(sPath).bind(that);
                             },
                             error: function(){
                                that.sPath =  null;
                             }
                    });            
           },
           mode: "Create",
           changeMode: function(sMode){
            if ( sMode === "Create"){
                this.mode = "Create";
                this.getView().byId("idSave").setText("Create");
                this.getView().getModel("prod").setProperty("/enable",true);

            }else{
                this.mode = "Change";
                this.getView().byId("idSave").setText("Update");
                this.getView().getModel("prod").setProperty("/enable",false);
            }
           },
           onDelete: function(){
            var that = this;
            // Ask user to confirm deletion
            MessageBox.confirm("Would yuo like to delete?", {
                onClose: function(status){
                    if (status==="OK"){
                        //Get the OData Model object
                        var ODataModel = that.getView().getModel();
                        // Perform the OData call to send the DELETE request for the selected product 
                        ODataModel.remove(that.sPath, {
                            success: function(){
                        // Handle call back
                        MessageToast.show("The object is deleted");
                            }

                        });
                    }
                }
            } );
           },
           onLoadExp: function(){
            // Get the Category from th dropdown
            var  oModel = this.getView().getModel("prod");   
            var payload = this.getView().getModel("prod").getProperty("/prodData");
            var sCategory =  payload.CATEGORY;
            // Get the Odata Model Object 
            var that = this;
            var ODataModel = this.getView().getModel();
            // Call the Odata request to load data from server with Category being passed
            ODataModel.callFunction("/GetMostExpensiveProduct", {
                urlParameters: {
                    "I_CATEGORY": sCategory
                },
                success: function(data){
                      // Handle call back and set data to screen          
                    oModel.setProperty("/prodData",data);
                    that.changeMode("Change");
                    that.sPath =  sPath;
                },
                error: function(oErr){
                    MessageBox.error( JSON.parse(oErr.responseText).error.innererror.errordetails[0].message );

                }
            })
           },
           loadPhoto:function(sPath){
            sPath = ui5 serve
            sPath.replace("ProductSet","ProdPicSet");
            var photoPath = "/sap/opu/odata/SAP/Z_PRODUCT_SRV/" + sPath + "/$value";
            this.getView().byId("idPhoto").setSrc(photoPath);


           }
    });
});
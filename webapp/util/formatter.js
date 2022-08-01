sap.ui.define([
], function() {
    'use strict';
    return {
        getState: function(value){
            switch(value){
                case "A": return "Success"; break;
                case "D": return "Error"; break;
                case "O": return "Warning"; break;
                default: break;
            }
        },
        getStatus: function(value){
            switch(value){
                case "A": return "Available"; break;
                case "D": return "Discontinued"; break;
                case "O": return "Obsolete"; break;
                default: break;
            }
        }
    }
});
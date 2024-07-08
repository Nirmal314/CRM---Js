function confirmRedirectToOrder(newOrderID, executionContext) {
    var confirmStrings = { text: "Order created successfully. View order details?", title: "Order created!" };
    var confirmOptions = { height: 200, width: 450 };

    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if (success.confirmed) {
                Xrm.Navigation.openUrl(executionContext.context.getClientUrl() + "/main.aspx?etn=salesorder&pagetype=entityrecord&id=" + newOrderID)
            }
        });
}

function redirectToOrder(OpportunityID, executionContext) {
    var execute_hiring_redirecttoorder_Request = {
        entity: { entityType: "opportunity", id: OpportunityID.slice(1, -1) },

        getMetadata: function () {
            return {
                boundParameter: "entity",
                parameterTypes: {
                    entity: { typeName: "mscrm.opportunity", structuralProperty: 5 }
                },
                operationType: 0, operationName: "hiring_redirecttoorder"
            };
        }
    };

    Xrm.WebApi.execute(execute_hiring_redirecttoorder_Request).then(
        function success(response) {
            if (response.ok) { return response.json(); }
        }
    ).then(function (responseBody) {
        var result = responseBody;
        console.log(result);

        var neworderid = result["salesorderid"];

        console.log(neworderid)

        confirmRedirectToOrder(neworderid, executionContext)
    }).catch(function (error) {
        console.log(error.message);
    });
}
function CheckUserRole() {
    var _roleQuery = '';
    var currentUserRoles = Xrm.Page.context.getUserRoles();
    for (var i = 0; i < currentUserRoles.length; i++) {
        if (i == 0)
            _roleQuery += 'roleid eq ' + currentUserRoles[i];
        else
            _roleQuery += ' or roleid eq ' + currentUserRoles[i];
    }
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v8.1/roles?$select=name" + '&$filter=' + _roleQuery, true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var results = JSON.parse(this.response);
                for (var i = 0; i < results.value.length; i++) {
                    var roleName = results.value[i]["name"];
                    console.log(roleName)
                }
            } else {
                alert(this.statusText);
            }
        }
    };
    req.send();
}

//! --------------------------------------------------------------------

var _roleQuery = '';
var currentUserRoles = Xrm.Page.context.getUserRoles();
for (var i = 0; i < currentUserRoles.length; i++) {
    if (i == 0)
        _roleQuery += 'roleid eq ' + currentUserRoles[i];
    else
        _roleQuery += ' or roleid eq ' + currentUserRoles[i];
}
Xrm.WebApi.retrieveMultipleRecords("role", `?$select=name&$filter=(${_roleQuery})`).then(
    function success(results) {
        console.log(results);
        for (var i = 0; i < results.entities.length; i++) {
            var result = results.entities[i];
            // Columns
            var roleid = result["roleid"]; // Guid
            var name = result["name"]; // Text

            console.log(name)
        }
    },
    function (error) {
        console.log(error.message);
    }
);

// -----------------------------------------------------------------------------------------------------------------------


var formContext = Xrm.Page.data;
var workflowId = "{FB661D21-0C8E-442C-9B51-473F3C615A64}";
var query = "";
try {
    query = `workflows(${workflowId})/Microsoft.Dynamics.CRM.ExecuteWorkflow`;
    //Create a request
    var req = new XMLHttpRequest();
    req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.0/" + query, false);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function () {
        if (this.readyState == 4) {
            req.onreadystatechange = null;
            if (this.status == 200) {
                var result = JSON.parse(this.response);
            } else {
                Xrm.Utility.alertDialog("Error Occured!!. Please contact Administrator.");
            }
        }
    };
    req.send();
} catch (e) {
    console.log(e);
}

// ---------------------------------------------------------------------------------------

var executeWorkflowRequest = {
    entity: { entityType: "workflow", id: "fb661d21-0c8e-442c-9b51-473f3c615a64" },
    EntityId: { guid: "01f97b84-4b2c-492e-9745-d0b49449a805" },

    getMetadata: function () {
        return {
            boundParameter: "entity",
            parameterTypes: {
                entity: { typeName: "mscrm.workflow", structuralProperty: 5 },
                EntityId: { typeName: "Edm.Guid", structuralProperty: 1 }
            },
            operationType: 0, operationName: "ExecuteWorkflow"
        };
    }
};

Xrm.WebApi.execute(executeWorkflowRequest).then(
    function success(response) {
        if (response.ok) { return response.json(); }
    }
).then(function (responseBody) {
    var result = responseBody;
    console.log(result);
}).catch(function (error) {
    console.log(error.message);
});
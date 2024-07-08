// function validateDates(executionContext) {
//     var formContext = executionContext.getFormContext();

//     // var process = formContext.data.process;
//     // var activeProcess = process.getActiveProcess().getStages().getAll();

//     var interviewDateField = formContext.getAttribute("hiring_interviewdateandtime");

//     var currentDate = new Date();

//     if (interviewDateField) {
//         var interviewDate = interviewDateField.getValue();

//         if (interviewDate > currentDate) {
//             console.log("preventing...")
//             executionContext.getEventArgs().preventDefault()
//         } else {
//             console.log("valid")
//         }
//     } else {
//         console.log("no date")
//     }
//     // console.log(activeProcess)
// }

function addValidationRule(executionContext) {
    function validateDates(executionContext) {
        var formContext = executionContext.getFormContext();

        var interviewDateField = formContext.getAttribute("hiring_interviewdateandtime");

        if (interviewDateField) {
            var interviewDate = interviewDateField.getValue();
            var currentDate = new Date();

            if (interviewDate && interviewDate > currentDate) {
                console.log("Interview date is in the future. Preventing stage change.");
                executionContext.getEventArgs().preventDefault();

                let alertStrings = {
                    confirmButtonLabel: "OK",
                    text: `Let the interview complete: ${interviewDate.toLocaleDateString(
                        "en-GB"
                    )}`,
                    title: "Can't review before the interview.",
                };

                let alertOptions = { height: 250, width: 350 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);

            } else {
                console.log("Interview date is valid.");
            }
        } else {
            console.log("Interview date field not found on the form.");
        }
    }

    var formContext = executionContext.getFormContext();

    formContext.data.process.addOnPreStageChange(validateDates);
}

// function validateDates(executionContext) {
//     var formContext = executionContext.getFormContext();

//     var process = formContext.data.process;
//     // var activeProcess = process.getActiveProcess().getStages().getAll();

//     var interviewDateField = formContext.getAttribute("hiring_interviewdateandtime");

//     var currentDate = new Date();

//     if (interviewDateField) {
//         var interviewDate = interviewDateField.getValue();
//         if (interviewDate) {
//             if (interviewDate > currentDate) {
//                 console.log("preventing...")
//                 executionContext.getEventArgs().preventDefault()
//             } else {
//                 console.log("valid")
//             }
//         } else {
//             console.log("preventing... null date")
//             executionContext.getEventArgs().preventDefault()
//         }

//     } else {
//         console.log("no date")
//     }
//     // console.log(activeProcess)
// }

// ! ---------------------------------------------------------------------------------------------------------------------------------------------

function validatePhoneNumber(executionContext) {
    var formContext = executionContext.getFormContext();

    var phoneNumberField = formContext.getAttribute("new_phonenumber")

    if (phoneNumberField != null && phoneNumberField.getValue() != null && phoneNumberField.getValue().startsWith("91")) {
        formContext.getControl("new_phonenumber").clearNotification()
    } else {
        formContext.getControl("new_phonenumber").setNotification("Your phone number should start from 91 only.", "ERROR");
    }
}

function validateAge(executionContext) {
    var formContext = executionContext.getFormContext();

    var DOBField = formContext.getAttribute("cr267_dateofbirth");

    if (DOBField != null && DOBField.getValue() != null) {
        let DOBobj = new Date(DOBField.getValue());
        let today = new Date();

        let targetDate = new Date(DOBobj);
        targetDate.setFullYear(targetDate.getFullYear() + 18);

        if (today.getTime() < targetDate.getTime()) {
            formContext.getControl("cr267_dateofbirth").setNotification("Your age must be at least 18.", "ERROR");
        } else {
            formContext.getControl("cr267_dateofbirth").clearNotification()
        }
    }
}

// ! ---------------------------------------------------------------------------------------------------------------------------------------------

function setFullName(executionContext) {
    var formContext = executionContext.getFormContext();

    var ownerLookupField = formContext.getAttribute("ownerid");
    var nameField = formContext.getAttribute("cr267_name");

    if (ownerLookupField != null && ownerLookupField.getValue() != null) {
        let owner = ownerLookupField.getValue();

        let ownderFullName = owner[0].name;

        nameField.setValue(ownderFullName)
    }
}

// ! ---------------------------------------------------------------------------------------------------------------------------------------------

function getFieldValuesOnChange(executionContext) {
    var formContext = executionContext.getFormContext();

    var projectName = formContext.getAttribute("new_projectname").getValue();
    var description = formContext.getAttribute("new_description").getValue();
    var projectType = formContext.getAttribute("new_projecttype").getValue();
    var dueDate = formContext.getAttribute("new_duedate").getValue();

    console.log({
        projectName,
        description,
        projectType,
        dueDate,
    })
}

function getLookupField(executionContext) {
    var formContext = executionContext.getFormContext();

    var projectField = formContext.getAttribute("cr267_projectv2")
    var project = projectField.getValue();

    if (project != null) {
        const guid = project[0].id.slice(1, -1);
        const name = project[0].name;
        const entityName = project[0].entityType;

        const idToSet = "17268E7F-B427-EF11-840A-7C1E520E6FB0";
        const nameToSet = "car management";
        const entityTypeToSet = "new_project"

        console.log(`setting from ${name} to ${nameToSet}...`)

        projectField.setValue([{
            id: idToSet,
            name: nameToSet,
            entityType: entityTypeToSet
        }])
    }
}

function getDateField(executionContext) {
    var formContext = executionContext.getFormContext();

    var dueDateField = formContext.getAttribute("cr267_duedate")

    if (dueDateField != null) {
        var dueDate = new Date(dueDateField.getValue());
        console.log(dueDate)

        var dueDateToSet = new Date("2011-01-01");

        dueDateField.setValue(dueDateToSet)
        console.log(`converting the due date from ${dueDate} to ${dueDateToSet}`)
    }
}

function getMultiSelectField(executionContext) {
    var formContext = executionContext.getFormContext();

    var multiSelectField = formContext.getAttribute("new_multitabs")

    if (dueDateField != null) {
        var multiSelected = multiSelectField.getValue()

        console.log(multiSelected)
    }
}

// ! ---------------------------------------------------------------------------------------------------------------------------------------------

// function getOpportunitiesByAccountId(account_id) {
//     console.log("account_id", account_id);

//     function generateHTML(data) {
//         var html = `<table>
//             <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Created On</th>
//                     <th>Email Address</th>
//                     <th>Estimated Value</th>
//                     <th>Currency</th>
//                     <th>Opportunity ID</th>
//                 </tr>
//             </thead>
//             <tbody id="data-table-body">`;

//         data.forEach(item => {
//             html += `<tr>
//                 <td>${item.name}</td>
//                 <td>${item['createdon@OData.Community.Display.V1.FormattedValue']}</td>
//                 <td>${item.emailaddress}</td>
//                 <td>${item['estimatedvalue@OData.Community.Display.V1.FormattedValue']}</td>
//                 <td>${item['_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue']}</td>
//                 <td>${item.opportunityid}</td>
//             </tr>`;
//         });

//         html += `
//             </tbody>
//         </table>`;

//         return html;
//     }

//     Xrm.WebApi.retrieveMultipleRecords("opportunity", `?$select=name,createdon,emailaddress,estimatedvalue&$filter=_parentaccountid_value eq ${account_id}`).then(
//         function success(result) {
//             console.log(result);

//             const html = generateHTML(result.entities)
//             const encodedHTML = encodeURIComponent(html);

//             console.log(encodedHTML)

//             var pageInput = {
//                 pageType: "webresource",
//                 webresourceName: "new_OpportunitiesHTML",
//                 data: encodedHTML
//             };


//             Xrm.Navigation.navigateTo(pageInput).then(
//                 function success() {
//                     console.log("success")
//                 },
//                 function error() {
//                     console.log("error")
//                 }
//             );

//         },
//         function (error) {
//             console.log(error.message);
//         }
//     );
// }


function getOpportunitiesByAccountId(account_id) {
    console.log("account_id", account_id);

    Xrm.WebApi.retrieveMultipleRecords("opportunity", `?$select=name,createdon,emailaddress,estimatedvalue,opportunityid&$filter=_parentaccountid_value eq ${account_id}`).then(
        function success(result) {
            console.log(result);

            const jsonResult = JSON.stringify(result.entities);
            const encodedResult = encodeURIComponent(jsonResult);

            var pageInput = {
                pageType: "webresource",
                webresourceName: "new_OpportunitiesHTML",
                data: encodedResult
            };

            var navigationOptions = {
                target: 2,
                width: { value: 75, unit: "%" },
                height: { value: 50, unit: "%" },
                position: 1
            };

            Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
                function success() {
                    console.log("success");
                },
                function error(error) {
                    console.log("error: ", error);
                }
            );

        },
        function (error) {
            console.log(error.message);
        }
    );
}


// // ! Alpine Ski House


// function getOpportunitiesByAccountId(account_id) {
//     console.log("account_id", account_id);

//     Xrm.WebApi.retrieveMultipleRecords("opportunity", `?$select=name,createdon,emailaddress,estimatedvalue&$filter=_parentaccountid_value eq ${account_id}`).then(
//         function success(result) {
//             console.log(result)
//         },
//         function (error) {
//             console.log(error.message);
//         })
// }

// // ! Alpine Ski House

// ! ---------------------------------------------------------------------------------------------------------------------------------------------

async function manipulateEmailButton(tasks) {
    let visibility = false
    for (const i in tasks) {
        if (!visibility) {
            const result = await Xrm.WebApi.retrieveRecord("cr267_projecttask", tasks[i], "?$select=cr267_isemailsent,_ownerid_value")
            if (!result.cr267_isemailsent) visibility = true

        } else break;
    }

    return visibility
}

// ! ---------------------------------------------------------------------------------------------------------------------------------------------

function handleTabs(executionContext) {
    debugger
    var formContext = executionContext.getFormContext();
    var tabListField = formContext.getAttribute("new_multitabs");

    const tabs = formContext.ui.tabs.getAll();
    tabs.shift()

    if (tabListField != null && tabListField.getValue() != null) {
        let selectedTabs = tabListField.getValue();

        console.log("selectedTabs: ", selectedTabs)

        for (let i = 1; i <= 3; i++) {
            if (selectedTabs.includes(i)) {
                tabs[i - 1].setVisible(true);
            } else {
                tabs[i - 1].setVisible(false);
            }
        }
    } else {
        for (let i = 1; i <= 3; i++) {
            tabs[i - 1].setVisible(false);
        }
    }
}

// ! ---------------------------------------------------------------------------------------------------------------------------------------------

function sendEmail(tasks) {
    console.log("tasks", tasks)

    for (const i in tasks) {
        Xrm.WebApi.retrieveRecord("cr267_projecttask", tasks[i], "?$select=cr267_isemailsent,_ownerid_value").then(
            function success(result) {
                console.log(result);

                // ? if email is not sent
                if (!result.cr267_isemailsent) {

                    // TODO: trigger workflow to send email manually {canceled}
                    // ! create activity record instead

                    Xrm.WebApi.retrieveRecord("systemuser", result._ownerid_value, "?$select=internalemailaddress,systemuserid").then(
                        function success(result) {
                            console.log(result)
                            Xrm.WebApi.createRecord("email", {
                                subject: "Sent an email",
                                description: "This is the body of the email",
                                statecode: 1,
                                isregularactivity: true,
                                torecipients: `${result.internalemailaddress};`,
                                sender: "nambasana033@gmail.com"
                            }).then(
                                function success(result) {
                                    console.log(result)
                                    console.log("Email created with ID: " + result.id);
                                    // ? update the record
                                    Xrm.WebApi.updateRecord("cr267_projecttask", tasks[i], { cr267_isemailsent: true }).then(
                                        function success(result) {
                                            console.log(result)
                                            console.log("Email sent")

                                            // ! deprecated 
                                            Xrm.Page.data.refresh();
                                        },
                                        function (error) { console.log(error.message); }
                                    )
                                },
                                function (error) { console.log(error.message); }
                            );

                        },
                        function (error) { console.log(error.message); }
                    );
                }
            },
            function (error) { console.log(error.message); }
        )
    }
}

// ! ---------------------------------------------------------------------------------------------------------------------------------------------

function webApiCreateEmployee() {
    Xrm.WebApi.createRecord("cr267_myemployee", {
        "cr267_employeeid": "dummy employee id",
        "ownerid@odata.bind": "/systemusers(2167ab9b-a21f-ef11-840b-6045bdac2c24)",
        "new_phonenumber": "9111111111",
        "cr267_name": "dummy employee",
        "cr267_email": "dummy@mail.com",
        "cr267_dateofbirth": new Date("2000-01-01"),
        "cr267_married": false

    }).then(
        function (result) {
            alert("Employee created with ID: " + result.id);
        }, function (error) {
            console.error(error.message);
        });
}

function webApiRetrieveMultipleEmployees() {
    Xrm.WebApi.retrieveMultipleRecords("cr267_myemployee", "?$select=cr267_name").then(
        function success(result) {
            for (var i = 0; i < result.entities.length; i++) {
                console.log(result.entities[i]);
            }
        },
        function (error) {
            console.log(error.message);
        }
    );
}

// ! ---------------------------------------------------------------------------------------------------------------------------------------------
// ! ---------------------------------------------------------------------------------------------------------------------------------------------
// ! ---------------------------------------------------------------------------------------------------------------------------------------------
// ! ---------------------------------------------------------------------------------------------------------------------------------------------
// ! ---------------------------------------------------------------------------------------------------------------------------------------------
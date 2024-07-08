function disableFutureDates(executionContext) {
    var formContext = executionContext.getFormContext();

    debugger;
    var dateField = formContext.getAttribute("hiring_hiredate");
    var dateFieldValue = dateField.getValue();

    const currentDate = new Date();

    if (dateFieldValue > currentDate) {
        // Date is not in the future
        formContext.getControl("hiring_hiredate").setNotification("Date must not be in the future!", "ERROR");
    } else {
        // Date is in the future
        formContext.getControl("hiring_hiredate").clearNotification();
    }
}

// Xrm.Page.data.entity.attributes.getAll()

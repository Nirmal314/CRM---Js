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
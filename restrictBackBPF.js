function restrictBackwardMovement(executionContext) {
    function exec() {
        var formContext = executionContext.getFormContext();
        var processControl = formContext.data.process;

        // Xrm.Page.data.process.getActiveStage().getId()
        var activeStageId = processControl.getActiveStage().getId();

        // Xrm.Page.data.process.getActiveProcess().getStages().getAll();
        var stages = processControl.getActiveProcess().getStages().getAll();

        var currentStage = stages.find(function (stage) {
            // Xrm.Page.data.process.getActiveProcess().getStages().getAll()[0].getId();
            return stage.getId() === activeStageId;
        });

        if (currentStage && currentStage.getStageIndex() > 0) {
            executionContext.getEventArgs().preventDefault();

            let alertStrings = {
                confirmButtonLabel: "OK",
                text: `Cannot go backwards`,
                title: "Cannot go backwards",
            };

            let alertOptions = { height: 250, width: 350 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
        }
    }

    var formContext = executionContext.getFormContext();
    formContext.data.process.addOnStageChange(exec);
}



// Xrm.Page.data.process.getActiveProcess().getStages().getAll()

// function RestrictUserToMovePreviousStage(executionContext) {

//     function exec(executionContext) {
//         var direction = executionContext.getEventArgs().getDirection();
//         var processControl = formContext.data.process;
//         console.log(direction)
//         if (direction == "Previous") {
//             processControl.moveNext(() => {
//                 let alertStrings = {
//                     confirmButtonLabel: "OK",
//                     text: `Cannot go backwards`,
//                     title: "Cannot go backwards",
//                 };

//                 let alertOptions = { height: 250, width: 350 };
//                 Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
//             });
//         }
//     }

//     var formContext = executionContext.getFormContext();
//     formContext.data.process.addOnStageChange(exec);
// }


function RestrictUserToMovePreviousStage(executionContext) {
    var formContext = executionContext.getFormContext();
    var eventHandlerAdded = false;

    // Function to handle stage change event
    function handleStageChange(executionContext) {
        var direction = executionContext.getEventArgs().getDirection();

        if (direction === "Previous") {
            var processControl = formContext.data.process;
            processControl.moveNext(() => {
                var alertStrings = {
                    confirmButtonLabel: "OK",
                    text: "Cannot go backwards",
                    title: "Cannot go backwards"
                };

                var alertOptions = { height: 250, width: 350 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
            });
        }
    }

    // Add event handler if not already added
    if (!eventHandlerAdded) {
        formContext.data.process.addOnStageChange(handleStageChange);
        eventHandlerAdded = true;
    }
}

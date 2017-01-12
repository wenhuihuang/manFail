var util = {
    getEvent : function () {
        return window.event || arguments.callee.caller.arguments[0];
    }
}
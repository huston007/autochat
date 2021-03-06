Function.addCallListener = function(func, callbacks) {
    var successNumber = 0,
        errorNumber = 0,
        name = func.name;

    return function() {
        var args = [].slice.call(arguments);
        var result, error;

        var props = {
            args: args,
            self: this,
            name: name
        }


        callbacks.before && callbacks.before(props);

        try {
            result = func.apply(this, arguments);
            props.successNumber = ++successNumber;
            props.result = result;
            props.status = 'success';
            callbacks.success && callbacks.success(props);
        } catch (e) {
            props.errorNumber = ++errorNumber;
            props.error = e;
            props.status = 'error';
            callbacks.error && callbacks.error(props);
        }

        callbacks.after && callbacks.after(props);

        return result;
    }
}
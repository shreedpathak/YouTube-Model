class ApiError extends Error{
    constructor(
        statuscode,
        errors = [],
        message = "Something went wrong",
        stack = ""
    )
    {
        super(message)
        this.errors = errors,
        this.success = false,
        this.data = null,
        this.statuscode = statuscode,
        this.message = message
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}
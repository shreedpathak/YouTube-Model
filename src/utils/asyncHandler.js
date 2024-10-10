const asyncHandler = (requestHandler) => {
    (req, res, next) =>{    
        Promise.resolve(
            requestHandler(req, res, next)
        ).catch (
            (error)=> next(error) // sending function to next with error
        )   
    }
}

export default asyncHandler

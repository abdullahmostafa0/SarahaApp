
export const asyncHandler = (fn) => {
    return (req, res, next)=>{
        return fn(req, res, next).catch(error => {
            return next(new Error(error, {cause:500}))
        })
    }
}

export const globalErrorHandling = (error, req, res, next)=>{
    if(error)
    {
        if(process.env.MOOD == "DEV")
        {
            return res.status(error.cause || 500).json({message:error.message, error, stack:error.stack});
        }
        return res.status(error.cause || 500).json({message:error.message});
    }
}
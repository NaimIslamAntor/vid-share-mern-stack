
//creates an error
const createError = (status, message) => {

    const error = new Error()
    error.status = status
    error.message = message

    return error
}


//error middleware
export const errorHandler = (error, req, res, next) => {
    const status = error.status || 500
    const message = error.message || 'Something wrong happend in the server'

    return res.status(status).json({
        success: false,
        status,
        message,
    })
}




export default createError


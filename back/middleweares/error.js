export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const responseAPI = {
        status: 'error',
        msg: 'Error en la API',
        error: err.message,
        code: 500
    }
    res.status(500).send(responseAPI);
};
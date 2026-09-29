class AppError extends Error {
    constructor(mensaje, codigoEstado){
        super(mensaje);
        this.codigoEstado = codigoEstado;
        this.esOperecional = true;

        Error.captureStackTrace(this, this.constructor)

    }
}

module.exports = AppError;
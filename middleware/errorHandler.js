const errorHandler = (err, req, res, next) => {
    console.error('Error stack:', err.stack);

    // MSSQL specific errors
    if (err.code) {
        switch (err.code) {
            case 'EREQUEST':
                return res.status(400).json({
                    success: false,
                    message: 'Database request error',
                    error: process.env.NODE_ENV === 'development' ? err.message : undefined
                });
            case 'ECONNECTION':
                return res.status(503).json({
                    success: false,
                    message: 'Database connection error'
                });
            case 'ETIMEOUT':
                return res.status(408).json({
                    success: false,
                    message: 'Database timeout error'
                });
            default:
                return res.status(500).json({
                    success: false,
                    message: 'Database error',
                    error: process.env.NODE_ENV === 'development' ? err.message : undefined
                });
        }
    }

    // Default error
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler;

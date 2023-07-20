class BaseResponse {
    constructor() {
    }

    successResponse(status_code = 200, data = {}, message = '') {
        return {
            'status_code': status_code,
            'data': data,
            'message': message
        };
    }

    errorResponse = (status_code = 500, message = '') => {
        return {
            'status_code': status_code,
            'message': message
        };
    }
}

module.exports = BaseResponse;
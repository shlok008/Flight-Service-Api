const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
	if (!req.body.name) {
		ErrorResponse.messsage = "Something went wrong while creating airport";
		ErrorResponse.error = {
			explanation:
				"name of airport is not found in the oncoming request in the correct form",
		};
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	if (!req.body.code) {
		ErrorResponse.messsage = "Something went wrong while creating airport";
		ErrorResponse.error = {
			explanation:
				"code of airport is not found in the oncoming request in the correct form",
		};
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	if (!req.body.cityId) {
		ErrorResponse.messsage = "Something went wrong while creating airport";
		ErrorResponse.error = {
			explanation:
				"cityId of airport is not found in the oncoming request in the correct form",
		};
		return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
	}
	next();
}

module.exports = { validateCreateRequest };

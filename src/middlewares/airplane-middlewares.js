const {StatusCodes} =require('http-status-codes');
const {ErrorResponse} = require('../utils/common');

function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber || !req.body.capacity){
        ErrorResponse.messsage = "Something went wrong while creating airplane";
        ErrorResponse.error = {
			explanation:
				"Either Model Number or Capacity not found in the oncoming request in the correct form",
		};
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={validateCreateRequest};
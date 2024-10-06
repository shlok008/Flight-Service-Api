const { StatusCodes } = require("http-status-codes");
const { AirplaneRepo } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepo = new AirplaneRepo();

async function createAirplane(data) {
	try {
		const airplane = await airplaneRepo.create(data);
		return airplane;
	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			let explanation = [];
			error.errors.forEach((err) => explanation.push(err.message));
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Cannot create a new Airplane object",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getAirplane(id) {
	try {
		const airplane = await airplaneRepo.get(id);
		return airplane;
	} catch (error) {
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				"The airplane you requested to get is not present",
				error.statusCode
			);
		}
		throw new AppError(
			`Cannot fetch data of airplane id ${id}`,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getAirplanes() {
	try {
		const airplanes = await airplaneRepo.getAll();
		return airplanes;
	} catch (error) {
		throw new AppError(
			"Cannot fetch data of airplanes",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function destroyAirplane(id) {
	try {
		const res = await airplaneRepo.destroy(id);
		return res;
	} catch (error) {
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				"The airplane you requested to delete is not present",
				error.statusCode
			);
		}
		throw new AppError(
			`Cannot delete airplane with id ${id}`,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}


async function updateAirplane(id,data) {
	try {
		const airplane = await airplaneRepo.update(id,data);
		return airplane;
	} catch (error ) {

		if (error.name === "SequelizeValidationError") {
			let explanation = [];
			error.errors.forEach((err) => explanation.push(err.message));
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				"The airplane you requested to update is not present",
				error.statusCode
			);
		}
		
		throw new AppError(
			`Cannot fetch data of airplane id ${id}`,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	createAirplane,
	getAirplanes,
	getAirplane,
	destroyAirplane,
	updateAirplane
};

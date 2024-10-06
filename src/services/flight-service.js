const { StatusCodes } = require("http-status-codes");
const { FlightRepo } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");


const flightRepo = new FlightRepo();

async function createFlight(data) {
	try {
		const flight = await flightRepo.create(data);
		return flight;
	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			let explanation = [];
			error.errors.forEach((err) => explanation.push(err.message));
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Cannot create a new Flight object",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getFlight(id) {
	try {
		const flight = await flightRepo.get(id);
		return flight;
	} catch (error) {
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				"The flight details you requested to get is not present",
				error.statusCode
			);
		}
		throw new AppError(
			`Cannot fetch data of flight id ${id}`,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getFlights() {
	try {
		const flights = await flightRepo.getAll();
		return flights;
	} catch (error) {
		throw new AppError(
			"Cannot fetch data of flights",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function updateFlight(id, data) {
	try {
		const flight = await flightRepo.update(id, data);
		return flight;
	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			let explanation = [];
			error.errors.forEach((err) => explanation.push(err.message));
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				"The flight you requested to update is not present",
				error.statusCode
			);
		}
		throw new AppError(
			`Cannot fetch data of flight id ${id}`,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function destroyFlight(id) {
	try {
		const res = await flightRepo.destroy(id);
		return res;
	} catch (error) {
		if (error.statusCode === StatusCodes.NOT_FOUND) {
			throw new AppError(
				"The flight you requested to delete is not present",
				error.statusCode
			);
		}
		throw new AppError(
			`Cannot delete airport with id ${id}`,
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function getAllFlights(query) {
	let customFilter={};
	let sortFilter=[];
	const endingTimeTime='23:59:00';
	// trips=DEL-MUM
	if(query.trips){
		const [departureAirportId,arrivalAirportId]=query.trips.split("-");
		if(departureAirportId===arrivalAirportId){
			throw new AppError('Departure city and Arrival City must be different',StatusCodes.BAD_REQUEST)
		}
		customFilter.departureAirportId=departureAirportId;
		customFilter.arrivalAirportId=arrivalAirportId;
	}
	//flights?travellers=2&sort=departureTime_ASC,price_DESC
	if (query.price) {
		let [minPrice, maxPrice] = query.price.split("-");
		minPrice = Number(minPrice);
		maxPrice = Number(maxPrice);
		customFilter.price = {
			[Op.between]: [
				Math.min(minPrice, maxPrice),
				Math.max(minPrice, maxPrice),
			],
		};
	}
	if (query.travellers) {
		customFilter.totalSeats = {
			[Op.gte]: query.travellers,
		};
	}
	if(query.tripDate){
		customFilter.departureTime = {
			[Op.between]: [query.tripDate, query.tripDate + endingTimeTime],
		};
	}
	if(query.sort){
		  const params=query.sort.split(',');
		  const sortFilters=params.map(param =>param.split('_'));
		  sortFilter=sortFilters;
	}


	try{
		const flights=await flightRepo.getAllFlights(customFilter,sortFilter);
		return flights;
	}catch(error){
		throw new AppError('Cannot fetch data of all the flights',StatusCodes.INTERNAL_SERVER_ERROR);
	}
}

async function updateSeats(data) {
	try{
		const result=await flightRepo.updateRemainingSeats(data.flightId,data.seats,data.dec)
		return result;		
	}catch(error){
		throw new AppError('Cannot update data of the flight',StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
module.exports = {
	createFlight,
	getFlight,
	getFlights,
	getAllFlights,
	destroyFlight,
	updateFlight,
	updateSeats
};

const CrudRepo = require("./crud-repo");
const { Flight, Airplane, Airport,City } = require("../models");
const { Sequelize } = require("sequelize");
const db=require('../models');
const { addRowLockOnFlights } = require("./queries");

class FlightRepo extends CrudRepo {
	constructor() {
		super(Flight);
	}
	async getAllFlights(filter, sort) {
		const response = await Flight.findAll({
			where: filter,
			order: sort,
			//Join with Airplane and Airport table
			include: [
				{
					model: Airplane,
					required: true,
					as: "airplane_detail",
				},
				{
					model: Airport,
					required: true,
					as: "departure_airport",
					on: {
						col1: Sequelize.where(
							Sequelize.col("Flight.departureAirportId"),
							"=",
							Sequelize.col("departure_airport.code")
						),
					},
					include: {
						model: City,
						required: true,
					},
				},
				{
					model: Airport,
					required: true,
					as: "arrival_airport",
					on: {
						col1: Sequelize.where(
							Sequelize.col("Flight.arrivalAirportId"),
							"=",
							Sequelize.col("arrival_airport.code")
						),
					},
					include: {
						model: City,
						required: true,
					},
				},
			],
		});
		return response;
	}
	async updateRemainingSeats(flightId,seats,dec=true){
		await db.sequelize.query(addRowLockOnFlights(flightId)
		// ,{
			// replacements:{flightId},
			// type:db.sequelize.QueryTypes.SELECT,
		// }
	);
		const flight = await Flight.findByPk(flightId)
		if(parseInt(dec)){
			await flight.decrement('totalSeats',{by:seats});
		}else{
			await flight.increment('totalSeats',{by:seats});
		}
		return flight;
		// await flight.save(); 
	}
}

module.exports = FlightRepo;

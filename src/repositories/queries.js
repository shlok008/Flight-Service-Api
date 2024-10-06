function addRowLockOnFlights(flightId){
    return `SELECT * from flights WHERE Flights.id = ${flightId} for UPDATE;`;
}
module.exports={addRowLockOnFlights}
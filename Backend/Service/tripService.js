import Trip from '../models/tripModel.js';

const addTrip = async (
        busNumber,
        availableSeats,
        date,
        departureTime,
        arrivalTime,
        origin,
        destination,
        price
) => {
    const newTrip = await Trip.create({
        busNumber,
        availableSeats,
        date,
        departureTime,
        arrivalTime,
        origin,
        destination,
        price
    });
    return newTrip
}

const checkTrip = async (busNumber, date) => {
    const existingTrip = await Trip.findOne({
        busNumber: busNumber,
        date: date,
    });
    return existingTrip
}

const getTrip = async (trip_Id) => {
    const trip = await Trip.findById(trip_Id);
    return trip;
}

const searchTrip = async (origin, destination, date) => {
    const trip = await Trip.find({
        origin: { $regex: origin, $options: 'i' },
        destination: { $regex: destination, $options: 'i' },
        date: date,
    });
    return trip;
}

export { addTrip, checkTrip, getTrip, searchTrip }
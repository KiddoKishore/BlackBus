import Bus from '../models/busModel.js';
import Trip from '../models/tripModel.js';

const checkBusOwner = async (req, res, next) => {
	try{
		const bus = await Bus.findOne({busNumber: req.body.busNumber});

		if(!bus) {
			res.status(404).json({ message : "Bus not found"});
		} else {
			if (req.user && req.user._id.toString() === bus.user_id.toString()){
				next();
			} else {
				res.status(403).json({ message: "User is not the owner of the Bus"})
			}
		}
	} catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

const checkBusExists = async (req, res, next) => {
	const { busNumber } = req.body
	const bus = await Bus.findOne({busNumber});
	if(bus){
		return res.status(400).json({
			message: "Bus already Exists"
		})
	} else {
		next();
	}
}

const checkSeats = async (req,res,next) => {
	try{
		const { passengers } = req.body
	const id = req.params.trip_id
	const trip = await Trip.findById(id)
	if(!trip){
		return res.status(404).json({
			message: 'Trip Not Found'
		})
	}
	const num = trip.busNumber
	const bus = await Bus.findOne({busNumber: num})
	if(!bus){
		return res.status(404).json({
			message: 'Bus Not Found'
		})
	}
	const seats = passengers.map((p) => p.seatNo)
	const check = seats.map((seat) => bus.busSeats < seat)
	if(check.includes(true)){
		return res.status(404).json({
			message: 'Seats Not Found'
		})
	}
	
	next();
	} catch(error){
		res.status(500).json({
			message: "Invalid Trip Id"
		})
	}
}

const checkSeatsNumber = async (req,res,next) => {
	const { busNumber, availableSeats } = req.body;
	const bus = await Bus.findOne({busNumber})

	if(bus.busSeats < availableSeats){
		return res.status(404).json({
			message: `Avaiable Seats must be Lower than or Equal to ${bus.busSeats}`
		})
	}
	next();
}

const checkSameSeats = (req,res,next) => {
	const { passengers } = req.body;
	const seats = passengers.map((passenger) => passenger.seatNo) 
	const isSame = new Set(seats).size !== seats.length
	if (isSame){
		return res.status(401).json({
			message: "Please! Select different Seats"
		})
	}
	next();
}

export { checkBusOwner, checkBusExists, checkSeats, checkSeatsNumber, checkSameSeats }
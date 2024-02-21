import { addBus } from '../Service/busService.js';

const createBus = async (req, res)=> {
    try {
        const {busNumber, busSeats, isSleeper} = req.body

        const user_id = req.user

        const bus = await addBus(user_id, busNumber, busSeats, isSleeper)

        res.status(200).json({
            user_id: bus.user_id,
            busNumber: bus.busNumber,
            busSeats: bus.busSeats,
            isSleeper: bus.isSleeper
        })
        
    } catch (error) {
        res.status(500).json({ message: "Bus already Exists" })
    }
}

export { createBus }
import Bus from '../models/busModel.js';

const addBus = async (user_id, busNumber, busSeats, isSleeper) =>{
    const newBus = await Bus.create({
        user_id, busNumber, busSeats, isSleeper
    });
    return newBus
}
export { addBus }
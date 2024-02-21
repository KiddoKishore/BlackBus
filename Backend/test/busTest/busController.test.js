import { createBus } from '../../controllers/busController.js';

jest.mock('../../Service/busService.js', () => ({
  addBus: jest.fn(),
  checkBusExists: jest.fn(),
}));

describe('createBus', () => {
  let req, res

  beforeEach(() => {
    req = {
      body: {
        busNumber: 'TN38',
        busSeats: 50,
        isSleeper: true,
      },
      user: 'someUserId',
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  it('Create a New Bus', async () => {
    const addBusMock = jest.fn().mockResolvedValue({
      user_id: req.user,
      busNumber: req.body.busNumber,
      busSeats: req.body.busSeats,
      isSleeper: req.body.isSleeper,
    });

    require('../../Service/busService.js').addBus = addBusMock;

    await createBus(req, res);

    expect(addBusMock).toHaveBeenCalledWith(req.user, req.body.busNumber, req.body.busSeats, req.body.isSleeper);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      user_id: req.user,
      busNumber: req.body.busNumber,
      busSeats: req.body.busSeats,
      isSleeper: req.body.isSleeper,
    });
  });

  it('Bus Already Exists', async () => {
    const errorMessage = 'Bus already Exists';
    const addBusMock = jest.fn().mockRejectedValue(new Error(errorMessage));

    require('../../Service/busService.js').addBus = addBusMock;

    await createBus(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
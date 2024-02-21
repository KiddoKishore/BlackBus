import { createTrip, getTripById, SearchBus } from '../../controllers/tripController.js';
import { checkTrip, addTrip, getTrip, searchTrip } from '../../Service/tripService.js';

jest.mock('../../Service/tripService.js', () => ({
  checkTrip: jest.fn(),
  addTrip: jest.fn(),
  getTrip: jest.fn(),
  searchTrip: jest.fn(),
}));

describe('tripController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  describe('createTrip', () => {
    it('Create a Trip', async () => {
      const mockTrip = {
        busNumber: 'TN123',
        availableSeats: 30,
        date: '2024-01-20',
        departureTime: '08:00 AM',
        arrivalTime: '12:00 PM',
        origin: 'CityA',
        destination: 'CityB',
        price: 50.0,
      };

      checkTrip.mockResolvedValue(null); // No existing trip
      addTrip.mockResolvedValue(mockTrip);

      req.body = { ...mockTrip };

      await createTrip(req, res);

      expect(checkTrip).toHaveBeenCalledWith(mockTrip.busNumber, mockTrip.date);
      expect(addTrip).toHaveBeenCalledWith(
        mockTrip.busNumber,
        mockTrip.availableSeats,
        mockTrip.date,
        mockTrip.departureTime,
        mockTrip.arrivalTime,
        mockTrip.origin,
        mockTrip.destination,
        mockTrip.price
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        busNumber: mockTrip.busNumber,
        availableSeats: mockTrip.availableSeats,
        date: mockTrip.date,
        departureTime: mockTrip.departureTime,
        arrivalTime: mockTrip.arrivalTime,
        origin: mockTrip.origin,
        destination: mockTrip.destination,
        price: mockTrip.price,
      });
    });

    it('Trip already Exists', async () => {
      checkTrip.mockResolvedValue({});
      const errorMessage = 'Trip already exists';

      await createTrip(req, res);

      expect(checkTrip).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('getTripById', () => {
    it('Get Trip By Id', async () => {
      const mockTrip = {
        _id: 'tripId',
        busNumber: 'TN123',
        availableSeats: '25',
        date: '2024-01-20',
        departureTime: '12:00',
        arrivalTime: '05:00',
        origin: 'Coimbatore',
        destination: 'Chennai',
        price: '500'
      };

      getTrip.mockResolvedValue(mockTrip);
      req.params.id = 'tripId';

      await getTripById(req, res);

      expect(getTrip).toHaveBeenCalledWith('tripId');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTrip);
    });

    it('Trip Not Found', async () => {
      getTrip.mockResolvedValue(null);

      req.params.id = '1234';

      await getTripById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Trip not found' });
    });
  });

  describe('SearchBus', () => {
    it('Search trips based on origin, destination and date', async () => {
      const origin = 'Coimbatore';
      const destination = 'Chennai';
      const date = '2024-01-25';
      const tripsMock = [
        {
            _id: 'tripId',
            busNumber: 'TN123',
            availableSeats: '25',
            date: '2024-01-20',
            departureTime: '12:00',
            arrivalTime: '05:00',
            origin: 'Coimbatore',
            destination: 'Chennai',
            price: '500'
        },{
            _id: 'tripId',
            busNumber: 'TN38',
            availableSeats: '25',
            date: '2024-01-20',
            departureTime: '12:00',
            arrivalTime: '05:00',
            origin: 'Coimbatore',
            destination: 'Chennai',
            price: '500'
        }
      ];

      searchTrip.mockResolvedValue(tripsMock);
      req.query.from = origin;
      req.query.to = destination;
      req.query.date = date;

      await SearchBus(req, res);

      expect(searchTrip).toHaveBeenCalledWith(origin, destination, date);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(tripsMock);
    });

    it('No available buses', async () => {
      searchTrip.mockResolvedValue([]);

      await SearchBus(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No available buses' });
    });
  });
});
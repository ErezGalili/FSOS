const Flight = require('./FlightSchema');

const flightController = {
    getAllFlights: async (req, res) => {
        try {
            const flights = await Flight.find();
            if (!flights || flights.length === 0) {
                return res.status(200).json({success: true, data: []});
            }
            res.status(200).json({success: true, data: flights});
        } catch (error) {
            res.status(500).json({success: false, message: error.message });
        }
    },

    getFlight: async (req, res) => {
        try {
            const flight = await Flight.findById(req.params.id);
            if (!flight) return res.status(404).json({success: false, message: 'Flight not found' });
            res.status(200).json({success: true, data: flight});
        } catch (error) {
            res.status(500).json({success: false, message: error.message });
        }
    },

    createFlight: async (req, res) => {
        try {
            const { time, ...flightData } = req.body;
            const flight = new Flight({
                ...flightData,
                // Store time as UTC
                time: new Date(time) // Convert time string to Date object
            });
            const newFlight = await flight.save();
            res.status(201).json({ success: true, data: newFlight });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    updateFlight: async (req, res) => {
        try {
            const { time, ...flightData } = req.body;
            const updateData = {
                ...flightData,
                // Store time as UTC if provided
                time: time ? new Date(time) : undefined // Convert time string to Date object if provided
            };
            const flight = await Flight.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
            if (!flight) return res.status(404).json({ success: false, message: 'Flight not found' });
            res.status(200).json({ success: true, data: flight });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteFlight: async (req, res) => {
        try {
            const flight = await Flight.findByIdAndDelete(req.params.id);
            if (!flight) return res.status(404).json({success: false, message: 'Flight not found' });
            res.status(200).json({success: true, message: 'Flight deleted' });
        } catch (error) {
            res.status(500).json({success: false, message: error.message });
        }
    }
};

module.exports = flightController;

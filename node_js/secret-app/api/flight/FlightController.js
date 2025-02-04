const Flight = require('./FlightSchema');

const flightController = {
    getAllFlights: async (req, res) => {
        try {
            const flights = await Flight.find();
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
        const flight = new Flight(req.body);
        try {
            const newFlight = await flight.save();
            res.status(201).json({success: true, data: newFlight});
        } catch (error) {
            res.status(400).json({success: false, message: error.message });
        }
    },

    updateFlight: async (req, res) => {
        try {
            const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!flight) return res.status(404).json({success: false, message: 'Flight not found' });
            res.status(200).json({success: true, data: flight});
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

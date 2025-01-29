const City = require('./CityModel');

exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json({
            status: 'success',
            data: cities
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.createCity = async (req, res) => {
    try {
        const newCity = await City.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newCity
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

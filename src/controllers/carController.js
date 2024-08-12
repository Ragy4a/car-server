const createError = require('http-errors');
const Car = require('../models/cars');

class CarController {

    getAllCars = async (req, res, next) => {
        try {
            const { offset, limit } = req.pagination;
            const cars = await Car.find()
                .populate('typeId')
                .limit(limit)
                .skip(offset)
                .exec();
            if (!cars || cars.length === 0) {
                return next(createError(404, 'Cars not found!'));
            }
            res.status(200).json(cars);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    getCarById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const car = await Car.findById(id).populate('typeId');
            if (!car) {
                return next(createError(404, 'Car not found!'));
            }
            res.status(200).json(car);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    createCar = async (req, res, next) => {
        try {
            const { body, file } = req;
            const newCar = new Car({
                ...body,
                logo: file ? file.path : '',
            });
            if (!newCar) {
                return next(createError(404, 'Car not created!'));
            };
            await newCar.save();
            res.status(201).json(newCar);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    updateCar = async (req, res, next) => {
        try {
            const { file, body } = req;
            const updatedCar = await Car.findByIdAndUpdate(
                    body.id,
                {
                    ...body,
                    logo: file ? file.path : body.logo,
                },
                { new: true }
            ).populate('typeId');
            if (!updatedCar) {
                return next(createError(404, 'Car not found!'));
            };
            res.status(200).json(updatedCar);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    patchCar = async (req, res, next) => {
        try {
            const { params: { id }, body } = req;
            const updatedCar = await Car.findByIdAndUpdate(
                id,
                { $set: body },
                { new: true, runValidators: true }
            ).populate('typeId');
            if (!updatedCar) {
                return next(createError(404, 'Car not found!'));
            }
            res.status(200).json(updatedCar);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    deleteCar = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedCar = await Car.findByIdAndDelete(id);
            if (!deletedCar) {
                return next(createError(404, 'Car not found!'));
            }
            res.status(204).send();
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
};

module.exports = new CarController();
const createError = require('http-errors');
const { Car, Type } = require('../models');

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
            const carsData = cars.map(car => ({
                ...car.toObject(),
                type: car.typeId.name,
                typeId: undefined
            }));
            res.status(200).json(carsData);
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
            const carData = {
                ...car.toObject(),
                type: car.typeId.name,
                typeId: undefined 
            };
            res.status(200).json(carData);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    createCar = async (req, res, next) => {
        try {
            const { body, file } = req;
            const logo = file ? file.filename : null;
            const type = await Type.findOne({ name: body.type });
            if (!type) {
                return next(createError(404, 'Type not found!'));
            }
            const newCar = new Car({
                ...body,
                logo,
                typeId: type._id
            });
            if(!newCar) {
                return next(createError(404, 'Car not created!'));
            }
            const savedCar = await newCar.save();
            res.status(201).json(savedCar);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    updateCar = async (req, res, next) => {
        try {
            const { file, body } = req;
            const logo = file ? file.filename : null;
            const type = await Type.findOne({ name: body.type });
            if (!type) {
                return next(createError(404, 'Type not found!'));
            }
            const updatedCar = await Car.findByIdAndUpdate(
                body._id,
                {
                    ...body,
                    logo,
                    typeId: type._id
                },
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

    patchCar = async (req, res, next) => {
        try {
            const { params: { id }, body, file } = req;
            if (file) {
                body.logo = file.filename;
            }
            if (body.type) {
                const type = await Type.findOne({ name: body.type });
                if (!type) {
                    return next(createError(404, 'Type not found!'));
                }
                body.typeId = type._id;
            }
            const updatedCar = await Car.findByIdAndUpdate(
                id,
                { $set: body },
                { new: true, runValidators: true }
            ).populate('typeId');
            if (!updatedCar) {
                return next(createError(404, 'Car not found!'));
            }
            const carData = {
                ...updatedCar.toObject(),
                type: updatedCar.typeId.name,
                typeId: undefined 
            };
            res.status(200).json(carData);
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
}

module.exports = new CarController();
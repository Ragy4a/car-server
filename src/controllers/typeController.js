const createError = require('http-errors');
const { Type } = require('../models');

class TypeController {

    getAllTypes = async (req, res, next) => {
        try {
            const types = await Type.find().exec();
            if (!types || types.length === 0) {
                return next(createError(404, 'Types not found!'));
            }
            res.status(200).json(types);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    getTypeById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const type = await Type.findById(id).exec();
            if (!type) {
                return next(createError(404, 'Type not found!'));
            }
            res.status(200).json(type);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    createType = async (req, res, next) => {
        try {
            const newType = new Type(req.body);
            await newType.save();
            res.status(201).json(newType);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    updateType = async (req, res, next) => {
        try {
            const { id, name } = req.body; 
            const updatedType = await Type.findByIdAndUpdate(
                id,
                name,
                { new: true } 
            ).exec();
            if (!updatedType) {
                return next(createError(404, 'Type not found!'));
            }
            res.status(200).json(updatedType);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    deleteType = async (req, res, next) => {
        try {
            const { id } = req.params;
            const type = await Type.findByIdAndDelete(id).exec();
            if (!type) {
                return next(createError(404, 'Type not found!'));
            }
            res.status(204).send();
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = new TypeController();
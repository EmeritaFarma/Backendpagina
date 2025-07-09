"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getLocationById = exports.getAllLocations = void 0;
const Location_1 = require("../models/Location");
const getAllLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield Location_1.Location.find();
        res.json(locations);
    }
    catch (error) {
        res.status(404).json({ message: "Localidades no encontradas" });
    }
});
exports.getAllLocations = getAllLocations;
const getLocationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = yield Location_1.Location.findOneBy({ id: +req.params.id });
        res.json(location);
    }
    catch (error) {
        res.status(404).json({ message: "Localidad no encontrada" });
    }
});
exports.getLocationById = getLocationById;
const createLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = new Location_1.Location();
        location.latitude = req.body.latitude;
        location.longitude = req.body.longitude;
        location.andBetweenStreet = req.body.andBetweenStreet;
        location.betweenStreet = req.body.betweenStreet;
        location.city = req.body.city;
        location.colony = req.body.colony;
        location.number = req.body.number;
        location.state = req.body.state;
        location.street = req.body.street;
        location.zipCode = req.body.zipCode;
        yield location.save();
        res.json({
            message: "Localidad creada correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Localidad no creada" });
    }
});
exports.createLocation = createLocation;
const updateLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = yield Location_1.Location.findOneBy({ id: +req.params.id });
        if (!location) {
            throw new Error("Localidad no encontrada");
        }
        location.latitude = req.body.latitude;
        location.longitude = req.body.longitude;
        location.andBetweenStreet = req.body.andBetweenStreet;
        location.betweenStreet = req.body.betweenStreet;
        location.city = req.body.city;
        location.colony = req.body.colony;
        location.number = req.body.number;
        location.state = req.body.state;
        location.street = req.body.street;
        location.zipCode = req.body.zipCode;
        yield location.save();
        res.json({
            message: "Localidad actualizada correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Localidad no actualizada" });
    }
});
exports.updateLocation = updateLocation;
const deleteLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locationOne = yield Location_1.Location.findOneBy({ id: +req.params.id });
        if (!locationOne) {
            throw new Error("Localidad no encontrada");
        }
        yield locationOne.remove();
        res.json({
            message: "Localidad eliminada correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Localidad no eliminada" });
    }
});
exports.deleteLocation = deleteLocation;

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
exports.deleteBranch = exports.updateBranch = exports.createBranch = exports.getBranchById = exports.getAllBranches = void 0;
const Branch_1 = require("../models/Branch");
const Schedule_1 = require("../models/Schedule");
const Location_1 = require("../models/Location");
const Contact_1 = require("../models/Contact");
const getAllBranches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branches = yield Branch_1.Branch.find({
            relations: ["schedule", "location", "contact"]
        });
        res.json({ message: branches });
    }
    catch (error) {
        res.status(404).json({ message: "Farmacias no encontradas" });
    }
});
exports.getAllBranches = getAllBranches;
const getBranchById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branch = yield Branch_1.Branch.findOne({
            where: { id: +req.params.id },
            relations: ["schedule", "location", "contact"]
        });
        res.json({ message: branch });
    }
    catch (error) {
        res.status(404).json({ message: "Farmacia no encontrada" });
    }
});
exports.getBranchById = getBranchById;
const createBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const branch = new Branch_1.Branch();
        branch.name = req.body.name;
        let scheduleArray = [];
        (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.schedule) === null || _b === void 0 ? void 0 : _b.forEach((schedule) => {
            const newSchedule = new Schedule_1.Schedule();
            newSchedule.timeIn = schedule.timeIn;
            newSchedule.timeOut = schedule.timeOut;
            newSchedule.dayFrom = schedule.dayFrom;
            newSchedule.dayTo = schedule.dayTo;
            scheduleArray.push(newSchedule);
        });
        branch.schedule = scheduleArray;
        const location = new Location_1.Location();
        location.latitude = req.body.location.latitude;
        location.longitude = req.body.location.longitude;
        location.street = req.body.location.street;
        location.number = req.body.location.number;
        location.betweenStreet = req.body.location.betweenStreet;
        location.andBetweenStreet = req.body.location.andBetweenStreet;
        location.zipCode = req.body.location.zipCode;
        location.city = req.body.location.city;
        location.state = req.body.location.state;
        location.colony = req.body.location.colony;
        branch.location = location;
        const contactArray = [];
        (_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.contact) === null || _d === void 0 ? void 0 : _d.forEach((contact) => {
            const newContact = new Contact_1.Contact();
            newContact.type = contact.type;
            newContact.number = contact.number;
            contactArray.push(newContact);
        });
        branch.contact = contactArray;
        yield branch.save();
        res.json({
            message: "Farmacia creada correctamente",
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Farmacia no creada" });
    }
});
exports.createBranch = createBranch;
const updateBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const branch = yield Branch_1.Branch.findOne({
            where: { id: +req.params.id },
            relations: ["schedule", "location", "contact"]
        });
        if (!branch) {
            throw new Error("Farmacia no encontrada");
        }
        let location = Object.assign({}, branch.location);
        let contact = [...branch.contact];
        let schedule = [...branch.schedule];
        if ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.location) {
            location = Object.assign(Object.assign({}, location), req.body.location);
        }
        if ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.contact) {
            contact = [];
            contact = req.body.contact.map((item) => {
                const newContact = new Contact_1.Contact();
                newContact.type = item.type;
                newContact.number = item.number;
                newContact.branch = branch;
                return newContact;
            });
        }
        if ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.schedule) {
            schedule = [];
            schedule = req.body.schedule.map((item) => {
                const newSchedule = new Schedule_1.Schedule();
                newSchedule.timeIn = item.timeIn;
                newSchedule.timeOut = item.timeOut;
                newSchedule.dayFrom = item.dayFrom;
                newSchedule.dayTo = item.dayTo;
                newSchedule.branch = branch;
                return newSchedule;
            });
        }
        yield Contact_1.Contact.remove(branch.contact);
        yield Schedule_1.Schedule.remove(branch.schedule);
        branch.name = branch.name || req.body.name;
        branch.location = location;
        branch.contact = contact;
        branch.schedule = schedule;
        yield branch.save();
        res.json({
            message: "Farmacia actualizada correctamente",
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Surgio un error al actualizar la rama" });
    }
});
exports.updateBranch = updateBranch;
const deleteBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branchOne = yield Branch_1.Branch.findOneBy({ id: +req.params.id });
        if (!branchOne) {
            res.status(404).json({ message: "Rama no encontrada" });
            return;
        }
        yield branchOne.remove();
        res.json({
            message: "Farmacia eliminada correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Surgio un error al eliminar la rama" });
    }
});
exports.deleteBranch = deleteBranch;

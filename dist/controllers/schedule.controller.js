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
exports.deleteSchedule = exports.updateSchedule = exports.createSchedule = exports.getScheduleById = exports.getAllSchedules = void 0;
const Schedule_1 = require("../models/Schedule");
const getAllSchedules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield Schedule_1.Schedule.find({
            relations: ["branch"],
        });
        res.json(schedules);
    }
    catch (error) {
        res.status(404).json({ message: "Horarios no encontrados" });
    }
});
exports.getAllSchedules = getAllSchedules;
const getScheduleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedule = yield Schedule_1.Schedule.findOne({ relations: ["branch"], where: { id: +req.params.id } });
        res.json(schedule);
    }
    catch (error) {
        res.status(404).json({ message: "Horario no encontrado" });
    }
});
exports.getScheduleById = getScheduleById;
const createSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedule = new Schedule_1.Schedule();
        schedule.timeIn = req.body.timeIn;
        schedule.timeOut = req.body.timeOut;
        schedule.dayFrom = req.body.dayFrom;
        schedule.dayTo = req.body.dayTo;
        yield schedule.save();
        res.json({
            message: "Horario creado correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Horario no creado" });
    }
});
exports.createSchedule = createSchedule;
const updateSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedule = yield Schedule_1.Schedule.findOneBy({ id: +req.params.id });
        if (!schedule) {
            throw new Error("Horario no encontrado");
        }
        schedule.timeIn = req.body.timeIn;
        schedule.timeOut = req.body.timeOut;
        schedule.dayFrom = req.body.dayFrom;
        schedule.dayTo = req.body.dayTo;
        yield schedule.save();
        res.json({
            message: "Horario actualizado correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Horario no actualizado" });
    }
});
exports.updateSchedule = updateSchedule;
const deleteSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scheduleOne = yield Schedule_1.Schedule.findOneBy({ id: +req.params.id });
        if (!scheduleOne) {
            throw new Error("Horario no encontrado");
        }
        yield scheduleOne.remove();
        res.json({
            message: "Horario eliminado correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Horario no eliminado" });
    }
});
exports.deleteSchedule = deleteSchedule;

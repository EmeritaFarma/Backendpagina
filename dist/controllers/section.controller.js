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
exports.deleteSection = exports.updateSection = exports.createSection = exports.getSectionById = exports.getAllSections = void 0;
const Sections_1 = require("../models/Sections");
const getAllSections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sections = yield Sections_1.Sections.find();
        res.json(sections);
    }
    catch (error) {
        res.status(404).json({ message: "Secciones no encontradas" });
    }
});
exports.getAllSections = getAllSections;
const getSectionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const section = yield Sections_1.Sections.findOneBy({ id: +req.params.id });
        res.json(section);
    }
    catch (error) {
        res.status(404).json({ message: "Seccion no encontrada" });
    }
});
exports.getSectionById = getSectionById;
const createSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const section = new Sections_1.Sections();
        section.name = req.body.name;
        section.content = req.body.content;
        yield section.save();
        res.json({
            message: "Seccion creada correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Seccion no creada" });
    }
});
exports.createSection = createSection;
const updateSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const section = yield Sections_1.Sections.findOneBy({ id: +req.params.id });
        if (!section) {
            throw new Error("Seccion no encontrada");
        }
        section.name = req.body.name;
        section.content = req.body.content;
        yield section.save();
        res.json({
            message: "Seccion actualizada correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Seccion no actualizada" });
    }
});
exports.updateSection = updateSection;
const deleteSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sectionOne = yield Sections_1.Sections.findOneBy({ id: +req.params.id });
        if (!sectionOne) {
            throw new Error("Seccion no encontrada");
        }
        yield sectionOne.remove();
        res.json({
            message: "Seccion eliminada correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Seccion no eliminada" });
    }
});
exports.deleteSection = deleteSection;

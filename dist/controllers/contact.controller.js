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
exports.deleteContact = exports.updateContact = exports.createContact = exports.getContactById = exports.getAllContacts = void 0;
const Contact_1 = require("../models/Contact");
const getAllContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield Contact_1.Contact.find();
        res.json(contacts);
    }
    catch (error) {
        res.status(404).json({ message: "Contactos no encontrados" });
    }
});
exports.getAllContacts = getAllContacts;
const getContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield Contact_1.Contact.findOneBy({ id: +req.params.id });
        res.json(contact);
    }
    catch (error) {
        res.status(404).json({ message: "Contacto no encontrado" });
    }
});
exports.getContactById = getContactById;
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = new Contact_1.Contact();
        contact.type = req.body.type;
        contact.number = req.body.number;
        yield contact.save();
        res.json({
            message: "Contacto creado correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Contacto no creado" });
    }
});
exports.createContact = createContact;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield Contact_1.Contact.findOneBy({ id: +req.params.id });
        if (!contact) {
            throw new Error("Contacto no encontrado");
        }
        contact.type = req.body.type;
        contact.number = req.body.number;
        yield contact.save();
        res.json({
            message: "Contacto actualizado correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Contacto no actualizado" });
    }
});
exports.updateContact = updateContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactOne = yield Contact_1.Contact.findOneBy({ id: +req.params.id });
        if (!contactOne) {
            throw new Error("Contacto no encontrado");
        }
        yield contactOne.remove();
        res.json({
            message: "Contacto eliminado correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Contacto no eliminado" });
    }
});
exports.deleteContact = deleteContact;

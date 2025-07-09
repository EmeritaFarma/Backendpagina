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
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoleById = exports.getAllRoles = void 0;
const Role_1 = require("../models/Role");
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role_1.Role.find();
        res.json({ message: roles });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ message: error.message });
    }
});
exports.getAllRoles = getAllRoles;
const getRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield Role_1.Role.findOneBy({ id: +req.params.id });
        res.json({ message: role });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ message: error.message });
    }
});
exports.getRoleById = getRoleById;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = new Role_1.Role();
        role.type = req.body.type;
        yield role.save();
        res.json({
            message: "Rol creada correctamente",
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ message: error.message });
    }
});
exports.createRole = createRole;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield Role_1.Role.findOneBy({ id: +req.params.id });
        if (!role) {
            throw new Error("Role no encontrada");
        }
        role.type = req.body.type;
        yield role.save();
        res.json({
            message: "Rol actualizada correctamente",
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ message: error.message });
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield Role_1.Role.findOneBy({ id: +req.params.id });
        if (!role) {
            throw new Error("Role no encontrada");
        }
        yield role.remove();
        res.json({ message: "Rol eliminada correctamente" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ message: error.message });
    }
});
exports.deleteRole = deleteRole;

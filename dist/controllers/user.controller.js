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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.verifyToken = exports.login = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const helper_1 = require("../util/helper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "secret";
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({
            relations: ["role"],
        });
        res.json({ message: users });
    }
    catch (error) {
        res.status(404).json({ message: "Usuarios no encontrados" });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({
            where: { id: +req.params.id },
            relations: ["role"],
        });
        res.json({ message: user });
    }
    catch (error) {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User_1.User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.role = req.body.role;
        const newPassword = yield (0, helper_1.hashedPassword)(req.body.password);
        user.password = newPassword;
        yield user.save();
        res.json({
            message: "Usuario creado correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Usuario no creado" });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOneBy({ id: +req.params.id });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        user.name = req.body.name;
        user.email = req.body.email;
        const newPassword = yield (0, helper_1.hashedPassword)(req.body.password);
        user.password = newPassword;
        yield user.save();
        res.json({
            message: "Usuario actualizado correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Usuario no actualizado" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userOne = yield User_1.User.findOneBy({ id: +req.params.id });
        if (!userOne) {
            throw new Error("Usuario no encontrado");
        }
        yield userOne.remove();
        res.json({
            message: "Usuario eliminado correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Usuario no eliminado" });
    }
});
exports.deleteUser = deleteUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ where: { email: req.body.email } });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        const passwordMatch = yield (0, helper_1.comparePassword)(req.body.password, user.password);
        if (!passwordMatch) {
            throw new Error("Usuario o contraseña son incorrectos, verifique su información y vuelva a intentarlo");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, rol: user.role }, secret, {
            expiresIn: '7d',
        });
        res.json({
            message: "Usuario autenticado correctamente",
            token,
        });
    }
    catch (error) {
        res.status(400).json({ message: "Usuario no autenticado" });
    }
});
exports.login = login;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const token = (_d = (_c = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : "";
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        res.json({
            message: decoded,
            status: "success",
        });
    }
    catch (error) {
        res.status(401).json({ message: "Token Invalido", status: "error" });
    }
});
exports.verifyToken = verifyToken;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            message: "Sesión cerrada correctamente",
            status: "success",
        });
    }
    catch (error) {
        res.status(401).json({ message: "Sesión cerrada incorrectamente", status: "error" });
    }
});
exports.logout = logout;

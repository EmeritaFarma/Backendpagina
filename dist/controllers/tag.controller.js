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
exports.deleteTag = exports.updateTag = exports.createTag = exports.getTagById = exports.getAllTags = void 0;
const Tag_1 = require("../models/Tag");
const getAllTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield Tag_1.Tag.find();
        res.json({ message: tags });
    }
    catch (error) {
        res.status(404).json({ message: "Tags no encontradas" });
    }
});
exports.getAllTags = getAllTags;
const getTagById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield Tag_1.Tag.findOneBy({ id: +req.params.id });
        res.json({ message: tag });
    }
    catch (error) {
        res.status(404).json({ message: "Tag no encontrada" });
    }
});
exports.getTagById = getTagById;
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = new Tag_1.Tag();
        tag.name = req.body.name;
        yield tag.save();
        res.json({
            message: "Tag creada correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Tag no creada" });
    }
});
exports.createTag = createTag;
const updateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield Tag_1.Tag.findOneBy({ id: +req.params.id });
        if (!tag) {
            throw new Error("Tag no encontrada");
        }
        tag.name = req.body.name;
        yield tag.save();
        res.json({
            message: "Tag actualizada correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Tag no actualizada" });
    }
});
exports.updateTag = updateTag;
const deleteTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    try {
        const tagOne = yield Tag_1.Tag.findOne({
            where: { id: +req.params.id },
            relations: ["products"]
        });
        if (!tagOne) {
            throw new Error("Tag no encontrada");
        }
        if (tagOne.products.length > 0) {
            throw new Error("No se puede eliminar una etiqueta con productos");
        }
        yield (tagOne === null || tagOne === void 0 ? void 0 : tagOne.remove());
        res.json({
            message: "Tag eliminada correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Tag no eliminada" });
    }
});
exports.deleteTag = deleteTag;

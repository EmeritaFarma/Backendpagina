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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBanner = exports.updateBanner = exports.createBanner = exports.getBannerById = exports.getAllBanners = void 0;
const Banner_1 = require("../models/Banner");
const fs_1 = __importDefault(require("fs"));
const getAllBanners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banners = yield Banner_1.Banner.find({
            order: {
                priority: "ASC"
            }
        });
        res.json({
            message: banners
        });
    }
    catch (error) {
        res.status(404).json({ message: "Banners no encontradas" });
    }
});
exports.getAllBanners = getAllBanners;
const getBannerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banner = yield Banner_1.Banner.findOneBy({ id: +req.params.id });
        res.json({
            message: banner
        });
    }
    catch (error) {
        res.status(404).json({ message: "Banner no encontrada" });
    }
});
exports.getBannerById = getBannerById;
const createBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const banner = new Banner_1.Banner();
        const [_, count] = yield Banner_1.Banner.findAndCount();
        console.log(count);
        banner.image = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : 'imagen.png';
        banner.priority = count + 1;
        yield banner.save();
        res.json({
            message: "Banner creada correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Banner no creada" });
    }
});
exports.createBanner = createBanner;
const updateBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bannersBody = req.body;
        if (!Array.isArray(bannersBody)) {
            throw new Error("Proporcione un arreglo");
        }
        if (bannersBody.length === 0) {
            throw new Error("Proporcione al menos un banner");
        }
        yield Banner_1.Banner.save(bannersBody);
        res.json({
            message: "Banner actualizada correctamente",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});
exports.updateBanner = updateBanner;
const deleteBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bannerOne = yield Banner_1.Banner.findOneBy({ id: +req.params.id });
        if (!bannerOne) {
            throw new Error("Banner no encontrada");
        }
        const { image } = bannerOne;
        if (fs_1.default.existsSync(`./uploads/${image}`)) {
            fs_1.default.unlinkSync(`./uploads/${image}`);
        }
        yield bannerOne.remove();
        res.json({
            message: "Banner eliminada correctamente",
        });
    }
    catch (error) {
        res.status(400).json({ message: "Banner no eliminada" });
    }
});
exports.deleteBanner = deleteBanner;

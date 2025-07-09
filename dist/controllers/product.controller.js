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
exports.updateProductByBranch = exports.removeProductByBranch = exports.addProductByBranch = exports.getProductsBranchById = exports.getProductsByBranch = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const Product_1 = require("../models/Product");
const Branch_1 = require("../models/Branch");
const ProductBranch_1 = require("../models/ProductBranch");
const Category_1 = require("../models/Category");
const fs_1 = __importDefault(require("fs"));
const typeorm_1 = require("typeorm");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const branchid = (_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.branch) !== null && _b !== void 0 ? _b : "all";
        const search = (_d = (_c = req.query) === null || _c === void 0 ? void 0 : _c.search) !== null && _d !== void 0 ? _d : "";
        let products = [];
        if (branchid === "all") {
            if (!search) {
                products = yield Product_1.Product.find({
                    relations: ["category", "tags", "branchProducts.branch"]
                });
            }
            else {
                products = yield Product_1.Product.find({
                    where: {
                        name: (0, typeorm_1.Like)(`%${search}%`)
                    },
                    relations: ["category", "tags", "branchProducts.branch"]
                });
            }
        }
        else {
            if (!search) {
                let branchInventory = yield ProductBranch_1.BranchProduct.find({
                    where: { branch: { id: +branchid } },
                    relations: ["product", "product.category", "product.tags"]
                });
                branchInventory = branchInventory.map((item) => (Object.assign(Object.assign({}, item.product), { amount: item.amount, branchProduct: item.id })));
                products = branchInventory;
            }
            else {
                let branchInventory = yield Product_1.Product.find({
                    where: {
                        name: (0, typeorm_1.Like)(`%${search}%`)
                    },
                    relations: ["category", "tags", "branchProducts.branch"]
                });
                branchInventory = branchInventory.map((item) => (Object.assign(Object.assign({}, item), { amount: item.amount, branchProduct: item.id })));
                products = branchInventory;
            }
        }
        res.json({
            message: products
        });
    }
    catch (error) {
        res.status(404).json({ message: "Productos no encontrados" });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.Product.findOne({
            where: { id: +req.params.id },
            relations: ["category", "tags"]
        });
        res.json({
            message: product
        });
    }
    catch (error) {
        res.status(404).json({ message: "Producto no encontrado" });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const findProduct = yield Product_1.Product.findOne({
            where: { sku: req.body.sku },
            relations: ["category", "tags"]
        });
        if (findProduct) {
            res.status(400).json({ message: "Producto con el sku ya existe" });
            return;
        }
        console.log(req.file);
        const category = new Category_1.Category();
        category.id = req.body.category;
        const product = new Product_1.Product();
        product.name = (_a = req.body) === null || _a === void 0 ? void 0 : _a.name;
        product.priceBase = (_b = req.body) === null || _b === void 0 ? void 0 : _b.priceBase;
        product.sku = (_c = req.body) === null || _c === void 0 ? void 0 : _c.sku;
        product.priceDiscount = ((_d = req.body) === null || _d === void 0 ? void 0 : _d.priceDiscount) ? (_e = req.body) === null || _e === void 0 ? void 0 : _e.priceDiscount : null;
        product.category = category;
        product.image = (_g = (_f = req.file) === null || _f === void 0 ? void 0 : _f.filename) !== null && _g !== void 0 ? _g : 'imagen.png';
        product.tags = ((_h = req.body) === null || _h === void 0 ? void 0 : _h.tags) ? JSON.parse((_j = req.body) === null || _j === void 0 ? void 0 : _j.tags) : [];
        yield product.save();
        res.json({
            message: "Producto creado correctamente",
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Producto no creado" });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    try {
        console.log(req.body);
        const product = yield Product_1.Product.findOne({
            where: { id: +req.params.id },
            relations: ["category", "tags"]
        });
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        let priceBase = product.priceBase;
        let priceDiscount = product.priceDiscount;
        if (((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.priceBase) == 0 || ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.priceBase)) {
            priceBase = req.body.priceBase;
        }
        if (((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.priceDiscount) == 0 || ((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.priceDiscount)) {
            priceDiscount = req.body.priceDiscount;
        }
        if (fs_1.default.existsSync(`./uploads/${product.image}`)) {
            fs_1.default.unlinkSync(`./uploads/${product.image}`);
        }
        console.log(req.body);
        product.name = (_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : product.name;
        product.priceBase = priceBase;
        product.priceDiscount = priceDiscount;
        product.sku = (_h = (_g = req.body) === null || _g === void 0 ? void 0 : _g.sku) !== null && _h !== void 0 ? _h : product.sku;
        product.category = (_k = (_j = req.body) === null || _j === void 0 ? void 0 : _j.category) !== null && _k !== void 0 ? _k : product.category;
        product.image = (_m = (_l = req.file) === null || _l === void 0 ? void 0 : _l.filename) !== null && _m !== void 0 ? _m : product.image;
        product.tags = ((_o = req.body) === null || _o === void 0 ? void 0 : _o.tags) ? JSON.parse((_p = req.body) === null || _p === void 0 ? void 0 : _p.tags) : product.tags;
        yield product.save();
        res.json({
            message: "Producto actualizado correctamente",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productOne = yield Product_1.Product.findOne({
            where: { id: +req.params.id },
            relations: ["branchProducts"]
        });
        if (!productOne) {
            throw new Error("Producto no encontrado");
        }
        if (productOne.branchProducts.length > 0) {
            throw new Error("Producto en uso");
        }
        const { image } = productOne;
        if (fs_1.default.existsSync(`./uploads/${image}`)) {
            fs_1.default.unlinkSync(`./uploads/${image}`);
        }
        yield productOne.remove();
        res.json({
            message: "Producto eliminado correctamente",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});
exports.deleteProduct = deleteProduct;
const getProductsByBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branch = yield Branch_1.Branch.findOne({
            where: { id: +req.params.id },
            relations: ["branchProducts.product"]
        });
        if (!branch) {
            throw new Error("Rama no encontrada");
        }
        res.json({
            message: branch.branchProducts
        });
    }
    catch (error) {
        res.status(404).json({ message: "Rama no encontrada" });
    }
});
exports.getProductsByBranch = getProductsByBranch;
const getProductsBranchById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branch = yield ProductBranch_1.BranchProduct.findOne({
            where: { id: +req.params.id },
            relations: ["product", "branch"]
        });
        if (!branch) {
            throw new Error("No se encontro el producto o sucursal");
        }
        res.json({
            message: {
                id: branch.id,
                product: branch.product.id,
                branch: branch.branch.id,
                amount: branch.amount
            }
        });
    }
    catch (error) {
        res.status(404).json({ message: "Rama no encontrada" });
    }
});
exports.getProductsBranchById = getProductsBranchById;
const addProductByBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branch = req.body.branch;
        const productid = req.body.product;
        const amount = req.body.amount;
        const findProduct = yield Product_1.Product.findOne({
            where: { id: +productid },
            relations: ["branchProducts"]
        });
        if (!findProduct) {
            throw new Error("Producto no encontrado");
        }
        const productBranchFind = yield ProductBranch_1.BranchProduct.findOne({ where: { product: { id: productid } } });
        if (productBranchFind) {
            throw new Error('Producto ya se encuentra agregado');
        }
        const bra = new Branch_1.Branch();
        bra.id = +branch;
        const d = new ProductBranch_1.BranchProduct();
        d.amount = amount;
        d.product = productid;
        d.branch = bra;
        yield d.save();
        res.json({
            message: "Producto agregado correctamente",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});
exports.addProductByBranch = addProductByBranch;
const removeProductByBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const branchProduct = yield ProductBranch_1.BranchProduct.findOne({ where: { id: +id } });
        if (!branchProduct) {
            throw new Error('No se encontro el producto o sucursal');
        }
        yield branchProduct.remove();
        res.json({
            message: "Producto eliminado correctamente",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});
exports.removeProductByBranch = removeProductByBranch;
const updateProductByBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const amount = req.body.amount;
        const branchProduct = yield ProductBranch_1.BranchProduct.findOne({ where: { id: +id } });
        if (!branchProduct) {
            throw new Error('No se encontro el producto o sucursal');
        }
        branchProduct.amount = amount;
        yield branchProduct.save();
        res.json({
            message: "Producto actualizado correctamente",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
});
exports.updateProductByBranch = updateProductByBranch;

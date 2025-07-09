"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchProduct = void 0;
const typeorm_1 = require("typeorm");
const Branch_1 = require("./Branch");
const Product_1 = require("./Product");
let BranchProduct = class BranchProduct extends typeorm_1.BaseEntity {
};
exports.BranchProduct = BranchProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BranchProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Branch_1.Branch, (branch) => branch.branchProducts),
    __metadata("design:type", Branch_1.Branch)
], BranchProduct.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.branchProducts),
    __metadata("design:type", Product_1.Product)
], BranchProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BranchProduct.prototype, "amount", void 0);
exports.BranchProduct = BranchProduct = __decorate([
    (0, typeorm_1.Entity)()
], BranchProduct);

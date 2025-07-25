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
exports.Branch = void 0;
const typeorm_1 = require("typeorm");
const Schedule_1 = require("./Schedule");
const Contact_1 = require("./Contact");
const Location_1 = require("./Location");
const ProductBranch_1 = require("./ProductBranch");
let Branch = class Branch extends typeorm_1.BaseEntity {
};
exports.Branch = Branch;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Branch.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Branch.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Schedule_1.Schedule, (schedule) => schedule.branch, { cascade: true }),
    __metadata("design:type", Array)
], Branch.prototype, "schedule", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Contact_1.Contact, (contact) => contact.branch, { cascade: true }),
    __metadata("design:type", Array)
], Branch.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Location_1.Location, (location) => location.branch, { cascade: true }),
    __metadata("design:type", Location_1.Location)
], Branch.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProductBranch_1.BranchProduct, (branchProduct) => branchProduct.branch),
    __metadata("design:type", Array)
], Branch.prototype, "branchProducts", void 0);
exports.Branch = Branch = __decorate([
    (0, typeorm_1.Entity)()
], Branch);

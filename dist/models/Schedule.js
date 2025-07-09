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
exports.Schedule = void 0;
const typeorm_1 = require("typeorm");
const Branch_1 = require("./Branch");
let Schedule = class Schedule extends typeorm_1.BaseEntity {
};
exports.Schedule = Schedule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Schedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_in', type: 'time' }),
    __metadata("design:type", String)
], Schedule.prototype, "timeIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_out', type: 'time' }),
    __metadata("design:type", String)
], Schedule.prototype, "timeOut", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'day_to' }),
    __metadata("design:type", String)
], Schedule.prototype, "dayTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'day_from' }),
    __metadata("design:type", String)
], Schedule.prototype, "dayFrom", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Branch_1.Branch, (branch) => branch.schedule, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", Branch_1.Branch)
], Schedule.prototype, "branch", void 0);
exports.Schedule = Schedule = __decorate([
    (0, typeorm_1.Entity)()
], Schedule);

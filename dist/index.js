"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const cors_1 = __importDefault(require("cors"));
const category_routes_1 = require("./routes/category.routes");
const role_routes_1 = require("./routes/role.routes");
const user_routes_1 = require("./routes/user.routes");
const branch_routes_1 = require("./routes/branch.routes");
const location_routes_1 = require("./routes/location.routes");
const schedule_routes_1 = require("./routes/schedule.routes");
const banner_routes_1 = require("./routes/banner.routes");
const tag_routes_1 = require("./routes/tag.routes");
const product_routes_1 = require("./routes/product.routes");
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
db_1.db.initialize()
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log(err));
const dir = './uploads';
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir);
}
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("uploads"));
app.get("/api/test", (req, res) => {
    res.json({ message: "✅ Backend funcionando correctamente" });
});
app.use('/api/v1/category', category_routes_1.routerCategory);
app.use('/api/v1/rol', role_routes_1.routerRole);
app.use('/api/v1/user', user_routes_1.routerUser);
app.use('/api/v1/branch', branch_routes_1.routerBranch);
app.use('/api/v1/location', location_routes_1.routerLocation);
app.use('/api/v1/schedule', schedule_routes_1.routerSchedule);
app.use('/api/v1/banner', banner_routes_1.routerBanner);
app.use('/api/v1/tag', tag_routes_1.routerTag);
app.use('/api/v1/product', product_routes_1.routerProduct);
db_1.db.initialize()
    .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("❌ Error connecting to database", err);
    process.exit(1); // detiene si hay error
});

import express from "express";
import dotenv from "dotenv";
import { db } from "./config/db";
import cors from "cors";
import { routerCategory } from "./routes/category.routes";
import { routerRole } from "./routes/role.routes";
import { routerUser } from "./routes/user.routes";
import { routerBranch } from "./routes/branch.routes";
import { routerLocation } from "./routes/location.routes";
import { routerSchedule } from "./routes/schedule.routes";
import { routerBanner } from "./routes/banner.routes";
import { routerTag } from "./routes/tag.routes";
import { routerProduct } from "./routes/product.routes";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

db.initialize()
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log(err));

const dir = './uploads';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.get(cors());
app.get(express.json());
app.get(express.urlencoded({ extended: true }));
app.get(express.static("uploads"));
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend funcionando correctamente" });
});

app.get('/api/v1/category', routerCategory);
app.get('/api/v1/rol', routerRole);
app.get('/api/v1/user', routerUser);
app.get('/api/v1/branch', routerBranch);
app.get('/api/v1/location', routerLocation);
app.get('/api/v1/schedule', routerSchedule);
app.get('/api/v1/banner', routerBanner);
app.get('/api/v1/tag', routerTag);
app.get('/api/v1/product', routerProduct);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

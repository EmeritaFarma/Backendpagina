// back-farmacia/routes/index.ts

import { Router } from "express";
import { routerBanner } from "./banner.routes";
import { routerBranch } from "./branch.routes";
import { routerCategory } from "./category.routes";
import { routerLocation } from "./location.routes";
import { routerProduct } from "./product.routes";
import { routerRole } from "./role.routes";
import { routerSchedule } from "./schedule.routes";
import { routerSection } from "./section.routes";
import { routerTag } from "./tag.routes";
import { routerUser } from "./user.routes";

const router = Router();

// Asociar rutas
router.use("/banners", routerBanner);
router.use("/branches", routerBranch);
router.use("/categories", routerCategory);
router.use("/locations", routerLocation);
router.use("/products", routerProduct);
router.use("/roles", routerRole);
router.use("/schedules", routerSchedule);
router.use("/sections", routerSection);
router.use("/tags", routerTag);
router.use("/users", routerUser);
console.log("✅ Rutas cargadas:");
console.log("/api/v1/category");
console.log("/api/v1/rol");
console.log("/api/v1/user");
console.log("/api/v1/branch");
console.log("/api/v1/location");
console.log("/api/v1/schedule");
console.log("/api/v1/banner");
console.log("/api/v1/tag");
console.log("/api/v1/product");
console.log("🔥 Servidor listo. Esperando peticiones...");

export default router;

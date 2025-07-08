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

export default router;

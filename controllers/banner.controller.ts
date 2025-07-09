import { Request, Response } from "express";
import { Banner } from "../models/Banner";
import fs from "fs";

/* ──────────────────────────────  GET /api/v1/banner  ────────────────────────────── */
export const getAllBanners = async (req: Request, res: Response) => {
  try {
    const banners = await Banner.find({ order: { priority: "ASC" } });
    return res.json({ message: banners });
  } catch (error) {
    // ⬇️ Imprime el error real en los logs de Railway
    console.error("❌ Error en getAllBanners:", error);
    return res.status(500).json({ message: "Error al obtener banners" });
  }
};

/* ───────────────────────────── GET /api/v1/banner/:id ───────────────────────────── */
export const getBannerById = async (req: Request, res: Response) => {
  try {
    const banner = await Banner.findOneBy({ id: +req.params.id });
    if (!banner) {
      return res.status(404).json({ message: "Banner no encontrada" });
    }
    return res.json({ message: banner });
  } catch (error) {
    console.error("❌ Error en getBannerById:", error);
    return res.status(500).json({ message: "Error al obtener banner" });
  }
};

/* ─────────────────────────────── POST /api/v1/banner ────────────────────────────── */
export const createBanner = async (req: Request, res: Response) => {
  try {
    const banner = new Banner();
    const [, count] = await Banner.findAndCount();

    banner.image = req.file?.filename ?? "imagen.png";
    banner.priority = count + 1;
    await banner.save();

    return res.json({ message: "Banner creada correctamente" });
  } catch (error) {
    console.error("❌ Error en createBanner:", error);
    return res.status(500).json({ message: "Error al crear banner" });
  }
};

/* ─────────────────────────────── PUT /api/v1/banner ─────────────────────────────── */
export const updateBanner = async (req: Request, res: Response) => {
  try {
    const bannersBody = req.body as any[];

    if (!Array.isArray(bannersBody) || bannersBody.length === 0) {
      throw new Error("Proporcione al menos un banner en un arreglo");
    }

    await Banner.save(bannersBody);
    return res.json({ message: "Banner(s) actualizados correctamente" });
  } catch (error) {
    console.error("❌ Error en updateBanner:", error);
    return res.status(400).json({ message: error instanceof Error ? error.message : "Error al actualizar banner" });
  }
};

/* ───────────────────────────── DELETE /api/v1/banner/:id ─────────────────────────── */
export const deleteBanner = async (req: Request, res: Response) => {
  try {
    const bannerOne = await Banner.findOneBy({ id: +req.params.id });
    if (!bannerOne) throw new Error("Banner no encontrada");

    const { image } = bannerOne;
    if (fs.existsSync(`./uploads/${image}`)) fs.unlinkSync(`./uploads/${image}`);

    await bannerOne.remove();
    return res.json({ message: "Banner eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error en deleteBanner:", error);
    return res.status(400).json({ message: error instanceof Error ? error.message : "Error al eliminar banner" });
  }
};

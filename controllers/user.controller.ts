import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { hashedPassword, comparePassword } from "../util/helper";

const secret = process.env.JWT_SECRET ?? "secret";

/* ─────────────────────────── GET /api/v1/user ─────────────────────────── */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({ relations: ["role"] });
    return res.json({ message: users });
  } catch (error) {
    console.error("❌ Error en getAllUsers:", error);
    return res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

/* ──────────────────────── GET /api/v1/user/:id ─────────────────────────── */
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { id: +req.params.id },
      relations: ["role"],
    });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json({ message: user });
  } catch (error) {
    console.error("❌ Error en getUserById:", error);
    return res.status(500).json({ message: "Error al obtener usuario" });
  }
};

/* ───────────────────────── POST /api/v1/user ──────────────────────────── */
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;
    user.password = await hashedPassword(req.body.password);
    await user.save();

    return res.json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("❌ Error en createUser:", error);
    return res.status(400).json({ message: "Error al crear usuario" });
  }
};

/* ──────────────────────── PUT /api/v1/user/:id ─────────────────────────── */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneBy({ id: +req.params.id });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = await hashedPassword(req.body.password);
    await user.save();

    return res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error en updateUser:", error);
    return res.status(400).json({ message: "Error al actualizar usuario" });
  }
};

/* ─────────────────────── DELETE /api/v1/user/:id ───────────────────────── */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneBy({ id: +req.params.id });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.remove();
    return res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error en deleteUser:", error);
    return res.status(400).json({ message: "Error al eliminar usuario" });
  }
};

/* ───────────────────────────── POST /login ─────────────────────────────── */
export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email }, relations: ["role"] });
    if (!user) throw new Error("Usuario o contraseña incorrectos");

    const ok = await comparePassword(req.body.password, user.password);
    if (!ok) throw new Error("Usuario o contraseña incorrectos");

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      secret,
      { expiresIn: "7d" }
    );

    return res.json({ message: "Usuario autenticado", token });
  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(400).json({ message: error instanceof Error ? error.message : "Error de autenticación" });
  }
};

/* ──────────────────────── GET /verify-token ────────────────────────────── */
export const verifyToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] ?? "";
    const decoded = jwt.verify(token, secret);
    return res.json({ message: decoded, status: "success" });
  } catch (error) {
    console.error("❌ Error en verifyToken:", error);
    return res.status(401).json({ message: "Token inválido", status: "error" });
  }
};

/* ───────────────────────────── POST /logout ────────────────────────────── */
export const logout = async (_req: Request, res: Response) => {
  try {
    return res.json({ message: "Sesión cerrada correctamente", status: "success" });
  } catch (error) {
    console.error("❌ Error en logout:", error);
    return res.status(400).json({ message: "Error al cerrar sesión", status: "error" });
  }
};

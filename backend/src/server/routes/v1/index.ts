import { Router } from "express";
import { router as authRouter } from "./modules/auth";
import { router as filesRouter } from "./modules/files";
import { router as conversionsRouter } from "./modules/conversions";
import { router as sharesRouter } from "./modules/shares";

export const router = Router();

router.use("/auth", authRouter);
router.use("/files", filesRouter);
router.use("/conversions", conversionsRouter);
router.use("/shares", sharesRouter);

router.get("/", (req, res) => {
	res.json({ version: "v1" });
});

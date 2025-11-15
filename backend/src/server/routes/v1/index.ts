import { Router } from "express";
import { router as authRouter } from "./modules/auth";

export const router = Router();

router.use("/auth", authRouter);
// SkillSwap routes will be added here:
// router.use("/skills", skillsRouter);
// router.use("/matches", matchingRouter);
// router.use("/swaps", swapsRouter);

router.get("/", (req, res) => {
	res.json({ version: "v1", app: "SkillSwap India" });
});

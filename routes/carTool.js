import express from "express";
import {
  createCarTool,
  getAllCarTools,
  getCarTool,
  updateCarTool,
  deleteCarTool,
} from "../controllers/carToolController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

import { upload } from "../middlewares/imagesUpload.js";

const router = express.Router();

router
  .route("/")
  .post(CheckAuth, CheckRole("admin", "operators", "manager"),upload.single("photo"), createCarTool)
  .get(CheckAuth,  CheckRole("admin", "operators", "manager"), getAllCarTools);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager"), getCarTool)
  .patch(CheckAuth,  CheckRole("admin", "operators", "manager"), upload.single("photo"), updateCarTool)
  .delete(CheckAuth, CheckRole("admin", "operators", "manager"), deleteCarTool);

export default router;

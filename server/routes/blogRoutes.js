import express from "express";
import { getBlogs, refreshBlogs } from "../controllers/blogController.js";
const router = express.Router();

router.get("/", getBlogs);
router.post("/refresh", refreshBlogs);

export default router;

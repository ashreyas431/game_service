import express from "express";
import { verifyToken } from "../middleware/verifytoken.js";
import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../controllers/members.js";


const router = express.Router();

router.get("/getMembers", verifyToken, getMembers);
router.post("/addMember", verifyToken, addMember);
router.post(`/updateMember`, verifyToken, updateMember);
router.post(`/deleteMember`, verifyToken, deleteMember);

export default router;

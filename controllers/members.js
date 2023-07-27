import Member from "../models/Members.js";
import User from "../models/User.js";
import { mongoose } from "mongoose";

export async function getMembers(req, res) {
  try {
    const { userId } = req.query;
    // const doesUserExist = await User.findById(userId);
    // console.log(doesUserExist);
    // if (doesUserExist.length === 0) {
    //   return res
    //     .status(403)
    //     .json({ success: false, errorMsg: "User does not exist" });
    // }
    const members = await Member.find({ userId: userId });
    res.status(200).json({ success: true, data: { members: members } });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

export async function addMember(req, res) {
  try {
    const { userId, name, age } = req.body;
    const doesUserExist = await User.find({ _id: userId });
    if (doesUserExist.length === 0) {
      return res
        .status(403)
        .json({ success: false, errorMsg: "User does not exist" });
    }
    const newMember = new Member({ userId, name, age });
    await newMember.save();
    const allMembers = await Member.find({ userId: userId });
    res.status(200).json({ success: true, data: { member: allMembers } });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

export async function updateMember(req, res) {
  try {
    const { name, age, memberId, userId } = req.body;
    const doesUserExist = await User.find({ _id: userId });
    if (doesUserExist.length === 0) {
      return res
        .status(403)
        .json({ success: false, errorMsg: "User does not exist" });
    }
    const updatedMember = await Member.findByIdAndUpdate(memberId, {
      userId,
      name,
      age,
    });
    const allMembers = await Member.find({ userId: userId });
    res.status(200).json({ success: true, data: { members: allMembers } });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

export async function deleteMember(req, res) {
  try {
    const { memberId, userId } = req.body;
    const doesUserExist = await User.find({ _id: userId });
    if (doesUserExist.length === 0) {
      return res
        .status(403)
        .json({ success: false, errorMsg: "User does not exist" });
    }
    const deleteMember = await Member.findByIdAndDelete(memberId);
    const allMembers = await Member.find({ userId: userId });
    res.status(200).json({ success: true, data: { members: allMembers } });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
}

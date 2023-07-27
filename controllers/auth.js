import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export async function registerUser(req,res) {
    try {
        const { firstName, lastName, email, mobile, password } = req.body;
        if(!firstName || !lastName || !email || !mobile|| !password) {
          throw new Error("Please provide complete parameters")
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const userAlreadyRegistered = await User.find({ email: email });
        if (userAlreadyRegistered.length > 0) {
          const response = {
            success: false,
            data: {
              errorMessage: "User already registered"
            }
          };
          return res.status(409).json(response);
        }
        const newUser = new User({
          firstName,
          lastName,
          email,
          mobile,
          password: passwordHash
        });
        const savedUser = await newUser.save();
        const response = { success: true, data: savedUser };
        res.status(201).json(response);
      } catch (err) {
        const errorResponse = { success: false, data: { errorMessage: err.message } };
        res
          .status(500)
          .json(errorResponse);
      }
}

export async function loginUser(req,res){
    try {
        const { email, password } = req.body;
        if(!email || !password) {
          throw new Error("Please provide complete parameters")
        }
        const user = await User.findOne({ email: email });
        if (!user) {
          const response = {
            success: false,
            data: { errorMessage: "User does not exist." }
          };
          return res.status(404).json(response);
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          const response = {
            success: false,
            data: { errorMessage: "Invalid credentials." }
          };
          return res.status(400).json(response);
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        const response = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile
        };
        return res.status(200).json({ success: true, data: { token, user: response } });
      } catch (err) {
        const errorResponse = { success: false, data: { errorMessage: err.message } };
        res.status(500).json(errorResponse);
      }
}
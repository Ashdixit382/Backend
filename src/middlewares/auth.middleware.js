import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const verifyJWT = asyncHandler(async (req, _ ,next) => {
  try {
    
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    console.log(token); 

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    console.log("auth working fine 1")

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("auth working fine 2")

    console.log(decodedToken);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    console.log("auth working fine 3")

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    console.log("auth working fine 4")

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }

});

import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";
import sendResetPasswordEmail from "../utils/NodeMailer.js";
const generateAccessAndRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();
		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });
		return {
			accessToken,
			refreshToken,
		};
	} catch (error) {
		throw new ApiError(
			500,
			"Something Went Wrong While Generating Access and Refresh Token"
		);
	}
};

const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		throw new ApiError(401, "All Fields are Required");
	}
	const existedUser = await User.findOne({
		$or: [{ username }, { email }],
	});
	if (existedUser) {
		throw new ApiError(409, "User Already Exists");
	}
	const user = await User.create({
		username,
		email,
		password,
	});
	const createdUser = await User.findById(user._id).select(
		"-password -refreshToken"
	);

	if (!createdUser) {
		throw new ApiError(500, "Something went Wrong while Registering user");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new ApiError(401, "All Fields are Required");
	}

	const user = await User.findOne({ email });
	if (!user) {
		throw new ApiError(409, "User does not Exists");
	}
	const isPasswordValid = await user.isPasswordCorrect(password);
	if (!isPasswordValid) {
		return res
			.status(400)
			.json(new ApiResponse(400, {}, "Invalid User Credentials"));
	}
	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		user._id
	);
	const loggedInUser = await User.findById(user._id).select(
		"-password -refreshToken"
	);

	const options = {
		domain:".vercel.app",
		path:"/",
		sameSite:"none",
		maxAge: 3600000,
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(
			new ApiResponse(
				200,
				{
					user: loggedInUser,
					accessToken,
					refreshToken,
				},
				"User LoggedIn Successfully"
			)
		);
});
const logoutUser = asyncHandler(async (req, res) => {
	await User.findByIdAndUpdate(
		req.user._id,
		{
			$set: {
				refreshToken: undefined,
			},
		},
		{
			new: true,
		}
	);

	const options = {
		httpOnly: true,
		secure: true,
		maxAge: 0,
		sameSite: "none",
	};
	return res
		.status(200)
		.clearCookie("accessToken", options)
		.clearCookie("refreshToken", options)
		.json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});
const getCurrentUser = asyncHandler(async (req, res) => {
	return res
		.status(200)
		.json(new ApiResponse(200, req.user, "Current User Fetched SuccessFully"));
});
const forgetPassword = asyncHandler(async (req, res) => {
	const { email } = req.body;
	if (!email) {
		throw new ApiError(401, "Email required");
	}
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json(new ApiResponse(404, {}, "User not Found"));
	}
	const token = crypto.randomBytes(32).toString("hex");
	const tokenExpiry = Date.now() + 3600000; // one hour expiry
	user.passwordResetToken = token;
	user.passwordResetTokenExpiry = tokenExpiry;
	await user.save({ validateBeforeSave: false });
	const tokenUrl = `https://resumed-app.vercel.app/reset-password?token=${token}`;
	try {
		const info = await sendResetPasswordEmail(tokenUrl, email);
		return res.status(200).json(new ApiResponse(200, { info }, "email sent"));
	} catch (error) {
		throw new ApiError(500, "Server Error");
	}
});
const resetPassword = asyncHandler(async (req, res) => {
	const { token, newPassword } = req.body;
	const user = await User.findOne({
		passwordResetToken: token,
		passwordResetTokenExpiry: { $gt: Date.now() },
	});
	if (!user) {
		return res
			.status(404)
			.json(new ApiResponse(404, {}, "Invalid Token or Token Expired"));
	}
	user.password = newPassword;
	user.passwordResetToken = undefined;
	user.passwordResetTokenExpiry = undefined;
	await user.save({ validateBeforeSave: false });

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Password Reset Successfull"));
});
export {
	registerUser,
	loginUser,
	logoutUser,
	getCurrentUser,
	forgetPassword,
	resetPassword,
};

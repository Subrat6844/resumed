import { Resume } from "../models/resume.models.js";
// import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createResume = asyncHandler(async (req, res) => {
    const { themeColor, title, resumeId, userEmail, userName, firstName, lastName, email, address, jobTitle, phone, summary, education, experience, skill } = req.body;
    const user = req.user;
    if (!user) {
        return res.status(400).json(new ApiResponse(400, {}, 'User not found'));
    }

    const resume = new Resume({
        themeColor,
        title,
        resumeId,
        userEmail,
        userName,
        firstName,
        lastName,
        email,
        address,
        jobTitle,
        phone,
        summary,
        education,
        experience,
        skill
    });

    const createdResume = await resume.save();
    user.resume.push(createdResume._id);
    await user.save();
    res.status(200).json(new ApiResponse(200, createdResume, 'Resume created successfully'));
});
const getResumes = asyncHandler(async (req, res) => {
    const { email } = req.query;

    if (!email) {
        // return res.status(400).json(new ApiResponse(400, null, 'Email is required'));
        throw new ApiError(400,"Email is Required")
    }
    try {
        const resumes = await Resume.find({ userEmail: email }).populate('education experience skill');
        res.status(200).json(new ApiResponse(200, resumes, 'Resumes fetched successfully'));
    } catch (error) {
        // res.status(500).json(new ApiResponse(500, null, 'Error fetching resumes'));
        throw new ApiError(500,"Server Error")
    }
});
const updateResume = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    console.log(updatedData);
    const resume = await Resume.findByIdAndUpdate(id, updatedData, { new: true }).populate('education experience skill');

    if (!resume) {
        throw new ApiError(404,"Resume Not Found")
    }
    res.status(200).json(new ApiResponse(200, resume, 'Resume updated successfully'));
});
const getResumeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const resume = await Resume.findById(id).populate('education experience skill');

    if (!resume) {
        throw new ApiError(404,"Resume Not Found")
    }
    res.status(200).json(new ApiResponse(200, resume, 'Resume fetched successfully'));
});
const deleteResumeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const resume = await Resume.findByIdAndDelete(id);
    if (!resume) {
        throw new ApiError(404,"Resume Not Found")
    }
    res.status(200).json(new ApiResponse(200, resume, 'Resume deleted successfully'));
});

export { createResume , getResumes , updateResume,getResumeById ,deleteResumeById}
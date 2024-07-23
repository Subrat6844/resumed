import mongoose, { Schema } from "mongoose";

const educationSchema = new Schema({
  universityName: {
    type: String,
  },
  degree: {
    type: String,
  },
  major: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Education = mongoose.model("Education", educationSchema);

const skillSchema = new Schema({
  name: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

const Skill = mongoose.model("Skill", skillSchema);

const experienceSchema = new Schema({
  title: {
    type: String,
  },
  companyName: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  workSummary: {
    type: String,
  },
});

const Experience = mongoose.model("Experience", experienceSchema);

const resumeSchema = new Schema(
  {
    title: {
      type: String,
    },
    resumeId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    userName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    phone: {
      type: String,
    },
    summary: {
      type: String,
    },
    education: [
      {
        type: Schema.Types.ObjectId,
        ref: "Education",
      },
    ],
    experience: [
      {
        type: Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
    skill: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

export { Skill, Education, Experience, Resume };

import mongoose, { Schema } from "mongoose";

// const educationSchema = new Schema({
//   universityName: {
//     type: String,
//   },
//   degree: {
//     type: String,
//   },
//   major: {
//     type: String,
//   },
//   startDate: {
//     type: Date,
//   },
//   endDate: {
//     type: Date,
//   },
//   description: {
//     type: String,
//   },
// });

// const Education = mongoose.model("Education", educationSchema);

// const skillSchema = new Schema({
//   name: {
//     type: String,
//   },
//   rating: {
//     type: Number,
//   },
// });

// const Skill = mongoose.model("Skill", skillSchema);

// const experienceSchema = new Schema({
//   title: {
//     type: String,
//   },
//   companyName: {
//     type: String,
//   },
//   city: {
//     type: String,
//   },
//   state: {
//     type: String,
//   },
//   startDate: {
//     type: Date,
//   },
//   endDate: {
//     type: Date,
//   },
//   workSummary: {
//     type: String,
//   },
// });

// const Experience = mongoose.model("Experience", experienceSchema);

const resumeSchema = new Schema(
  {
    themeColor: {
      type: String,
    },
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
    experience: [
      {
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
          type: Date,
        },
        endDate: {
          type: Date,
        },
        workSummary: {
          type: String,
        },
      },
    ],
    education: [
      {
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
          type: Date,
        },
        endDate: {
          type: Date,
        },
        description: {
          type: String,
        },
      },
    ],
    skill: [
      {
        name: {
          type: String,
        },
        rating: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

export { Resume };

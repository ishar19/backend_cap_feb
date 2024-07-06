const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    jobType: {
        type: String,
        enum: ["Full Time", "Part Time", "Remote", "Contract", "Internship"],  // enumeration
        required: true
    },
    remote: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    about: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    information: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("JobSchema", JobSchema);
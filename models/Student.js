import mongoose from "mongoose";


//Schema for Student
const studentSchema = mongoose.Schema({
    roll_no: {
        type: Number,
        required: true,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
});

//Model for Student
const Student = mongoose.model("Student", studentSchema);

export default Student;
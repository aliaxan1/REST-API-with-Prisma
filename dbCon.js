import mongoose from "mongoose";



//Database connection
try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/Student");
    console.log(`MongoDB connected: ${conn.connection.host}`);
} catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
}




//Schema


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
    type:String,
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





const Student = mongoose.model("Student", studentSchema);

export default Student;
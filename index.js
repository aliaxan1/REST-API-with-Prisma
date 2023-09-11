import express, { query, urlencoded } from 'express';
import multer from 'multer';//module for upload handling
import Student from './dbCon.js';



//Express
const app = express();
const PORT = 3000;

//MIDDLEWARES

//for form submission
app.use(urlencoded({ extended: true }));

//for uploading
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        return cb(null, `${req.params.id}_${file.originalname}`);
    },
});
const upload = multer({ storage });



//Routes

//GET
app.get('/', (req, res) => {
    res.send(`HOME PAGE`);
});

app.get('/student/api', async (req, res) => {
    const query = {}; // for all enteries in DB.
    const allStudents = await Student.find( query );
    // console.log(allStudents)
    return res.json(allStudents);
});

app.get('/student/api/:id',async (req, res) => {
    const id = Number(req.params.id);
    const query = { roll_no: id };
    const student = await Student.findOne(query);
    if (!student) {
        return res.send(`No student with id ${id}`);
    }
    return res.json(student);
});

//POST
app.post('/student/api', upload.single("image"),async (req, res) => {

    console.log(req.body)
    console.log(req.file.path)
    const dataUploaded = await Student.create({
        roll_no: req.body.roll_no,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        image: String(req.file.filename),
    });

    return res.json(dataUploaded);

});


//PATCH

app.patch('/student/api/:id', upload.single("image"),async (req, res) => {
    const id = Number(req.params.id);
    const query = { roll_no: id };
    const studentTUpdate =await Student.findOneAndUpdate( query , {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        image: String(req.file.filename),
    }, { new: true });
    if (!studentTUpdate) {
        return res.send(`No student with id ${id}`);
    }

    return res.json(studentTUpdate);
});

//DELETE

app.delete('/student/api/:id',async (req, res) => {
    const id = Number(req.params.id);
    const query = { roll_no: id };
    const studentToDelete =await Student.findOneAndDelete( query );
    if (!studentToDelete) {
        return res.send(`No student with id ${id}`);
    }
    return res.json(studentToDelete);
});


//Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

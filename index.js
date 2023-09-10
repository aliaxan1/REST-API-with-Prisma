import express, { query, urlencoded } from 'express';
import studentData from './MOCK_DATA.json' assert { type: "json" };
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
        return cb(null, `${req.params.id == undefined ? studentData.length + 1 : req.params.id}_${file.originalname}`);
    },
});
const upload = multer({ storage });




//Routes
//GET
app.get('/', (req, res) => {
    res.send(`HOME PAGE`);
});

app.get('/student/api', async (req, res) => {
    const allStudents = await Student.find({});
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


//PUT

app.put('/student/api/:id', upload.single("image"), (req, res) => {
    const id = Number(req.params.id);
    const student = studentData.find((student) => student.roll_no === id);
    if (!student) {
        return res.send(`No student with id ${id}`);
    }
    student.first_name !== req.body.first_name && req.body.first_name != undefined ? student.first_name = req.body.first_name : student.first_name;
    student.last_name !== req.body.last_name && req.body.last_name != undefined ? student.last_name = req.body.last_name : student.last_name;
    student.email !== req.body.email && req.body.email != undefined ? student.email = req.body.email : student.email;
    student.image !== String(req.file.filename) && String(req.file.filename) != undefined ? student.image = String(req.file.filename) : student.image;

    return res.json(student);
});

//DELETE

app.delete('/student/api/:id', (req, res) => {
    const id = Number(req.params.id);
    const student = studentData.find((student) => student.roll_no === id);
    if (!student) {
        return res.send(`No student with id ${id}`);
    }
    const index = studentData.indexOf(student);
    studentData.splice(index, 1);
    return res.json(student);
});


//Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

import express, { urlencoded } from 'express';
import studentData from './MOCK_DATA.json' assert { type: "json" };


const app = express();
const PORT = 3000;


app.use(urlencoded({ extended: false }));

//Routes
//GET
app.get('/', (req, res) => {
    res.send(`HOME PAGE`);
});

app.get('/student/api', (req, res) => {
    return res.json(studentData);
});

app.get('/student/api/:id', (req, res) => {
    const id = Number(req.params.id);
    const student = studentData.find((student) => student.roll_no === id);
    if (!student) {
        return res.send(`No student with id ${id}`);
    }
    return res.json(student);
});

//POST

app.post('/student/api', (req, res) => {
    const student = {
        roll_no: studentData.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    };
    studentData.push(student);
    return res.json(student);
});


//PUT

app.put('/student/api/:id', (req, res) => {
    const id = Number(req.params.id);
    const student = studentData.find((student) => student.roll_no === id);
    if (!student) {
        return res.send(`No student with id ${id}`);
    }
    student.first_name !== req.body.first_name && req.body.first_name != undefined ? student.first_name = req.body.first_name : student.first_name;
    student.last_name !== req.body.last_name && req.body.last_name != undefined ? student.last_name = req.body.last_name : student.last_name;
    student.email !== req.body.email && req.body.email != undefined ? student.email = req.body.email : student.email;


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
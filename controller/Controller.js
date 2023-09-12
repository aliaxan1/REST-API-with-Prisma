import Student from '../models/Student.js';


async function homeRouteController(req, res) {
    res.send(`HOME PAGE`);
}


async function getAllRouteController(req, res) {
    const query = {}; // for all enteries in DB.
    const allStudents = await Student.find(query);
    // console.log(allStudents)
    return res.json(allStudents);
}


async function getByRollNoRouteController(req, res) {
    const id = Number(req.params.id);
    const query = { roll_no: id };
    const student = await Student.findOne(query);
    if (!student) {
        return res.send(`No student with id ${id}`);
    }
    return res.json(student);
}


async function createRouteController(req, res) {
    const dataUploaded = await Student.create({
        roll_no: req.body.roll_no,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        image: String(req.file.filename),
    });

    return res.json(dataUploaded);
}


async function updateByRollNoRouteController(req, res) {
    const id = Number(req.params.id);
    const query = { roll_no: id };
    const studentTUpdate = await Student.findOneAndUpdate(query, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        image: String(req.file.filename),
    }, { new: true });
    if (!studentTUpdate) {
        return res.send(`No student with id ${id}`);
    }

    return res.json(studentTUpdate);
}


async function deleteByRollNoRouteController(req, res) {
    const id = Number(req.params.id);
    const query = { roll_no: id };
    const studentToDelete = await Student.findOneAndDelete(query);
    if (!studentToDelete) {
        return res.send(`No student with id ${id}`);
    }
    return res.json(studentToDelete);
}




export {
    homeRouteController,
    getAllRouteController,
    getByRollNoRouteController,
    createRouteController,
    updateByRollNoRouteController,
    deleteByRollNoRouteController
}
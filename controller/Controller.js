import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB


async function homeRouteController(req, res) {
    res.send(`HOME PAGE`);
}


async function getAllRouteController(req, res) {
    const allStudents = await prisma.Student.findMany();
    return res.json(allStudents);
}


async function getByRollNoRouteController(req, res) {
    const id = Number(req.params.id);
    const query = { roll_no: id };
    const student = await prisma.student.findUnique({
        where: query,
      });    
    if (!student) {
        return res.send(`No student with id ${id}`);
    }
    return res.json(student);
}


async function createRouteController(req, res) {
    // console.log(req.body);
    const dataUploaded =await prisma.student.create({

        data: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
          },
    });
    console.log(dataUploaded);
    return res.json(dataUploaded);
}


async function updateByRollNoRouteController(req, res) {
    const id = Number(req.params.id);
    const query = { roll_no: id };
    const studentTUpdate = await prisma.student.update({
        where: query,
        data: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    }
      });
    if (!studentTUpdate) {
        return res.send(`No student with id ${id}`);
    }

    return res.json(studentTUpdate);
}


async function deleteByRollNoRouteController(req, res) {
    const id = Number(req.params.id);
    const query = { roll_no: id };
    const studentToDelete = await prisma.student.delete({
        where: query,
      });
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
import express from "express";
import { homeRouteController, getAllRouteController, getByRollNoRouteController, createRouteController, updateByRollNoRouteController, deleteByRollNoRouteController } from "../controller/Controller.js";
import multer from 'multer';//module for upload handling

const router = express.Router();

//for uploading
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        return cb(null, `${req.body?.roll_no}_${file.originalname}`);
    },
});

const upload = multer({ storage });
//Routes

//GET
router.get('/home', homeRouteController);

router.get('/', getAllRouteController);

router.get('/:id', getByRollNoRouteController);

//POST
router.post('/', upload.single("image"), createRouteController);


//PATCH

router.patch('/:id', upload.single("image"), updateByRollNoRouteController);

//DELETE

router.delete('/:id', deleteByRollNoRouteController);

export default router;
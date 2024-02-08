import express from "express";
 
import { 
    getIsExist,
    createTimeReport,
    getEditedData,
    getAllIDs,
    getSelectionData
} from "../controllers/Products.js";
 
const router = express.Router();

router.get('/isExist/:fileID', getIsExist);
router.post('/createTimeReport', createTimeReport);
router.post('/getEditedData', getEditedData);
router.post('/getAllIDs', getAllIDs);
router.get('/getSelectionData/:fileID', getSelectionData);
export default router;
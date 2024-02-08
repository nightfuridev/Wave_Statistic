import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const IDs = db.define('fileids', {
    fileID:{
        type: DataTypes.DOUBLE
    }
},{
    freezeTableName: true
});
 
export default IDs;
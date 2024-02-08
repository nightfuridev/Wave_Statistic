import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const TimeReport = db.define('time_reports', {
    date: {
        type: DataTypes.DATE
    },
    hours_worked: {
        type: DataTypes.DOUBLE
    },
    employee_id: {
        type: DataTypes.STRING
    },
    job_group: {
        type: DataTypes.STRING
    },
    fileID: {
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
 
export default TimeReport;
import IDs from "../models/idModel.js";
import TimeReport from "../models/timereportsModel.js";
import { Op } from 'sequelize';

export const getIsExist = async (req, res) => {
    try {
        const sameFileIDs = await TimeReport.findAll({
            where: {
                fileID: req.params.fileID
            }
        });
        if (sameFileIDs.length == 0) {
            res.json({ isExist: false });
        } else {
            res.json({ isExist: true });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createTimeReport = async (req, res) => {
    try {
        req.body.time_reports.map(async (item, index) => {
            const editedItem = {
                date: new Date(item.date.split("/").reverse().join("-")),
                hours_worked: parseInt(item[`hours_worked`]),
                employee_id: item[`employee_id`],
                job_group: item[`job_group`],
                fileID: req.body.fileID
            };
            // console.log("index::", index, editedItem);
            await TimeReport.create(editedItem);
        })
        await IDs.create({ fileID: req.body.fileID });
        res.json({
            "message": "Product Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getEditedData = async (req, res) => {
    try {
        res.json(payrollReport(req.body.array));
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getAllIDs = async (req, res) => {
    try {
        const AllIDs = await IDs.findAll();
        if (AllIDs.length > 0) {
            const InitArrays = await TimeReport.findAll({
                where: {
                    fileID: AllIDs[0].fileID
                },
                attributes: ['date', 'hours_worked', 'employee_id', 'job_group'],
            });
            let arrays = [];
            InitArrays.map((item) => {
                let element_array = {
                    date: item.date,
                    hours_worked: item.hours_worked,
                    employee_id: item.employee_id,
                    job_group: item.job_group
                };
                arrays.push(element_array);
            })
            // console.log(InitArrays);
            const InitPayroll = payrollReport(arrays);
            res.json({
                AllIDs: AllIDs,
                arrays: arrays,
                payroll: InitPayroll
            });
        } else {
            res.json({
                AllIDs: [],
                arrays: [],
                payroll: {
                    payrollReport: {
                        employeeReports: []
                    }
                }
            });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getSelectionData = async (req, res) => {
    try {
        const fileID = req.params.fileID;

        const InitArrays = await TimeReport.findAll({
            where: {
                fileID: fileID
            },
            attributes: ['date', 'hours_worked', 'employee_id', 'job_group'],
        });
        let arrays = [];
        InitArrays.map((item) => {
            let element_array = {
                date: item.date,
                hours_worked: item.hours_worked,
                employee_id: item.employee_id,
                job_group: item.job_group
            };
            arrays.push(element_array);
        })
        // console.log(InitArrays);
        const InitPayroll = payrollReport(arrays);
        res.json({
            arrays: arrays,
            payroll: InitPayroll
        });

    } catch (error) {
        res.json({ message: error.message });
    }
}

const payrollReport = (arr) => {
    let report = { "payrollReport": { "employeeReports": [] } };
    let rates = { 'A\r': 20, 'B\r': 30 }; // hourly rates for each job group

    // Grouping the works by employee and pay period
    let workGroups = arr.reduce((acc, work) => {
        let date = new Date(work.date.split("/").reverse().join("-"));
        let periodStart = date.getDate() > 15 ? 16 : 1;
        let periodEnd = date.getDate() > 15 ? new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() : 15;

        let period = {
            "startDate": `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + periodStart).slice(-2)}`,
            "endDate": `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + periodEnd).slice(-2)}`
        };

        let key = `${work[`employee_id`]}-${period.startDate}`;
        if (acc[key])
            acc[key][`hours_worked`] += parseInt(work[`hours_worked`]);
        else
            acc[key] = { ...work, ...period };
        return acc;
    }, {});

    // Converting works object to array and calculating the amount paid
    for (let key in workGroups) {
        let work = workGroups[key];

        let pay = work[`hours_worked`] * rates[work[`job_group`]];
        report.payrollReport.employeeReports.push({
            "employeeId": String(work[`employee_id`]),
            "payPeriod": {
                "startDate": work.startDate,
                "endDate": work.endDate
            },
            "amountPaid": `$${pay.toFixed(2)}`
        });
    }

    // Sorting by employee id then by date

    report.payrollReport.employeeReports.sort((a, b) => a.employeeId != b.employeeId ? a.employeeId - b.employeeId : new Date(a.payPeriod.startDate) - new Date(b.payPeriod.startDate));

    return report;
}
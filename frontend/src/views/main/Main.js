import React, { useState, useEffect } from "react";
import {
    Button,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import NotificationModal from '../IndexSections/Notification';
import '../../assets/css/global.css';

const Main = () => {
    const [uploadOK, setUploadOK] = useState(false);
    const [invalidModal, setInvalidModal] = useState(false);
    const [selectFile, setSelectFile] = useState(false);
    const [fileModal, setFileModal] = useState(false);
    const [uploadedModal, setUploadedModal] = useState(false);
    const [array, setArray] = useState([]);
    const [IDs, setIDs] = useState([]);
    const [fileID, setFileID] = useState('');
    const [uploadEnable, setUploadEnable] = useState(true);
    const fileReader = new FileReader();
    const [viewstatus, setViewStatus] = useState(1);
    const [payroll, setPayroll] = useState({
        payrollReport: {
            employeeReports: []
        }
    });

    useEffect(() => {
        if (fileModal) {
            const timer = setTimeout(() => {
                setFileModal(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [fileModal]);

    useEffect(() => {
        if (uploadedModal) {
            const timer = setTimeout(() => {
                setUploadedModal(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [uploadedModal]);

    useEffect(() => {
        if (uploadOK) {
            const timer = setTimeout(() => {
                setUploadOK(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [uploadOK]);

    const handleOnChange = async (e) => {
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            const regex = /^time-report-(\d+)\.csv$/;

            if (!regex.test(fileName)) {
                setInvalidModal(true);
            } else {
                const match = fileName.match(regex);
                const number = match[1];
                console.log('http://localhost:5000/wave/isExist/' + number);
                const response = await axios.get('http://localhost:5000/wave/isExist/' + number);
                if (!response.data.isExist) {
                    setFileID(number);
                    
                    if (e.target.files[0]) {
                        fileReader.onload = function (event) {
                            const text = event.target.result;
                            csvFileToArray(text);
                        };
                        fileReader.readAsText(e.target.files[0]);
                    }
                    setUploadEnable(true);
                } else {
                    setUploadedModal(true);
                }
                setInvalidModal(false);
                setSelectFile(true);
            }
        }
    };

    const handleShowVisible = async (visiblestatus) => {
        setViewStatus(visiblestatus);
        if (visiblestatus === 2) {
            const response = await axios.post('http://localhost:5000/wave/getAllIDs');
            
            setIDs(response.data.AllIDs);
            setArray(response.data.arrays);
            setPayroll(response.data.payroll);
            setFileID('');
        } else {
            setArray([]);
            setPayroll({
                payrollReport: {
                    employeeReports: []
                }
            });
            setFileID('');
        }
    }

    const csvFileToArray = async string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                if (header === "hours worked") {
                    object["hours_worked"] = parseInt(values[index]);
                } else if (header === "employee id") {
                    object["employee_id"] = values[index];
                } else if (header === "job group\r") {
                    object["job_group"] = values[index];
                } else {
                    object[header] = values[index];
                }
                return object;
            }, {});
            return obj;
        });
        array.pop();
        const response = await axios.post('http://localhost:5000/wave/getEditedData', {
            array: array
        });
        setPayroll(response.data);
        setArray(array);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!selectFile) {
            setFileModal(true);
        } else {
            await axios.post('http://localhost:5000/wave/createTimeReport', {
                fileID: fileID,
                time_reports: array
            });
            setUploadEnable(false);
            setFileModal(false);
            setUploadOK(true);
        }
    };

    const handleSelectChange = async (e) => {
        e.preventDefault();
        const response = await axios.get('http://localhost:5000/wave/getSelectionData/' + e.target.value);
        setArray(response.data.arrays);
        setPayroll(response.data.payroll);
    }

    // const headerKeys = Object.keys(Object.assign({}, ...array));
    return (
        <div style={{ textAlign: "center", color: "white", padding: "2%" }}>
            <h1>Wave Coding Challenge</h1>
            <div style={{ paddingBottom: '2%' }}>
                <Nav className="nav-pills-info nav-pills-icons ml-auto" pills>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                "active show": viewstatus === 1,
                            })}
                            onClick={() => handleShowVisible(1)}
                            href="#"
                        >
                            + Add Mode
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                "active show": viewstatus === 2,
                            })}
                            onClick={() => handleShowVisible(2)}
                            href="#"
                        >
                            View Mode
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
            {viewstatus === 1 ?
                <form>
                    <label htmlFor="csvFileInput" className="file-input-label" style={{ marginRight: '3%' }}>
                        <span>Browse files</span>
                    </label>

                    <input
                        id="csvFileInput"
                        type="file"
                        accept=".csv"
                        onChange={handleOnChange}
                        style={{ display: 'none' }}
                    />

                    <Button
                        color="default"
                        type="button"
                        disabled={!uploadEnable}
                        onClick={(e) => handleOnSubmit(e)}>
                        Upload CSV
                    </Button>


                </form>
                :
                <select className="form-control" onChange={(e) => handleSelectChange(e)}>
                    {IDs.map((item, index) => (
                        <option value={item.fileID} style={{color: "black"}}>
                            time-report-{item.fileID}
                        </option>
                    ))}
                </select>
            }
            <br />

            {fileID && <h1>time-report-{fileID}.csv</h1>}


            <div style={{ display: "flex" }}>
                <div className="col-md-6" style={{ padding: "5%" }}>
                    <table style={{ border: '1px solid white', width: "100%" }} >
                        <thead>
                            <tr>
                                <th>date</th>
                                <th>hours worked</th>
                                <th>employee id</th>
                                <th>job group</th>
                            </tr>
                        </thead>

                        <tbody>
                            {array.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.hours_worked}</td>
                                    <td>{item.employee_id}</td>
                                    <td>{item.job_group}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6" style={{ padding: "5%" }}>
                    <table style={{ border: '1px solid white', width: "100%" }}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Employee ID</th>
                                <th>StartDate</th>
                                <th>EndDate</th>
                                <th>Amount Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payroll.payrollReport.employeeReports.map((report, index) => (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{report.employeeId}</td>
                                    <td>{report.payPeriod.startDate}</td>
                                    <td>{report.payPeriod.endDate}</td>
                                    <td>{report.amountPaid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <NotificationModal isOpen={invalidModal} content='Invalid filename format!' />
            <NotificationModal isOpen={fileModal} content='Please select File' />
            <NotificationModal isOpen={uploadedModal} content='File already uploaded' />
            <NotificationModal isOpen={uploadOK} content='File uploaded' />
        </div>
    );
}

export default Main;
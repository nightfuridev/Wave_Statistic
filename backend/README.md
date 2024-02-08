# Wave backend

This Wave Backend project is developed using Express and MySQL server.

## Installation Process

### 1. Install Node.js: 
Ensure that you have Node.js installed on your machine. You can download the latest version from the official [Node.js website](https://nodejs.org). For this backend project, there is no need to special node.js version but according to the Frontend node version, it is better to make sure you have same Node.js version as Frontend.
### 2. Install Xampp and start MySQL server: 
This backend project uses MySQL as database. So you have to install Xampp so that you can start MySQL server. Ensure that you have xampp installed on your machine. You can download the latest version from the official [Xampp website](https://www.apachefriends.org/). Then install xampp. After that, open "xampp-control.exe" file then start Mysql server. Then create the database named "wave_db" and then run the "wave.sql" file in backend project, so that the database will be prepared.
### 3. Open the project directory in the command line: 
Open the command line or terminal and navigate to the root directory of this backend project.
### 4. Install project dependencies: 
Run "npm install" to install the project dependencies listed in the "package.json" file. If you encounter any errors during the installation of the node_modules, you can try "npm install --legacy-peer-deps" or "npm install --force" instead. These commands can help in resolving any issues related to peer dependencies or forcing the installation.
### 5. Start the backend server: 
Once the dependencies are successfully installed, start the development server by running the command "npm start". This command will start the development server and compile your backend project. It will also watch for any changes you make to the source code, automatically rebuild the project, and refresh the browser. After running npm start, the backend server will run in localhost:5000.

## Questions

### How did you test that your implementation was correct?
I've successfully tested my implementation on Windows and MacOS systems, as well as on a Linux Virtual Machine. All functionalities, including uploading CSV files and creating an accurate payroll report, have been executed appropriately.
### If this application was destined for a production environment, what would you add or change?
- Firstly, the current system lacks the ability to display total salary amounts for a specific period. By integrating features such as a date range picker, we can enhance the system to show detailed salary information for any selected period.
- Secondly, the application currently lacks both delete and edit functions. Adding these capabilities would significantly improve user interaction and data management.
### What compromises did you have to make as a result of the time constraints of this challenge?
I almost neglate the frontend visual effects.
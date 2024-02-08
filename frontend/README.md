# Wave Frontend

This Wave Frontend project is developed using [React](https://reactjs.org/), [Reactstrap](https://reactstrap.github.io/) and [create-react-app](https://facebook.github.io/create-react-app/).

## Installation Process

### 1. Install Node.js: 
Ensure that you have Node.js installed on your machine. You can download the latest version from the official [Node.js website](https://nodejs.org). For this React project, make sure you have Node.js version 18.x.x or above.
### 2. Open the project directory in the command line: 
Open the command line or terminal and navigate to the root directory of your React project.
### 3. Install project dependencies: 
Run "npm install" to install the project dependencies listed in the "package.json" file. If you encounter any errors during the installation of the node_modules, you can try "npm install --legacy-peer-deps" or "npm install --force" instead. These commands can help in resolving any issues related to peer dependencies or forcing the installation.
### 4. Start the development server: 
Once the dependencies are successfully installed, start the development server by running the command "npm start". This command will start the development server and compile your React project. It will also watch for any changes you make to the source code, automatically rebuild the project, and refresh the browser.
### 5. Open the application: 
After running npm start, the dev server will provide a local URL (usually http://localhost:3000) where you can access your React application. Open your preferred web browser and visit this URL to view your running React application.

## Questions

### How did you test that your implementation was correct?
I've successfully tested my implementation on Windows and MacOS systems, as well as on a Linux Virtual Machine. All functionalities, including uploading CSV files and creating an accurate payroll report, have been executed appropriately.
### If this application was destined for a production environment, what would you add or change?
- Firstly, the current system lacks the ability to display total salary amounts for a specific period. By integrating features such as a date range picker, we can enhance the system to show detailed salary information for any selected period.
- Secondly, the application currently lacks both delete and edit functions. Adding these capabilities would significantly improve user interaction and data management.
### What compromises did you have to make as a result of the time constraints of this challenge?
I almost neglate the frontend visual effects.
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Create empty array for new members created by the CLI
const groupMembers = [];

// Function to validate name, id, email, & member-specific field to prevent empty strings
const responseValidation = function (input) {
    if (input === "") {
        console.log("This parameter cannot be empty!");
        return false;
    }

    return true;
};

// Function to validate e-mail address (for empty string and faulty address)
const emailValidation = function (email) {
    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  
    if (valid) {
        return true;
    } else if (email === "") {
        console.log("E-mail address cannot be blank. Please fix it!");
        return false;
    } else {
        console.log(": Invalid e-mail address. Please fix it!");
        return false;
    }
};

// Initial function from which the user will choose which employee type to create
function employeeQuestion() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee are you going to input?",
            name: "name",
            choices: ["Intern", "Manager", "Engineer", "Create Webpage"]
        },
    ]).then(role => {
        if (role.name === "Intern") {
            internQuestions();
        } else if (role.name === "Manager") {
            managerQuestions();
        } else if (role.name === "Engineer") {
            engineerQuestions();
        } else if (role.name === "Create Webpage") {
            createWebpage(outputPath, render(groupMembers));
        };
    });
};

// Function housing prompts for interns
function internQuestions() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "name",
            validate: responseValidation
        },
        {
            type: "input",
            message: "What is the intern's ID?",
            name: "id",
            validate: responseValidation
        },
        {
            type: "input",
            message: "What is the intern's company e-mail?",
            name: "email",
            validate: emailValidation
        },
        {
            type: "input",
            message: "What is the intern's school?",
            name: "school",
            validate: responseValidation
        }
    ]).then(answers => {
        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        groupMembers.push(intern);

        employeeQuestion();
    });
};

// Function housing prompts for manager
function managerQuestions() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "name",
            validate: responseValidation
        },
        {
            type: "input",
            message: "What is the manager's ID?",
            name: "id",
            validate: responseValidation
        },
        {
            type: "input",
            message: "What is the manager's company e-mail?",
            name: "email",
            validate: emailValidation
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "officeNumber",
            validate: responseValidation
        }
    ]).then(answers => {
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        groupMembers.push(manager);

        employeeQuestion();
    });
};

// Function housing prompts for engineers
function engineerQuestions() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "name",
            validate: responseValidation
        },
        {
            type: "input",
            message: "What is the engineer's ID?",
            name: "id",
            validate: responseValidation
        },
        {
            type: "input",
            message: "What is the engineer's company e-mail?",
            name: "email",
            validate: emailValidation
        },
        {
            type: "input",
            message: "What is the engineer's GitHub?",
            name: "github",
            validate: responseValidation
        }
    ]).then(answers => {
        let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        groupMembers.push(engineer);

        employeeQuestion();
    });
};

// Function used to create the team.html
function createWebpage(fileName, data) {
    fs.writeFile(fileName, data, "utf8", err => {
        if (err) throw err;

        console.log("Your file has been created.");
    });
};

// Call function to itialize CLI program
employeeQuestion();
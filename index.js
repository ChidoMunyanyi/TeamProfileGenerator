const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// create intern and manager functions in similiar structure to engineer function
//create add new member function that runs an inquirer prompt with a list of choices(Manager,Engineer and so on and none option)
// manager function to be called to start first

let employeeArray = []

function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: 'What is the name of the engineer',
            name: 'EngineerName',
        },
        {
            type: "input",
            message: 'What is the engineer id',
            name: 'EngineerId',
        },
        {
            type: 'input',
            message: 'what is engineer email',
            name: 'EngineerEmail',
        },
        {
            type: "input",
            message: 'what is engineer github',
            name: 'EngineerGithub',
        },
    
    ])
    .then(answers=>{
        const newInstance = new Engineer(answers.EngineerName, answers.EngineerId, answers.EngineerEmail, answers.EngineerGithub)
        employeeArray.push(newInstance)
        console.log(employeeArray)
       addMember()
    })
}

function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: 'What is the name of the intern?',
            name: 'InternName',
        },
        {
            type: "input",
            message: 'What is the id for intern',
            name: 'InternId',
        },
        {
            type: 'input',
            message: 'What is intern email?',
            name: 'InternEmail',
        },
        {
            type: "input",
            message: 'What school does intern go?',
            name: 'InternSchool',
        },
    
    ])
    .then(answers=>{
        const newInstance = new Intern(answers.InternName, answers.InternId, answers.InternEmail, answers.InternSchool)
        employeeArray.push(newInstance)
        console.log(employeeArray)
       addMember()
    })
}

function createManager() {
    inquirer.prompt([
        {
            type: "input",
            message: 'What is the name of the manager?',
            name: 'ManagerName',
        },
        {
            type: "input",
            message: 'What is the manager id?',
            name: 'ManagerId',
        },
        {
            type: 'input',
            message: 'What is manager email?',
            name: 'ManagerEmail',
        },
        {
            type: "input",
            message: 'Provide office number',
            name: 'OfficeNumber',
        },
    
    ])
    .then(answers=>{
        const newInstance = new Manager(answers.ManagerName, answers.ManagerId, answers.ManagerEmail, answers.OfficeNumber)
        employeeArray.push(newInstance)
        console.log(employeeArray)
       addMember()
    })
}

function addMember() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'what type of team member would you like to add',
            name:'NewTeamMember',
            choices: ['Engineer', 'Intern', 'Manager', 'None']
        }

    ]).then(answers=> {
        if(answers.NewTeamMember==='Engineer') {
            createEngineer()
        }
        else if(answers.NewTeamMember==='Intern') {
            createIntern()
        }
        else if(answers.NewTeamMember==='Manager') {
            createManager()
        }
        else{
            fs.writeFileSync(outputPath, render(employeeArray))
        }
    })

}
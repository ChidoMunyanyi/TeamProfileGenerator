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
        // else if for Manager and Intern
        else{
            fs.writeFileSync(outputPath, render(employeeArray))
        }
    })

}
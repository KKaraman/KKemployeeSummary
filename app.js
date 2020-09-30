const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const employeearray = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function employee() {
    //ask name
    //id
    //email
    //occupation
    //return data
    inquirer.prompt([
        {
            type: "input",
            name: `name`,
            message: `what is your name`,
            validate: function (answer) {
                if (answer === "") {
                  return 'You must type something!';
                }
        
                return true;
              }
        },
        {
            type: "input",
            name: `id`,
            message: `what is your id`,
            validate: function (answer) {
                if (answer === "") {
                  return 'You must type something!';
                }
        
                return true;
              }
        },
        {
            type: "input",
            name: `email`,
            message: `what is your email`,
            validate: function (answer) {
                if (answer === "") {
                  return 'You must type something!';
                }
        
                return true;
              }
        },
        {
            type: "list",
            name: `role`,
            choices: ["Engineer", "Intern", "Manager"],
            message: `what is your role`,
        },
    ]).then(function (data) {
        if (data.role === "Manager") {
            manager(data);
        }
        if (data.role === "Intern") {
            intern(data);
        }
        if (data.role === "Engineer") {
            engineer(data);
        }
    });
}

function manager(answers) {
    inquirer.prompt([
        {
            type: "input",
            name: `officeNum`,
            message: `what is your office number`,
            validate: function (answer) {
                if (answer === "") {
                  return 'You must type something!';
                }
        
                return true;
              }
        },
        {
            type: "confirm",
            name: `isDone`,
            message: `Are you done adding people?`,
        },
    ])
        .then(function (data) {
            if (data.isDone) {
                console.log("Team is complete! Generate file.");
                //if they are done
                const newPerson = new Manager(answers.name, answers.id, answers.email, data.officeNum);
                 //push into employeearray
                employeearray.push(newPerson);
                console.log(employeearray);

                //call render fx pasing employeearray
                const file = render(employeearray);

                //write the html page (fs.writeFile)
                fs.writeFile(outputPath, file, function (err) 
                {
                    if (err) {
                        return console.log("There was a problem generating the output file");
                    }
                    console.log("Success generating the output file!");
                });       
            }
            if(!data.isDone){
                console.log(`The user has more employees to add`);
                const newPerson = new Manager(answers.name, answers.id, answers.email, data.officeNum);
                 //push into employeearray
                employeearray.push(newPerson);
                console.log(employeearray);
                employee();
            }
        })
}

function intern(answers) {
    inquirer.prompt([
        {
            type: "input",
            name: `school`,
            message: `Which school are you attending?`,
            validate: function (answer) {
                if (answer === "") {
                  return 'You must type something!';
                }
        
                return true;
              }
        },
        {
            type: "confirm",
            name: `isDone`,
            message: `Are you done adding people?`,
        },
    ])
        .then(function (data) {
            if (data.isDone) {
                console.log("Team is complete! Generate file.");
                //if they are done
                const newPerson = new Intern(answers.name, answers.id, answers.email, data.school);
                 //push into employeearray
                employeearray.push(newPerson);
                console.log(employeearray);

                //call render fx pasing employeearray
                const file = render(employeearray);

                //write the html page (fs.writeFile)
                fs.writeFile(outputPath, file, function (err) 
                {
                    if (err) {
                        return console.log("There was a problem generating the output file");
                    }
                    console.log("Success generating the output file!");
                });       
            }
            if(!data.isDone){
                console.log(`The user has more employees to add`);
                const newPerson = new Intern(answers.name, answers.id, answers.email, data.school);
                 //push into employeearray
                employeearray.push(newPerson);
                console.log(employeearray);
                employee();
            }
        })
}
function engineer(answers) {
    inquirer.prompt([
        {
            type: "input",
            name: `github`,
            message: `What is your github ID?`,
            validate: function (answer) {
                if (answer === "") {
                  return 'You must type something!';
                }
        
                return true;
              }
        },
        {
            type: "confirm",
            name: `isDone`,
            message: `Are you done adding people?`,
        },
    ])
        .then(function (data) {
            if (data.isDone) {
                console.log("Team is complete! Generate file.");
                //if they are done
                const newPerson = new Engineer(answers.name, answers.id, answers.email, data.github);
                 //push into employeearray
                employeearray.push(newPerson);
                console.log(employeearray);

                //call render fx pasing employeearray
                const file = render(employeearray);

                //write the html page (fs.writeFile)
                fs.writeFile(outputPath, file, function (err) 
                {
                    if (err) {
                        return console.log("There was a problem generating the output file");
                    }
                    console.log("Success generating the output file!");
                });       
            }
            if(!data.isDone){
                console.log(`The user has more employees to add`);
                const newPerson = new Engineer(answers.name, answers.id, answers.email, data.github);
                 //push into employeearray
                employeearray.push(newPerson);
                console.log(employeearray);
                employee();
            }
        })
}

employee();





// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ``

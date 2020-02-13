const mysql = require("mysql")
const inquirer = require("inquirer")
const path = require("path")

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee"
})

db.connect((err,_)=>{
    if(err) throw err;
    console.log("Welcome!")
    console.log("Register Industries Employee Database")
    console.log("-----------------------")
    
    inquirer.prompt([{
	message: "What would you like to do?",
	type: "list",
	name: "actionChoice",
	choices: [
		"Add an Employee",
		"View ALL Employees"
		]}])
.then(answer=>{
	switch(answer.actionChoice){
		case "Add an Employee":
			addEmployee();
			break;
		default:
			allEmployees();
    }})
.catch(err=>{
    throw err;
})})


const allEmployees = () => {
	db.query("SELECT * FROM employees")
		}


const addEmployee = () => {

	inquirer.prompt([{
		message: "What is the employee's first name?",
		name: "first",
		validate: answer=>{
			if (answer!==""){
				return true;
            } return "Please enter a first name for the employee"
				
		}},{
		message: "What is the employee's last name?",
		name: "last",
		validate: answer=>{
			if (answer!==""){
				return true;
            } return "Please enter a last name for the employee"
				
		}},{
		message: "Please enter the employee's role",
		name: "role",
		validate: answer=>{
			if (answer!==""){
				return true;
            } return "Please enter a role"
				
		}}])
	.then(answers=>{

		const employee = db.query("INSERT INTO employees (first_name,last_name,role) VALUES ("+answers.first,answers.last,answers.role+")")
		if (!employee){
			console.log("Failed to add employee!")
		};
			console.log("Employee successfully added!")
	})};

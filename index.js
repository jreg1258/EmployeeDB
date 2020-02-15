const mysql = require("mysql")
const inquirer = require("inquirer")
const path = require("path")

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
})

db.connect((err,_)=>{
    if(err) throw err;
    console.log("Welcome!")
    console.log("Register Industries Employee Database")
    console.log("-----------------------")
    appStart()
})

const appStart = ()=>{
    inquirer.prompt([{
        message: "What would you like to do?",
        type: "list",
        name: "actionChoice",
        choices: [
            "Add an Employee",
            "Add a Department",
            "Add Role",
            "View ALL Departments",
            "View ALL Roles",
            "View ALL Employees",
            ]}])
    .then(answer=>{
        switch(answer.actionChoice){
            case "Add an Employee":
                addEmployee();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "View ALL Departments":
                allDepartments();
                break;
            case "View ALL Roles":
                allRoles();
                break;
            default:
                allEmployees();
        }})
    .catch(err=>{
        throw err;
})}


const allEmployees = () => {
	db.query("SELECT * FROM ??",["employees"],(err,res)=>{
        if (err) throw err
        console.table(res)
        appStart()
    })}
const allDepartments = () => {
    db.query("SELECT * FROM ??",["department"],(err,res)=>{
        if (err) throw err
        console.table(res)
        appStart()
    })}
const allRoles = () => {
    db.query("SELECT * FROM ??",["role"],(err,res)=>{
        if (err) throw err
        console.table(res)
        appStart()
    })}

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
		message: "Please choose the employees role",
        name: "role",
        type: "list",
        choices: [
            "Human Resources Rep.",
            "Marketing Consultant.",
            "R&D Scientist.",
            "Public Relations Rep.",
            "Engineer."
        ]},{
        message: "Do you have a manager?",
        name: "manager",
        type: "list",
        choices: [
            "Yes",
            "No"
        ]}])
	.then(answers=>{
        let roleID
        let managerID 
        switch(answers.role){
            case "Human Resources Rep.":
                roleID = 1;
                managerID = 1;
                break;
            case "Marketing Consultant.":
                roleID = 2;
                managerID = 2;
                break;
            case "R&D Scientist.":
                roleID = 3;
                managerID = 3;
                break;
            case "Public Relations Rep.":
                roleID = 4;
                managerID = 4;
                break;
            default:
                roleID = 5;
                managerID = 5;

        }
		db.query("INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)", [answers.first,answers.last,roleID,managerID],(err,res)=>{
            if (err) throw err
        })
       db.query("SELECT * FROM ??", ["employees"],(err,res)=>{
           if (err) throw err
           console.table(res)
       })
       appStart() 
    })
    .catch(err=>{
        throw err;
    })};

const addRole = () => {

    inquirer.prompt([{
        message: "What is the title of the role?",
        name: "role",
        validate: answer=>{
            if (answer!==""){
                return true;
            } return "Please enter a role name"
                
        }},{
        message: "What is the yearly salary?",
        name: "salary",
        validate: answer=>{
            if (answer.match(/[0-9]{5}/g)){
                return true;
            } return "Please return a valid 5-digit salary."
                
        }},{
        message: "What department is this role in?",
        name: "department",
        type: "list",
        choices: [
            "Human Resources",
            "Marketing",
            "Research and Development",
            "Public Relations",
            "Engineering",
            "Other"
        ]}])
    .then(answers=>{
        let deptID
        switch(answers.department){
            case "Human Resources":
                deptID = 1;
                break;
            case "Marketing":
                deptID = 2;
                break;
            case "Research and Development":
                deptID = 3;
                break;
            case "Public Relations":
                deptID = 4;
                break;
            case "Engineering":
                deptID = 5;
        }
        db.query("INSERT INTO role (title,salary,dept_id) VALUES (?,?,?)", [answers.title,answers.salary,deptID],(err,res)=>{
            if (err) throw err
        })
        db.query("SELECT * FROM ??", ["role"],(err,res)=>{
            if (err) throw err
            console.table(res)
        })
        appStart() 
    })
    .catch(err=>{
        throw err;
    })};

const addDepartment = () => {

    inquirer.prompt([{
        message: "What is the name of the department?",
        name: "dept",
        validate: answer=>{
            if (answer!==""){
                return true;
            } return "Please enter a department name"
                
        }}])
    .then(answer=>{
        const dept = answer.dept.charAt(0).toUpperCase()+answer.dept.slice(1)
        
        db.query("INSERT INTO department (department) VALUES (?)", [dept],(err,res)=>{
            if (err) throw err
        })
        db.query("SELECT * FROM ??", ["department"],(err,res)=>{
            if (err) throw err
            console.table(res)
        })
        appStart() 
    })
    .catch(err=>{
        throw err;
    })};
        
USE employee_db;

INSERT INTO department(department) VALUES ("Human Resources"),("Marketing"),("Research and Development"),("Public Relations"),("Engineering");


INSERT INTO role(title,salary, dept_id) VALUES ("Human Resources Rep.",40000.00, "1");
INSERT INTO role(title,salary, dept_id) VALUES ("Marketing Consultant.",45000.00, "2");
INSERT INTO role(title,salary, dept_id) VALUES ("R&D Scientist.",70000.00, "3");
INSERT INTO role(title,salary, dept_id) VALUES ("Public Relations Rep.",40000.00, "4");
INSERT INTO role(title,salary, dept_id) VALUES ("Engineer",60000.00, "5");

INSERT INTO employees(first_name,last_name,role_id,manager_id) VALUES ("Joey","Register",3,1),("Maya","Curtis",4,2),("Leon","Bridges",1,2)
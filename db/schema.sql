
USE employee_db;

CREATE TABLE department (
    id integer not null auto_increment,
    department varchar(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id integer not null auto_increment,
    title varchar(30),
    salary decimal,
    dept_id integer,
    PRIMARY KEY(id),
    FOREIGN KEY(dept_id) REFERENCES department(id)
);

CREATE TABLE employees (
    id integer not null auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id integer,
    manager_id integer,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES role(id)
);


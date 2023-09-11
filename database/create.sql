DROP TABLE State;
DROP TABLE Request;
DROP TABLE Accepted;
DROP TABLE Comment;
DROP TABLE Job;
DROP TABLE Account;

CREATE TABLE State (
       current_s VARCHAR(20)
);

CREATE TABLE Account (
       username VARCHAR(50) UNIQUE,
       password VARCHAR(20),
       role VARCHAR(10),
       id CHAR(8) UNIQUE,
       name VARCHAR(50),
       CONSTRAINT pk_account_username PRIMARY KEY (username, id)
);

CREATE TABLE Job (
       job_id CHAR(8) UNIQUE,
       job_name VARCHAR(20),
       company_id CHAR(8),
       description VARCHAR(200),
       number INT,
       CONSTRAINT pk_job PRIMARY KEY (job_id),
       CONSTRAINT fk_job_company FOREIGN KEY (company_id) REFERENCES Account(id)

);

CREATE TABLE Request (
       job_id CHAR(8),
       student_id CHAR(8),
       state VARCHAR(20),
       CV_link VARCHAR(40),
       CONSTRAINT pk_request PRIMARY KEY (job_id,student_id),
       CONSTRAINT fk_request_job FOREIGN KEY (job_id) REFERENCES job(job_id),
       CONSTRAINT fk_request_student FOREIGN KEY (student_id) REFERENCES Account(id)

);

CREATE TABLE Accepted (
       job_id CHAR(8),
       student_id CHAR(8),
       company_id CHAR(8),
       score FLOAT,
       state VARCHAR(20),
       report_link VARCHAR(40),
       CONSTRAINT pk_accepted PRIMARY KEY (job_id,student_id,company_id),
       CONSTRAINT fk_accepted_job FOREIGN KEY (job_id) REFERENCES job(job_id),
       CONSTRAINT fk_accepted_student FOREIGN KEY (student_id) REFERENCES Account(id),
       CONSTRAINT fk_accepted_company FOREIGN KEY (company_id) REFERENCES Account(id)
);

CREATE TABLE Comment (
       student_id CHAR(8),
       company_id CHAR(8),
       time DATE,
	comment VARCHAR(100),
	CONSTRAINT pk_comment PRIMARY KEY (student_id,company_id,time),
       CONSTRAINT fk_comment_student FOREIGN KEY (student_id) REFERENCES Account(id),
       CONSTRAINT fk_comment_company FOREIGN KEY (company_id) REFERENCES Account(id)
);
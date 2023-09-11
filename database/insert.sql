INSERT INTO State
       (current_s)
       VALUES
       ('Company add jobs');

INSERT INTO Account
       (username, password, role, id, name)
       VALUES
       ('admin', '123', 'ADMIN','1', null),
       ('student1', '123', 'Student', 'S123456', 'Nguyen Van N'),
       ('student2', '123', 'Student', 'S123457', 'Nguyen Thi M'),
       ('student3', '123', 'Student', 'S123458', 'Nguyen Minh P'),
       ('company1', '123', 'Company', 'C100001', 'CTY A'),
       ('company2', '123', 'Company', 'C100002', 'CTY B');

INSERT INTO Job
       (job_id, job_name, company_id, description, number)
       VALUES
       ('J100', 'PHP developer', 'C100001','Work with our Agile team to development Internet Advertising system.
       Analyze requirements, programming and perform testing based on design.
       Resolves technical issues through debugging, research and investigation.',1),
       ('J101', 'Java developer', 'C100001','Work with our Agile team to development Internet Advertising system.
       Analyze requirements, programming and perform testing based on design.
       Resolves technical issues through debugging, research and investigation.',2),
       ('J102', 'Devops Engineer', 'C100001','100% work on the major cloud platforms – Google Cloud Platform (GCP) or Amazon Web Services (AWS).
       Support automating infrastructure provisioning on new project.
       Support deploying, configuring, monitoring, managing product environment.
       Co-operate with Japanese developers to to understand and support developing solutions for a better system',2),
       ('J103', 'Data Engineer', 'C100002','Learn to acquire technology and develop products for Vietnam and Southeast Asia.
       Get skills training to meet work requirements.
       Participate in optimal performance for SQL queries on large amounts of data (HiveSQL).
       Provide performance improvement ideas, cost optimization for the entire system.
       Handling medium to difficult requirements in the project.',2),
       ('J104', 'Java Web Developer', 'C100002','Bring data, implement bidding to about 50 media including Google, Yahoo, etc. via API: Google (GKT, GDN), Yahoo (YDN, YSS), etc.
       Download report (3TB big data) from media API (SOAP, REST) daily, hourly and save to Data Warehouse.
       From the big data above, calculate and compute reports (statistics, predictions) for advertisers and directly to customers.
       Based on the client’s budget, create alerts if the prediction does not achieve the required KPI.',2);

INSERT INTO Request
       (job_id, student_id, state, CV_link)
       VALUES
       ('J101', 'S123456','WAITING','http:linkreport1'),
       ('J101', 'S123457','REJECTED','http:linkreport2'),
       ('J101', 'S123458','ACCEPTED','http:linkreport3'),
       ('J102', 'S123456','REJECTED','http:linkreport4'),
       ('J102', 'S123458','WAITING','http:linkreport5'),
       ('J103', 'S123457','ACCEPTED','http:linkreport6'),
       ('J104', 'S123456','ACCEPTED','http:linkreport1');

INSERT INTO Accepted
       (job_id, student_id, company_id, score, state, report_link)
       VALUES
       ('J101', 'S123458','C100001',null,'NOT SCORED',null),
       ('J103', 'S123457','C100002',9,'SCORED','http:linkreport'),
       ('J104', 'S123456','C100002',null,'NOT SCORED',null);

INSERT INTO Comment
       (student_id, company_id, time, comment)
       VALUES
       ('S123458', 'C100001','2023-03-05','10 minutes late for work'),
       ('S123458', 'C100001','2023-03-19','Come to work on time, good attitude at work'),
       ('S123458', 'C100001','2023-03-26','Finish task on time'),
       ('S123458', 'C100001','2023-04-02','Eager to learn, work with high productivity'),
       ('S123458', 'C100001','2023-04-09','Get along with colleagues in the company, Complete successfully job'),
       ('S123456', 'C100002','2023-03-05','Come to work on time to receive the job'),
       ('S123456', 'C100002','2023-03-19','Actively learn about unknowns about work');
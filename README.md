# face_finder_backend
npm packages:
 "bcrypt-nodejs"
 "body-parser"
 "clarifai"
 "cors"
 "express"
 "mysql"
 "nodemon"

Create an accout at:
https://www.clarifai.com/
to access the api.

create SQL tables:

create table user
(id int,
name varchar(50), 
email varchar(30),
password varchar(50))

create table login
(hash varchar(100),
email varchar(30))

face_finder_backend/server.js 
Enter mysql database connection information

    host     : 'localhost',
    user     : 'DATABASE USERNAME',
    password : 'DATABASE PASSWORD',
    database : 'DATABASE NAME'
[![Coverage Status](https://coveralls.io/repos/github/Oluwafayokemi/Maintenance-Tracker-App/badge.svg?branch=sort-travis)](https://coveralls.io/github/Oluwafayokemi/Maintenance-Tracker-App?branch=sort-travis)
[![Build Status](https://travis-ci.org/Oluwafayokemi/Maintenance-Tracker-App.svg?branch=develop)](https://travis-ci.org/Oluwafayokemi/Maintenance-Tracker-App)

# Maintenance-Tracker-App
Maintenance Tracker App is an application that provides users with the ability to reach out to
operations or repairs department regarding repair or maintenance requests and monitor the
status of their request.

### Required Features
1. Users can create an account and log in.
2. The users should be able to make maintenance or repairs request.
3. An admin should be able to approve/reject a repair/maintenance request.
4. The admin should be able to mark request as resolved once it is done.
5. The admin should be able to view all maintenance/repairs requests on the application
6. The admin should be able to filter requests
7. The user can view all his/her request

### Why this App is useful?
Enables an Admin to easily manage the maintenance/repairs of all facilities in his company

### Get Started
$ git clone https://github.com/Oluwafayokemi/Maintenance-Tracker-App.git

### Set up Guide
- cd into the newly cloned folder
- on your terminal run
```
npm install 
```
To install all packages
```
npm start/start:dev 
```
On your browser navigate to localhost:3000
* You should do this *
- Hooray! your server is running!

* To test your endpoints * run
```
npm test
 ```
### For Api Documentation
API Routes Endpoints
For Requests
- POST '/api/v1/auth/signup' Sign up as a new user
- POST '/api/v1/auth/login' Login as an existing user
- POST '/api/v1/users/requests' Create a request
- GET '/api/v1/users/requests' Fetch all the requests of a logged in user
- GET '/api/v1/users/requests/<requestId>'  Fetch a request that belongs to a logged in user
- PUT '/api/v1/users/requests/<requestId>' Modify a request
- GET '/api/v1/requests' Gets all request on the database
- PUT '/api/v1/request/<requestId>/approve' onClick sets a request as approved
- PUT '/api/v1/request/<requestId>/dissaprove' onClick sets a request to dissaproved
- PUT 'api/v1/request/<requestId>/resolve' onClick sets a request to resolved


# trip-wiz-backend


# login

Api-end-point : http://localhost:3000/authenticate/login

paramters-body : 

                 {
                    "username": "email",
                    "password": "password"
                 }

response : 

          200 OK -> {
                        "uid": "uid",
                        "expiration": "expiration date",
                        "message": "Authentication successful"
                    }
          401 Unauthorized -> {
                                  "message": "Incorrect Password : error verifying the user identity > incorrrect password for the username ${username}"
                              }
          401 Unauthorized -> {
                                   "message": "Incorrect Username : error verifying the user identity > username not found or the username contains errornous characters"
                              }
          401 Unauthorized -> {
                                   "message": 'Authentication failed : error logging in user > useraccount has been disabled'
                              }



# signup

Api-end-point : http://localhost:3000/authenticate/signup


paramters-body : 

                {
                    "username": "email",
                    "password": "password"
                    "displayName" : "Firstname Lastname",
                    "dateOfBirth" : "dd/mm/yyyy"
                 }


response : 

          200 OK -> {
                        "uid": "uid",
                        "message": "Authentication successful"
                    }
          400 Bad Request ->  {
                                  "message": "Authentication failed : error creating the user > ",
                                  "error": "The email address is already in use by another account."
                              }
          401 Unauthorized -> {
                                  "message": "Invalid Username : error parsing the data
                              }
    

# logout


Api-end-point : http://localhost:3000/authenticate/logout

paramters-body : 

                 {
                    "uid": "uid",
                 }

response : 

          200 OK -> {
                        "message": "Logout success"
                    }
          401 Unauthorized -> {
                                  "message": "Invalid Session : error parsing the session > no active session found "
                              }
          400 Unauthorized -> {
                                   "message": "Bad Request : Try Again , error "
                              }



# trip

Api-end-point : http://localhost:3000/trip

paramters-body : 

                 {
                    "uid" : "uid",
                    "destination" : "destination",
                    "startDate" : "dd/mm/yyyy",
                    "endDate" : "dd/mm/yyyy",
                    "placesToVisit" : "number",
                    "tripType" : "trip_type",
                    "numberOfDays" : "number"
                 }

response : 

          200 OK -> {
                        "message": "trip details"
                        // see example_trip_details.json for more information
                    }
          401 Unauthorized -> {
                                  "message": "Invalid Session : error parsing the session > no active session found "
                              }
          400 Unauthorized -> {
                                   "message": "Bad Request : Try Again , error "
                              }
          500 Unauthorized -> {
                                   "message": "Bad Request : Internal server error , error "
                              }
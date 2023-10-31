# trip-wiz-backend


# login

Api-end-point : http://localhost:3000/auth/authenticate/login

paramters-body : 

                 {
                    "username": "email",
                    "password": "password"
                 }

response : 

          200 OK -> {
                        "uid": "uid",
                        "expiration": 259200000,
                        "message": "Authentication successful"
                    }
          401 Unauthorized -> {
                                  "message": "Incorrect Password : error verifying the user identity > incorrrect password for the username ${username}"
                              }
          401 Unauthorized -> {
                                   "message": "Incorrect Username : error verifying the user identity > username not found or the username contains errornous characters"
                              }
          // Under Development
          401 Unauthorized -> {
                                   "message": 'Authentication failed : error logging in user > useraccount has been disabled'
                              }



# signup

Api-end-point : http://localhost:3000/auth/authenticate


paramters-body : 

                {
                    "username": "email",
                    "password": "password"
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
                                  "message": "Invalid Username : error parsing the email > email cannot contain any special characters other than . (dot)"
                              }
    

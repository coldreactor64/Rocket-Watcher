
/**
 * @const signupSuccess - Returns if signup is successful
 */
export const signupSuccess = 
{
  "data":{
    createAccount: true
  }
}

export const signupError = {"data":{"createAccount":null},"errors":[{"message":"A user already has this email address.","locations":[{"line":3,"column":13}],"path":["createAccount"]}]}



export const generalSuccess = {
  "success": true
}

export const generalFailure = {
  "success": false
}


/**
 * @const loginSuccess - Returns if logging in is successful
 */
export const loginSuccess = {
    "success": true
}

export const loginError = {
    "success": false,
    "message": "Password required"
}

/**
 * @const authSuccess --Return when authentication is successful
 */
export const authSuccess = 
  { 
      "data": {
        "authenticated": true,
        "me": {
          "user": {
            "name": "Jeremy",
            "username": "404",
            "photo": "http://wave.ac"
          },
          "emailConfirmed": false
        }
      }
  }

export const authFailure = {
  "data":{
    "authenticated":false,
    "me":null
  }
}


export const loginState =  {
    username: "testusername",
    displayName: "testname",
    password: "testpassword",
    email:"testemail@gmail.com"
}


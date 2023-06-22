# Pet-Server

# User Authentication
## You will need to set up a .env file in the root of this directory with the following variables
- DATABASE_URL
- SECRET
```
DATABASE_URL=mongodb://localhost/pet-server
SECRET=literallyanything
```

## Sign-Up
- POST
- http://localhost:3001/api/users
- Expects user object below in the body
```
{
        "userName": "greg",
        "password": "bbbb"
}
```
- returns jsonwebtoken



## Log-In:
- POST
- http://localhost:3001/api/users/login
- Expects user object below in the body
```
{
        "userName": "greg",
        "password": "bbbb"
}
```
- returns jsonwebtoken



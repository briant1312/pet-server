# Pet-Server

# User Authentication
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



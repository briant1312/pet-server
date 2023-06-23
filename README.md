# Pet-Server
## Current BaseUrl
> http://localhost:3001/api/

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
- BaseUrl + users
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
- BaseUrl + users/login
- Expects user object below in the body
```
{
        "userName": "greg",
        "password": "bbbb"
}
```
- returns jsonwebtoken

# Posts

## Create
- POST
- BaseUrl + post
- Expects post in body as below
```
{
        "title": "Post Title",
        "text": "Post text"
}
```
- returns newly created post

## Index
- GET
- BaseUrl + post
- Nothing is expected on this route
- returns all posts

## Show
- GET
- BaseUrl + post/:id
- Nothing is expected on this route
- returns post matching the id in the query parameter

## Update
- PATCH
- BaseUrl + post/:id
- Expects updated post in body as below
```
{
        "title": "Post Title",
        "text": "Post text"
}
```
- returns updated post

## Delete
- DELETE
- BaseUrl + post/:id
- Nothing is expected on this route
- returns status code 204 on delete success

# Comments

## Create
- POST
- BaseUrl + /comment/:postId
- Expects post in body as below
```
{
        "text": "comment of text" 
}
```
- returns comment

## Update
- PATCH
- BaseUrl + /comment/:commentId
- Expects updated post in body as below
```
        "text": "comment of text" 
```

## Delete
- DELETE
- BaseUlr + /comment/:commentId
- Nothing is expected on this route
- Returns all comments on original post 

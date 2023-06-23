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
- Returns jsonwebtoken



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
- Returns jsonwebtoken

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
- Returns newly created post

## Index
- GET
- BaseUrl + post
- Nothing is expected on this route
- Returns all posts

## Show
- GET
- BaseUrl + post/:id
- Nothing is expected on this route
- Returns post matching the id in the query parameter

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
- Returns updated post

## Delete
- DELETE
- BaseUrl + post/:id
- Nothing is expected on this route
- Returns status code 204 on delete success

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
- Returns post that was commented on

## Update
- PATCH
- BaseUrl + /comment/:commentId
- Expects updated post in body as below
```
        "text": "comment of text" 
```
- Returns updated comment 

## Delete
- DELETE
- BaseUlr + /comment/:commentId
- Nothing is expected on this route
- Returns status code 204 on delete success

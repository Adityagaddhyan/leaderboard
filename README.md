# Welcome to Leaderboard!

### postman collection : https://www.getpostman.com/collections/842cf5158bd2f3cb1be3
### Github link: https://github.com/Adityagaddhyan/leaderboard/

### AWS : http://18.213.94.240:3000
- Hosted on EC2 instance.
- Elastic IP used.
- Ingress open on port 3000.
## to test:
- Open link in postman
- make request.
- preferably create an admin and a user account to test the application.

## Key Features
- Error handling is used extensively to handle all the possible errors.
- Hosted on AWS. 


# API DETAILS

## AUTH API
### Register
- mobile and password necessary to register.
POST /auth/register
body:
```javascript
{
    "name":"ayush raj",
    "location":"kolkata", //optional
    "email":"ayush34323@gmail.com", //required
    "phone":"8888888383",
    "password":"12345@" //required,
    "role": "admin" //to register admin account. For player, not required
}
The Phone number and the email should not be registered
```
### LOGIN
```javascript
POST 'http://localhost:3000/auth/login' \
--data-raw '{
    "phone":"9386280041", //login only through phone as email can be null
    "password":"12345@"
}'
```
### Update Profile
```javascript
PUT 'http://localhost:3000/auth/update' \
--header 'auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDdiMmExZWViYzc0NTMzNTU2YTRkMjEiLCJpYXQiOjE2MTg2OTU3NzcsImV4cCI6MTYxODY5OTM3N30.fUylSVEH871WirLWXeX2fQDuEr9u94-Bps3VjEdguVI' \ //JWT TOKEN
--data-raw '{
    "phone":"9386280041", //phone number can not be changed and is required
    "name":"jhon", //all the other paramaters including password can be changed with this route. all the provided data is updated corresponding to the user.
    "location":"mumbai"
}'
```
### LOGOUT
```javascript
GET 'http://localhost:3000/auth/logout' \
--data-raw ''
```

## GAME APIs
### Get Game
Get the list of all the games with gameID.
```javascript
 GET 'http://localhost:3000/auth/login'
```
### Submit Score
```javascript
 POST 'http://localhost:3000/game/score' \
--data-raw '{
"opponentMobile":"8888888888", //opponent mobile number is required and opponnent should be registered
"p1_score":"100", //player 1 score(self)
"p2_score":"80", //opponent score
"gameID":"3"	//get game id from last route
}'
//can be accessed only after logging in

```
### Get Pending
- need ADMIN rights
-  Gives the list of all the games whose result needs to be declared
```javascript
 POST 'http://localhost:3000/game/pending' \

```
### POST RESULT
- Used by admin to post the result of games and save in database.
- Get game id from /game/pending

```javascript
 --request POST 'http://localhost:3000/game/result' \
--data-raw '{
"gameID":"607c1dd3b2561d39b861c01f",
"winner":"1"
}'

``` 
### Get Leaderboard
- returns the leader board of the game
```javascript
GET 'http://localhost:3000/game/leaderboard' \
--data-raw '{
"gameID":"1" //required
}'

```



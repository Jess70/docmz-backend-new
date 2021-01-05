# User API

## signup

```
POST /api/user/signup? HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
	"email":"test@example.com",
	"password":"test1234"
}
```

#### Response ->

```
{
    "_id": "5e87f79caddc87305c448e03",
    "username": "test",
    "email": "test@example.com",
    "password": "$2b$10$zdo5QgpnBlF6lRW2TEd7IO6M3fuhRtb8E5Jfuwj8HkmPy/xZkPkua",
    "role": "admin",
    "__v": 0
}
```

## signin

```
POST /api/user/signin HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
	"email": test@email.com",
	"password":"123456"
}
```

#### Response ->

```
{
    "success": true,
    "id": "5e86d183f148634ab839839b",
    "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg2ZDE4M2YxNDg2MzRhYjgzOTgzOWIiLCJ1c2VybmFtZSI6ImFtYW4iLCJlbWFpbCI6ImFtYW5AZW1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkTmxRRDgudWh2QXouQXJjcU9FZjRkLnpMZzBMd2JBazVGaFYuTW1jL0FwZnc4Z3BBalNxWHUiLCJyb2xlIjoiYWRtaW4iLCJfX3YiOjAsImlhdCI6MTU4NTk2MzA3NSwiZXhwIjoxNTg4NTU1MDc1fQ.UcrCElOkiiGLl6zay5MCtu0dBj-GcfddCybNke6Y-wU"
}
```

## update

```
PUT /api/user/ HTTP/1.1
Host: localhost:3000
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg2ZDE4M2YxNDg2MzRhYjgzOTgzOWIiLCJ1c2VybmFtZSI6ImFtYW4iLCJlbWFpbCI6ImFtYW5AZW1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkTmxRRDgudWh2QXouQXJjcU9FZjRkLnpMZzBMd2JBazVGaFYuTW1jL0FwZnc4Z3BBalNxWHUiLCJyb2xlIjoiYWRtaW4iLCJfX3YiOjAsImlhdCI6MTU4NTk2MzA3NSwiZXhwIjoxNTg4NTU1MDc1fQ.UcrCElOkiiGLl6zay5MCtu0dBj-GcfddCybNke6Y-wU
Content-Type: application/json

{
	"id":"5e86d183f148634ab839839b",
	"meta": {
    "number": "123456",
    "first_name": "Aman",
    "last_name": "Adhikari"
  }
}
```

#### Response ->

```
{
    "_id": "5e86d183f148634ab839839b",
    "username": "aman",
    "email": "aman@email.com",
    "password": "$2b$10$NlQD8.uhvAz.ArcqOEf4d.zLg0LwbAk5FhV.Mmc/Apfw8gpAjSqXu",
    "role": "admin",
    "__v": 0
}
```

## Get user

```
GET /api/user/5e86d183f148634ab839839b HTTP/1.1
Host: localhost:3000
Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg2ZDE4M2YxNDg2MzRhYjgzOTgzOWIiLCJ1c2VybmFtZSI6ImFtYW4iLCJlbWFpbCI6ImFtYW5AZW1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkTmxRRDgudWh2QXouQXJjcU9FZjRkLnpMZzBMd2JBazVGaFYuTW1jL0FwZnc4Z3BBalNxWHUiLCJyb2xlIjoiYWRtaW4iLCJfX3YiOjAsImlhdCI6MTU4NTk2MzA3NSwiZXhwIjoxNTg4NTU1MDc1fQ.UcrCElOkiiGLl6zay5MCtu0dBj-GcfddCybNke6Y-wU

```

#### Response ->

```
{
    "success": true,
    "user": {
        "meta": {
            "number": 123456,
            "first_name": "Aman",
            "last_name": "Adhikari"
        },
        "_id": "5e86d183f148634ab839839b",
        "username": "aman",
        "email": "aman@email.com",
        "password": "$2b$10$NlQD8.uhvAz.ArcqOEf4d.zLg0LwbAk5FhV.Mmc/Apfw8gpAjSqXu",
        "role": "admin",
        "__v": 0
    }
}
```

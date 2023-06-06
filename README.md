# Getting Started with node server App

## Installation

Enter to the server folder

```bash
cd server
```

Install the node_modules

```bash
npm i
```

## Available Scripts

you can run:

### `npm start`

- It will run the app with node
- The page will not reload if you make edits.

### `npm run dev`

- Runs the app with nodemon
- The page will reload if you make edits
- The print at the terminal will be cyan with the message:

`server run on: http://localhost:8181/`

And if there are no login errors you should see the message painted in cyan:

`connected to MongoDb!`

### Available Routes

### User

#### Register a new user

POST /http://localhost:8181/api/auth/users

request:

- firstName:
  -- string
  -- required
  -- min 2
  -- max 256
- middleName:
  -- string
  -- min 2
  -- max 256
- lastName:
  -- string
  -- required
  -- min 2
  -- max 256
- phone:
  -- string
  -- required
  -- min 9
  -- max 14
- email:
  -- string
  -- required
  -- must be email
  -- min 6
  -- max 256
- password:
  -- string
  -- required
  -- min 6
  -- max 1024
- imageUrl:
  -- string
  -- min 6
  -- max 1024
- imageAlt:
  -- string
  -- min 6
  -- max 256
- state:
  -- string
  -- min 2
  -- max 256
- country:
  -- string
  -- required
  -- min 2
  -- max 256
- city:
  -- string
  -- required
  -- min 2
  -- max 256
- street:
  -- string
  -- required
  -- min 2
  -- max 256
- houseNumber:
  -- string
  -- required
  -- min 1
  -- max 256
- zip:
  -- number
  -- min 1
  -- max 99999999
- biz:
  -- boolean
  -- true/false
  
#### Login a user

POST /http://localhost:8181/api/auth/users/login

request:

- email:
  -- string
  -- required
  -- must be email
  -- min 6
  -- max 256
- password:
  -- string
  -- required
  -- min 6
  -- max 1024

 #### Get all users

 GET /http://localhost:8181/api/auth/users

 - must provide token
  \*\* must be registered as admin

  #### For Information about a user

  GET /http://localhost:8181/api/auth/users/:id

equest:

- must provide token
  \*\* must be registered as admin

You will need to provide a token to get an answer from this api

#### For User information update/edit
 PUT /http://localhost:8181/api/auth/users/:id


 request:

- must provide token
  \*\* must be registered as admin

* firstName:
  -- string
  -- required
  -- min 2
  -- max 256
* middleName:
  -- string
  -- min 2
  -- max 256
* lastName:
  -- string
  -- required
  -- min 2
  -- max 256
* phone:
  -- string
  -- required
  -- min 9
  -- max 14
* email:
  -- string
  -- required
  -- must be email
  -- min 6
  -- max 256
* imageUrl:
  -- string
  -- min 6
  -- max 1024
* imageAlt:
  -- string
  -- min 6
  -- max 256
* state:
  -- string
  -- min 2
  -- max 256
* country:
  -- string
  -- required
  -- min 2
  -- max 256
* city:
  -- string
  -- required
  -- min 2
  -- max 256
* street:
  -- string
  -- required
  -- min 2
  -- max 256
* houseNumber:
  -- string
  -- required
  -- min 1
  -- max 256
* zip:
  -- number
  -- min 1
  -- max 99999999
* biz:
  -- boolean
  -- true/false

You will need to provide a token to get an answer from this api
or You need to be admin

### Change isBusiness status

 PATCH /http://localhost:8181/api/auth/users/:id

 must provide token
### Delete user
 DELETE /http://localhost:8181/api/auth/users/:id

 - must provide token
  \*\* must be registered as admin

You will need to provide a token to get an answer from this api

### Cards:

#### To receive all business cards

 GET /http://localhost:8181/api/cards

 #### To receive all business cards of the registered user


  GET /http://localhost:8181/api/cards/my-cards

- must provide token
  You will need to provide a token to get an answer from this api

 #### To get a business card of a specific business

 GET/ http://localhost:8181/api/cards/:id

 id of the card is required

 #### To create a new business card


POST /http://localhost:8181/api/cards

request:

- must provide token
  \*\* must registered as biz user

* title:
  -- string
  -- required
  -- min 2
  -- max 256
* subTitle:
  -- string
  -- required
  -- min 2
  -- max 256
* description:
  -- string
  -- required
  -- min 2
  -- max 1024
* state:
  -- string
  -- min 2
  -- max 256
* country:
  -- string
  -- required
  -- min 2
  -- max 256
* city:
  -- string
  -- required
  -- min 2
  -- max 256
* street:
  -- string
  -- required
  -- min 2
  -- max 256

  #### To update a business card

PUT/ http://localhost:8181/api/cards/:id

request:

- must provide token
  \*\* must registered as biz user or admin user

* title:
  -- string
  -- required
  -- min 2
  -- max 256
* subTitle:
  -- string
  -- required
  -- min 2
  -- max 256
* description:
  -- string
  -- required
  -- min 2
  -- max 1024
* state:
  -- string
  -- min 2
  -- max 256
* country:
  -- string
  -- required
  -- min 2
  -- max 256
* city:
  -- string
  -- required
  -- min 2
  -- max 256
* street:
  -- string
  -- required
  -- min 2
  -- max 256
* houseNumber:
  -- string
  -- required
  -- min 1
  -- max 256
* zipCode:
  -- number
  -- min 1
  -- max 99999999
* phone:
  -- string
  -- required
  -- min 9
  -- max 14
* email:
  -- string
  -- required
  -- must be email
  -- min 6
  -- max 256
* web:
  // link to website of the buissness
  -- string
  -- min 5
  -- max 255
* url:
  // image with the buissness card
  -- string
  -- min 6
  -- max 1024
* alt:
  // image alt
  -- string
  -- min 6
  -- max 256
  You will need to provide a token to get an answer from this api

  ### To update card like

	PATCH http://localhost:8181/api/cards/like/:id


- must provide token

#### To delete a business card

  DELETE / http://localhost:8181/api/cards/:id


- must provide token
  \*\* must registered as biz user or admin user
  You will need to provide a token to get an answer from this api


## Answers
Come up with a smart and scalable output schema that is future-proof. Explain why you think it is so.

    - Next js provides out-of-the-box api server architecture allowing software engineers to customize thier solutions.
    Next js allows enginerred solutions to be scalable , also using typescript and some of the best software development principles , applications are easily maintainable.

    - for Database i used postgress (with TYPEORM). 
        using TYPEORM, we can migrate Database design to a different DB if need be without much headache

How about race conditions? How would you avoid race conditions if a lookup is being executed and a capacity update comes?

    - Race condition can normally be avoided by obtaining a lock before a transaction/an action.
        in this case i will obtain a lock for the action doing the lookup, and when its done i release it,
        then the capacity update obtains lock and writes data.

        this helps with keeping data consistent


How do we run this API? Please provide the right amount of documentation in any format you prefer.

    - I used nest js boilerplate. postgres DB (Even tho i've used NOsql Dbs more)

    1. yarn
        
    2. (sudo) docker-compose up => Get postgres database running with docker

    3 - environment variables are stored in file 'dev.env', just rename it to '.env' then 
        yarn start

        (normally it is not a good practive to keep .env in repos, for security reasons. but to make the reveiw process smooth for this challange i included it here)



If you were to have more time, what would you do? Briefly explain what could be improved.

    - Make a more roboust Validator class to handle the various inputs for the various endpoints

    - Extend test coverage to include corner cases

    - introduce logging



## Endpoints

    #Create new Courier
    POST http://localhost:3000/couriers 
        {
            "id": <number>, //mandatory
            "max_capacity": <(number < 300) > //mandatory
        }'

    #Look up Courier by id or by capacity_required 
    (techically you can query both at the same time.)

    GET http://localhost:3000/couriers/lookup?capacity_required=<number> 

    GET http://localhost:3000/couriers/lookup?id=<number>     

    This gets you all couriers available
    GET http://localhost:3000/couriers/lookup


    # BONUS GOAL 1: allowing courier capacity to be updated on the go.
    PUT http://localhost:3000/couriers

        {
            remove_item: <number>, //optional
            add_item: <number>,  //optional
            id: <number> // mandatory
        }

    # Removing courier
    DELETE http://localhost:3000/couriers/<id>

        id: number




## Installation

```bash
$ npm install / yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
# Documentation 
link- https://documenter.getpostman.com/view/22341103/2s9YC7UXfi

# How to run
- clone the repo 
- run `npm install`
- past your config.env file accrding to you db usl
- then run the server `npm start` or `npm run dev` for nodemon 

# NOTE 
- Before running any endpoints first create some documents of climates by `POST `{{URL}}/api/v1/` - create the record
body 
```
  "climate":"humid",
  "area_code": 800,
  "temperature": 75,
  "humidity": 75,
  "chances_of_rain": 75
```
- `GET` `{{URL}}/api/v1`   - get all the records 

- `GET` `{{URL}}/api/v1/800` -  get record by area
- `GET` `{{URL}}/api/v1/800/humid` -  get record by area and its climate
- `GET` `{{URL}}/api/v1/gerDelta` -  get statistics as per specified in assingment 


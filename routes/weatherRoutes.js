const express = require('express');
const weatherController = require('../controllers/weatherController');


const router = express.Router();



router
  .route('/')
    .get(weatherController.getAllRecords)
    .post(weatherController.createClimate);

router.get('/getDelta',weatherController.climateChangeStatistics);

router.get('/:area_code/:climate?',weatherController.getRecordsByArea);




module.exports = router;

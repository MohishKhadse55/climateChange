const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
   climate: {
    type: String,
    enum: ['hot', 'humid', 'rainy', 'cold'],
    required: true,
  },
  area_code: {
    type: Number,
    min: 100,
    max: 1000 ,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  chances_of_rain: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

const Weather = mongoose.model('weather', weatherSchema);

module.exports = Weather;

const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const weatherModel = require('../models/weatherModel')

exports.createClimate = catchAsync(async (req, res, next) => {
   const doc = await weatherModel.create(req.body);

    res.status(201).json({
      status: 'success',
      data: doc
    });
});


exports.getAllRecords = catchAsync(async (req, res, next) => {
   const doc = await weatherModel.find();

    res.status(201).json({
      status: 'success',
      data: doc
    });
});

exports.getRecordsByArea = catchAsync(async (req, res, next) => {
    const {area_code, climate} = req.params
    let baseQuery = { area_code: area_code };
    console.log(climate)

    if(climate){
          baseQuery = { ...baseQuery, climate: climate };
    }
    const  docs = await weatherModel.find(baseQuery);

    res.status(201).json({
      status: 'success',
      data: docs
    });
});


exports.climateChangeStatistics= catchAsync(async (req,res,next)=>{
    const { from_climate, to_climate, area_code } = req.body;


    // Ensure from_climate and to_climate are different
    if (from_climate === to_climate) {
      return next(new AppError(`from_climate and to_climate should be different.`, 400));
    }

    // Calculate the average differences for temperature, humidity, and rain chances
    const aggregateResult = await weatherModel.aggregate([
      {
        $match: {
          area_code: area_code,
          climate: { $in: [from_climate, to_climate] }
        }
      },
      {
        $group: {
          _id: "$climate",
          count: { $sum: 1 }, // Count the number of records for each climate
          totalTemperature: { $sum: "$temperature" },
          totalHumidity: { $sum: "$humidity" },
          totalRainChances: { $sum: "$chances_of_rain" }
        }
      }
    ]);

    // console.log(aggregateResult);

    // Extract the averages for from_climate and to_climate
    let fromClimateData, toClimateData;
    aggregateResult.forEach(result => {
      if (result._id === from_climate) fromClimateData = result;
      if (result._id === to_climate) toClimateData = result;
    });

    if (!fromClimateData || !toClimateData) {
      return next(new AppError(`Climate data not found for provided climates.`, 404))

    }

    // console.log(fromClimateData.totalTemperature)
    // console.log(toClimateData.totalTemperature)

    const total_record = fromClimateData.count + toClimateData.count

    // console.log(`total record = `+ total_record)

    // Calculate the deltas
    const climateDelta = `${from_climate} -> ${to_climate}`;
    const temperatureDelta = (toClimateData.totalTemperature - fromClimateData.totalTemperature)/total_record;
    const humidityDelta = (toClimateData.totalHumidity - fromClimateData.totalHumidity)/total_record;
    const rainChancesDelta = (toClimateData.totalRainChances - fromClimateData.totalRainChances)/total_record;

    // Calculate the climate_change_index
    const climateChangeIndex = (temperatureDelta * humidityDelta) / rainChancesDelta;

    // Create the response object
    const responseData = {
      climate_delta: climateDelta,
      temperature_delta: temperatureDelta,
      humidity_delta: humidityDelta,
      rain_chances_delta: rainChancesDelta,
      climate_change_index: climateChangeIndex
    };

    res.status(200).json(responseData);
})
import h2o
from h2o.estimators.gbm import H2OGradientBoostingEstimator
h2o.init()

# import the airlines dataset:
# This dataset is used to classify whether a flight will be delayed 'YES' or not "NO"
# original data can be found at http://www.transtats.bts.gov/
airlines= h2o.import_file("https://s3.amazonaws.com/h2o-public-test-data/smalldata/airlines/allyears2k_headers.zip")

# convert columns to factors
airlines["Year"]= airlines["Year"].asfactor()
airlines["Month"]= airlines["Month"].asfactor()
airlines["DayOfWeek"] = airlines["DayOfWeek"].asfactor()
airlines["Cancelled"] = airlines["Cancelled"].asfactor()
airlines['FlightNum'] = airlines['FlightNum'].asfactor()

# set the predictor names and the response column name
predictors = ["Origin", "Dest", "Year", "UniqueCarrier",
              "DayOfWeek", "Month", "Distance", "FlightNum"]
response = "IsDepDelayed"

# split into train and validation sets
train, valid = airlines.split_frame(ratios = [.8], seed = 1234)

# train your model
airlines_gbm = H2OGradientBoostingEstimator(sample_rate = .7, seed = 1234)
airlines_gbm.train(x = predictors,
                   y = response,
                   training_frame = train,
                   validation_frame = valid)

# retrieve the model performance
perf = airlines_gbm.model_performance(valid)
print(perf.F1())

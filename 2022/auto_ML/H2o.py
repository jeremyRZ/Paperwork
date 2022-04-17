from re import X
import h2o
# import the glm estimator object
from h2o.estimators.gbm import H2OGradientBoostingEstimator
h2o.init()

# import the prostate data
fr = h2o.import_file('./Dataset/Supp_DataH2O.csv')


# cast to factor
fr[1] = fr[1].asfactor()

# Random UNIform numbers, one per row
r = fr[0].runif()

# 60% for training data
train = fr[ r < 0.6 ]

# 30% for validation
valid = fr[ (0.6 <= r) & (r < 0.9) ]

# 10% for testing
test  = fr[ 0.9 <= r ]

# default DL setup

# pass a validation frame in addition to the training frame
x=train.names[1:]
print(x)
y=train.names[0]
print(y)
m = H2OGradientBoostingEstimator(sample_rate = .7, seed = 1234)
m.train(x, y, training_frame=train, validation_frame=valid)

# display the model summary by default (can also call m.show())
m

# equivalent to the above
m.show()

# show the performance on the training data, (can also be m.performance(train=True)
# m.model_performance()

# show the performance on the validation data
# m.model_performance(valid=True)

# score and compute new metrics on the test data!
m.model_performance(test_data=test)
perf = m.model_performance(valid)

print(perf.F1())

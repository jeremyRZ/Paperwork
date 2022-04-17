
# example of fitting a final model and making a prediction on the insurance dataset
from pandas import read_csv
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVR
# load dataset
url = 'https://raw.githubusercontent.com/jbrownlee/Datasets/master/auto-insurance.csv'
dataframe = read_csv(url, header=None)
# split into input and output elements
data = dataframe.values
data = data.astype('float32')
X, y = data[:, :-1], data[:, -1]
# Average CV score on the training set was: -29.147625969129034
exported_pipeline = LinearSVR(C=1.0, dual=False, epsilon=0.0001, loss="squared_epsilon_insensitive", tol=0.001)
# Fix random state in exported estimator
if hasattr(exported_pipeline, 'random_state'):
    setattr(exported_pipeline, 'random_state', 1)
# fit the model
exported_pipeline.fit(X, y)
# make a prediction on a new row of data
row = [108]
yhat = exported_pipeline.predict([row])
print('Predicted: %.3f' % yhat[0])

from tpot import TPOTRegressor
from sklearn.datasets import load_boston
from sklearn.model_selection import train_test_split

housing = load_boston()
X_train, X_test, y_train, y_test = train_test_split(housing.data, housing.target,
                                                    train_size=0.75, test_size=0.25, random_state=42)

tpot = TPOTRegressor(generations=5, population_size=50, verbosity=2, random_state=42)
tpot.fit(X_train, y_train)
print(tpot.score(X_test, y_test))
tpot.export('tpot_boston_pipeline.py')
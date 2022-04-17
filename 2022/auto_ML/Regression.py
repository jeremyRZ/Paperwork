# example of auto-sklearn for the insurance regression dataset
from pandas import read_csv
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.metrics import r2_score
from sklearn.metrics import mean_absolute_percentage_error
from sklearn.metrics import mean_squared_error
from autosklearn.regression import AutoSklearnRegressor
from autosklearn.metrics import mean_absolute_error as auto_mean_absolute_error
import time
if __name__=='__main__':
    # load dataset
    print("Start")
    address = './Dataset/Video_Game_Sales.csv'
    dataframe = read_csv(address)
    print(time.strftime("Start time is %Y-%m-%d %H:%M:%S", time.localtime()) )
    # split into input and output elements
    data = dataframe.values
    data = data.astype('int')
    X, y = data[:, :-1], data[:, -1]
    print(X.shape, y.shape)
    # split into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=1)
    # define search
    model = AutoSklearnRegressor(time_left_for_this_task=5*60, per_run_time_limit=30, n_jobs=8)
    # perform the search
    model.fit(X_train, y_train)
    # summarize
    # print(model.sprint_statistics())
    # evaluate best model
    y_hat = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_hat)
    r2Score = r2_score(y_test, y_hat)
    mape=mean_absolute_percentage_error(y_test, y_hat)
    mse=mean_squared_error(y_test, y_hat)
    print(time.strftime("End time is %Y-%m-%d %H:%M:%S", time.localtime()) )
    print("MAE: %.3f" % mae)
    print("R2_score: %.3f" % r2Score)
    print("MAPE: %.3f" % mape)
    print("MSE: %.3f" % mse)
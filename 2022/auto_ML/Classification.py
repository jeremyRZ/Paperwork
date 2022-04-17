# example of auto-sklearn for the sonar classification dataset
from pandas import read_csv
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
from sklearn.metrics import f1_score
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score
from autosklearn.classification import AutoSklearnClassifier

import time
# load dataset
if __name__=='__main__':
    address = './Dataset/Supp_Data.csv'
    dataframe = read_csv(address)
    print(time.strftime("Start time is %Y-%m-%d %H:%M:%S", time.localtime()) )
    # split into input and output elements
    data = dataframe.values
    X, y = data[:, :-1], data[:, -1]
    print(y)
    print(X.shape, y.shape)
    # minimally prepare dataset
    X = X.astype('float32')
    y = LabelEncoder().fit_transform(y.astype('str'))
    # split into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)
    # define search
    model = AutoSklearnClassifier(time_left_for_this_task=5*60, per_run_time_limit=30, n_jobs=8)
    # perform the search
    model.fit(X_train, y_train)
    # summarize
    print(model.sprint_statistics())
    # evaluate best model
    y_hat = model.predict(X_test)
    acc = accuracy_score(y_test, y_hat)
    f1Score=f1_score(y_test, y_hat,average='macro')
    prec=precision_score(y_test, y_hat, average='macro')
    recall=recall_score(y_test, y_hat,average='macro')
    print(time.strftime("End time is %Y-%m-%d %H:%M:%S", time.localtime()) )
    print("Accuracy: %.3f" % acc)
    print("f1 score: %.3f" % f1Score)
    print("precision: %.3f" % prec)
    print("recall: %.3f" % recall)
import pandas as pd
import glob
from sklearn import svm
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import numpy as np
# 폴더 내의 모든 CSV 파일을 읽어와 하나의 데이터 프레임으로 합치기
path = './data'  # CSV 파일이 저장된 폴더 경로
all_files = glob.glob(path + "/*.csv")

li = []

for filename in all_files:
    df = pd.read_csv(filename, index_col=None, header=0)
    li.append(df)
data = pd.concat(li, axis=0, ignore_index=True)
nan_rows = data.isnull().sum(axis=1)
print("Number of rows with NaN values: ", nan_rows.sum())
data = data.dropna(axis=0)
# 데이터 전처리
y = data.iloc[:, -1].apply(lambda x: 1 if x == 'a01' else 0).values
X = data.iloc[:, 6:40].values
# Drop NaN

# 데이터 정규화 (1920x1080 크기를 기준으로 상대좌표로 변환)
X_normalized = X.copy()
X_normalized[:, 0::2] = X[:, 0::2] / 1920
X_normalized[:, 1::2] = X[:, 1::2] / 1080


# 데이터 분할
X_train, X_test, y_train, y_test = train_test_split(X_normalized, y, test_size=0.2, random_state=42)

# SVM 모델 생성 및 학습
model = svm.SVC()
model.fit(X_train, y_train)

# 테스트 데이터에 대한 예측 수행
y_pred = model.predict(X_test)

# 성능 평가
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
conf_matrix = confusion_matrix(y_test, y_pred)

print("Accuracy:", accuracy)
print("Precision:", precision)
print("Recall:", recall)
print("F1 Score:", f1)
print("Confusion Matrix:\n", conf_matrix)
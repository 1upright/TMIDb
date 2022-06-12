import pandas as pd
import numpy as np
df = pd.read_csv('data.csv', encoding='UTF-8')


# df['year'] = df['year'].replace(0, np.nan).dropna()

df = df.dropna(subset=['title'])
# print(df.head(10))
# print(df.shape)

df = df.set_index(keys=['titleId'], inplace=False)
df.to_csv('data1.csv')

# print(type(np.nan))

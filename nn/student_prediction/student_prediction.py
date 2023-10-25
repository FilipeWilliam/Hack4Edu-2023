import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split

# Exemplo de dados fictícios (substitua com seus próprios dados)
tempos_resposta = np.array([2.3, 3.1, 4.5, 5.6, 6.2, 7.8, 8.1, 9.5])
acertos_erros = np.array([1, 1, 0, 0, 1, 0, 0, 0])  # 1 para acerto, 0 para erro
vezes_foco_perdido = np.array([0, 2, 1, 0, 3, 1, 2, 0])  # Quantidade de vezes que o foco foi perdido

# Reformule os dados para o formato correto
X = np.column_stack((tempos_resposta, vezes_foco_perdido))
y = acertos_erros

# Dividir os dados em conjuntos de treinamento e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Criar o modelo de rede neural
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(2,)),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')  # Usamos sigmoid para uma saída binária (acerto ou erro)
])

# Compilar o modelo
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Treinar o modelo
model.fit(X_train, y_train, epochs=10, validation_data=(X_test, y_test))

# Avaliar o modelo
test_loss, test_accuracy = model.evaluate(X_test, y_test)
print(f'Acurácia do Modelo: {test_accuracy}')

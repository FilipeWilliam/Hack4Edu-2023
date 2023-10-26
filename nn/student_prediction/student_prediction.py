import sys

# Receber os dados de acertos e dificuldades
acertos = list(map(int, sys.argv[1:len(sys.argv)//2+1]))
dificuldades = list(map(int, sys.argv[len(sys.argv)//2+1:]))

# Agora você pode usar os dados (acertos e dificuldades) no seu script Python
# Exemplo:
for acerto, dificuldade in zip(acertos, dificuldades):
    print(f'Questão com dificuldade {dificuldade}: {"Correta" if acerto else "Incorreta"}')

# import numpy as np
# import tensorflow as tf

# # Dados fictícios para treinamento
# dificuldade = np.array([1, 2, 3, 2, 1, 3, 2, 1])
# acertos = np.array([1, 1, 0, 0, 1, 0, 0, 1])  # 1 para acerto, 0 para erro

# # Reformulando os dados
# X = dificuldade.reshape(-1, 1)
# y = acertos

# # Criando o modelo de rede neural
# model = tf.keras.Sequential([
#     tf.keras.layers.Dense(64, activation='relu', input_shape=(1,)),
#     tf.keras.layers.Dense(32, activation='relu'),
#     tf.keras.layers.Dense(1, activation='sigmoid')  # Sigmoid para classificação binária
# ])

# # Compilando o modelo
# model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# # Treinando o modelo
# model.fit(X, y, epochs=10)

# # Avaliando o modelo (opcional)
# test_loss, test_accuracy = model.evaluate(X, y)
# print(f'Acurácia do Modelo: {test_accuracy}')

# # Usando o modelo para calcular a probabilidade de acerto para diferentes níveis de dificuldade
# niveis_dificuldade = np.array([[1], [2], [3]])
# probabilidades = model.predict(niveis_dificuldade)

# print(probabilidades)
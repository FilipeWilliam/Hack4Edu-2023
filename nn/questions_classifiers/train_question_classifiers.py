import torch
from transformers import BertTokenizer, BertForSequenceClassification

# Dados de treinamento de exemplo (5 perguntas)
train_texts = [
    "Qual é a capital da França?",
    "Resolva 2+2.",
    "Explique a teoria da relatividade de Einstein.",
    "Quem escreveu a peça 'Romeu e Julieta'?",
    "Qual é o maior planeta do sistema solar?",
    "Qual é a função do sistema circulatório no corpo humano?",
    "Como a eletricidade é gerada em usinas nucleares?",
    "Quem foi o primeiro homem a pisar na Lua?",
    "Quais são os três estados físicos da matéria?",
    "O que é a lei da oferta e da procura na economia?",
    "Resolva a equação quadrática: 2x^2 + 3x - 5 = 0.",
    "Qual é a capital do Japão?",
    "Explique o processo de fotossíntese.",
    "Quem é o autor de 'Dom Quixote'?",
    "Qual é a fórmula para calcular a área de um triângulo?",
]
train_labels = [
    0,
    1,
    2,
    1,
    0,
    1,
    2,
    0,
    0,
    0,
    1,
    0,
    1,
    2,
    1,
]  # 0: fácil, 1: médio, 2: difícil

# Tokenização das perguntas
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
train_encodings = tokenizer(
    train_texts, truncation=True, padding=True, return_tensors="pt"
)

# Preparar os dados como um tensor PyTorch
train_labels = torch.tensor(train_labels)

# Carregar o modelo BERT pré-treinado para classificação
model = BertForSequenceClassification.from_pretrained(
    "bert-base-uncased", num_labels=3
)  # 3 categorias de dificuldade


# Definir otimizador e função de perda
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-5)
criterion = torch.nn.CrossEntropyLoss()

# Treinamento
num_epochs = len(train_texts)
for epoch in range(num_epochs):
    optimizer.zero_grad()
    outputs = model(**train_encodings, labels=train_labels)
    loss = outputs.loss
    loss.backward()
    optimizer.step()
    print(f"Epoch {epoch + 1}/{num_epochs}, Loss: {loss.item()}")


model.save_pretrained("./output/")

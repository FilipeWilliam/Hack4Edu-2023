from transformers import BertTokenizer, BertForSequenceClassification

# Carregar o modelo treinado a partir do diretório onde você o salvou
model = BertForSequenceClassification.from_pretrained("./output/")

# Carregar o tokenizador correspondente
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# Pergunta que você deseja classificar
input_text = "Qual é a capital da França?"

# Tokenizar a pergunta
tokens = tokenizer(input_text, truncation=True, padding=True, return_tensors="pt")

# Realizar a classificação
predictions = model(**tokens)
predicted_label = predictions.logits.argmax().item()

# Mapear o rótulo de volta para a categoria de dificuldade
categories = ["fácil", "médio", "difícil"]
predicted_category = categories[predicted_label]

print(f"A pergunta é categorizada como '{predicted_category}'.")

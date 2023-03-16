from pymongo import MongoClient
from hashlib import sha256

client = MongoClient()

db = client.Aula06

def criar_usuario(nome, mae, data_nascimento):
    hash_nome = sha256(nome.encode('utf8')).digest();
    hash_mae = sha256(mae.encode('utf8')).digest();
    id = sha256(
    	(hash_nome+hash_mae)).hexdigest()
    return {
        '_id': id,
        'nome': nome,
        'mae': mae,
        'data': data_nascimento
    }


usuario_a = criar_usuario('Lohann', 'Ivone', 10)
usuario_b = criar_usuario('Lohann', 'Jose', 20)

print(usuario_a)
print(usuario_b)

db.usuarios.drop()

db.usuarios.insert_one(usuario_a)
db.usuarios.insert_one(usuario_b)

print(list(db.usuarios.find()))

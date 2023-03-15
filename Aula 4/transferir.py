from pymongo import MongoClient

client = MongoClient()
print(client.list_database_names())

#Criar novo banco Aula04
db = client.Aula04

#Deletar colecao usuarios
db.usuarios.drop()

#Cria usuarios
usuario_emissor = db.usuarios.insert_one({
    '_id': 1,
    'saldo': 1000
})

usuario_receptor = db.usuarios.insert_one({
    '_id': 2,
    'saldo': 500
})

def atualizar_saldo(id,valor):
    usuario_a = db.usuarios.find_one({'_id': a})
    novo_saldo = usuario_a['saldo'] - valor
    db.usuarios.update_one(
        {'_id':a},
        {'$set': {'saldo': novo_saldo }}
    )
    return db.usuarios.find_one({'_id': id})


def transferir(a, b, valor):
    atualizar_saldo(a, -valor)
    atualizar_saldo(b, valor)
    print db.usuarios.find_one({'_id': a})
    print db.usuarios.find_one({'_id': b})
    return db.usuarios.find_one({'_id': a})

usuario = transferir(1,2, 10)    
#print(usuario)

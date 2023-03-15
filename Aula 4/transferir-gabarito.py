from pymongo import MongoClient, WriteConcern, read_concern, ReadPreference
from multiprocessing import Process

client = MongoClient()
wc_majority = WriteConcern("majority", wtimeout=1000)

# Criar novo banco Aula04
db = client.Aula04

# Deletar colecao usuarios
db.usuarios.drop()

db.usuarios.insert_one({
    '_id': 1,
  'saldo': 1000 
})
db.usuarios.insert_one({
    '_id': 2,
  'saldo': 1000
})

def atualizar_saldo(id, valor):
    usuario = db.usuarios.find_one({ '_id': id })
    novo_saldo = usuario['saldo'] + valor
    db.usuarios.update_one(
        { '_id': id },
        { '$set': { 'saldo': novo_saldo } }
    )
    return db.usuarios.find_one({ '_id': id })

def transferir(a, b, valor):
    usr_a = atualizar_saldo(a, -valor)
    usr_b = atualizar_saldo(b,  valor)
    return [usr_a, usr_b]

def transacao():
    for i in range(0, 100):
        transferir(1, 2, 1)
        
def callback():
	with client.start_session() as session:
		session.with_transaction(
			transacao,
			read_concern=ReadConcern("local"),
			write_concern=wc_majority,
			read_preference=ReadPreference.PRIMARY
		)

transacao()
print(transferir(1,2,0))

if __name__ == '__main__':
    tasks = []

    # roda as tarefas em paralelo
    for i in range(1, 100):
        task = Process(target=transacao)
        tasks.append(task)
        task.start()
    
    # Espera todas as tarefas terminar
    for p in tasks:
        task.join()
    
    print(transferir(1, 2, 0))

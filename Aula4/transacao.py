from pymongo import MongoClient, WriteConcern, read_concern, ReadPreference
from multiprocessing import Process

client = MongoClient('mongodb://localhost:27017,localhost:27018,localhost:27019')
wc_majority = WriteConcern("majority", wtimeout=1000)

# Criar novo banco Aula04
db = client.get_database(
    "Aula04",
    write_concern=wc_majority
)

# Deletar colecao usuarios
db.usuarios.drop()

db.usuarios.insert_one({
    '_id': 'rafael',
  'saldo': 1000 
})
db.usuarios.insert_one({
    '_id': 'lohann',
  'saldo': 1000
})

def atualizar_saldo(id, valor, session):
    usuario = db.usuarios.find_one(
            { '_id': id },
            session = session
    )
    novo_saldo = usuario['saldo'] + valor
    db.usuarios.update_one(
        { '_id': id },
        { '$set': { 'saldo': novo_saldo } },
        session = session
    )
    return db.usuarios.find_one(
            { '_id': id },
            session = session
    )

def transferir(a, b, valor, session):
    usr_a = atualizar_saldo(a, -valor, session)
    usr_b = atualizar_saldo(b,  valor, session)
    return [usr_a, usr_b]

def transacao(session = None):
    for i in range(0, 50):
        transferir('rafael', 'lohann', 1, session)
        
#Sessao para que todas operações sejam obrigatoriamente executadas (sem interrupção entre elas)  
def callback():
    with client.start_session() as session:
        session.with_transaction(
            transacao,
            read_concern=read_concern.ReadConcern("majority"),
            write_concern=wc_majority,
            read_preference=ReadPreference.PRIMARY,
        )
        
def sem_transacao():
	transacao()

if __name__ == '__main__':
    tasks = []

    # roda as tarefas em paralelo
    for i in range(0, 10):
        task = Process(target=callback)
        #task = Process(target=sem_transacao)
        task.start()
        tasks.append(task)

    # Espera todas as tarefas terminarem
    for task in tasks:
        task.join()
    
    [a, b] = transferir('rafael', 'lohann', 0, None)
    print(a)
    print(b)
    print(a['saldo'] + b['saldo'])

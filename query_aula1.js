db = connect('mongodb://localhost/AulaDevOps');

id_todo_list = ObjectId()
id_usuario = ObjectId()

db.todo_list.insertOne({
	_id: id_todo_list
	nome: "Atividades MongoDB"
})

db.tarefas.insertOne({
        descricao: "Desafio Aula 1"
        id_todo_list: id_todo_list
})

db.todo_usuario.insertOne({
	id_usuario: id_usuario
	id_todo_list:': id_todo_list
})

db.usuarios.insertOne({
	_id = id_usuario
	nome: "Rafael Peres Rubira"
})

console.log("Ola MongoDB!")

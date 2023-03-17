db = connect('mongodb://localhost/AulaDevOps');

db.usuarios.drop()

db.createCollection("usuarios", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			required: ["nome"],
			additionalProperties: false,
			properties: {
				_id: {
					
				}, //Pode ser qualquer coisa
				nome: {
					bsonType: "string",
					description: "O 'nome' precisa ser uma string"
				}, // Nome deve ser string
				idade: {
					bsonType: "int",
					minimum: 0,
					maximum: 150,
					description: "Idade precisa ser um número positivo menor que 150!"
				} //Idade deve ser positiva e no max 150
			}
		}
	}
})

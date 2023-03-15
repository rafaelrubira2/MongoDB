db = connect('mongodb://localhost/DevopsSchema');

db.createCollection("usuarios", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          title: "Coleção de usuarios",
          required: [ "nome", "idade" ],
          additionalProperties: false, // não permite campos que não estejam em 'properties'
          properties: {
             nome: {
                bsonType: "string",
                description: "'nome' deve ser uma string"
             },
             idade: {
                bsonType: "int",
                minimum: 1,
                maximum: 130,
                description: "'idade' deve ser um inteiro entre [ 1, 130 ]"
             },
          }
       }
    }
 } )
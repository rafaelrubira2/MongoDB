db = connect('mongodb://localhost/AulaDevOps');

new_pokemons = db.pokemons.insertMany([
	{nome: "Charizard"},
	{nome: "Blastoise"},
	{nome: "Venosaur"},
	{nome: "Weedle"},
	{nome: "Metapod"}
	]).insertedIds;


db.usuarios.insertOne({
	nome: "Lohann",
	pokemons: new_pokemons
})

console.log("Query Pokemon Executada!")

db = connect('mongodb://localhost/DesafioRestaurante');

// Quantos restaurantes estão cadastrados?
console.log(db.restaurantes.count());

// Quantos restaurantes estão abertos?
console.log(db.restaurantes.count({ aberto: true }));

// Quantos restaurantes estão abertos e possuem preco maior que 3?
console.log(db.restaurantes.count({ aberto: true, preco: { $gt: 3 }}));

// Quais restaurantes tem wifi?
console.log(db.restaurantes.count({ tags: "wifi" }));

// Quantos restaurantes italianos?
console.log(db.restaurantes.count({ cozinha: "italiano" }));

// Quantos restaurantes brasileira ou churrascaria?
console.log(db.restaurantes.count({ cozinha: { $in: ["brasileira", "churrascaria"] }}));

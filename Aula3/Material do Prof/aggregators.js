db = connect('mongodb://localhost/DesafioRestaurante');

result = db.restaurantes.aggregate([
	{ $unwind: { path: '$avaliacoes' } },
	{ $group: { _id: "$_id", notaMedia: { $avg: "$avaliacoes.nota" } } },
]);

console.log(result);

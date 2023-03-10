db = connect('mongodb://localhost/DesafioRestaurante');

db.restaurantes.aggregate([
	{ $match: {cozinha: 'brasileira'}},
	{ $group: {_id: "$cozinha", precoMedio: {$avg: "$preco"}}}
])

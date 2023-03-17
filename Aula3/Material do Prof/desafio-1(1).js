const SEED = 'lohann';

db = connect('mongodb://localhost/DesafioRestaurante');
db.restaurantes.drop();

const NOMES = [
    'Pobre Juan',
    'Johnny Rockets',
    'Pantucci Trattoria',
    'Nuu Nikkei',
    'The Ox Room Steakhouse',
    'Olivia',
    'Coco Bambu',
    'Madero Steakhouse',
    'Totopos',
    'Zapata Mexican Bar',
    'Jardins Grill',
    'Casa do Porco',
    'D.O.M.',
    'Goodies Bakery',
    'Mary Ann Apple Factory',
    'Badida',
    'Lisboa Gastronomia',
    'Pantucci Trattoria',
    'Le Bife',
    'Alladin',
    'Costelão do gaucho',
]
const COZINHA = ['brasileira', 'mexicano', 'japonesa', 'pizza', 'steakhouse', 'churrascaria', 'café', 'italiano'];
const TAGS = ['wifi', 'acessibilidade', 'ar livre', 'opções vegetarianas', 'opções veganas', 'banheiro para cadeirantes', 'silencioso', 'buffet'];

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return xoshiro128ss([(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0]);
}

function xoshiro128ss([a, b, c, d]) {
    return function() {
        var t = b << 9, r = a * 5; r = (r << 7 | r >>> 25) * 9;
        c ^= a; d ^= b;
        b ^= c; a ^= d; c ^= t;
        d = d << 11 | d >>> 21;
        return (r >>> 0) / 4294967296;
    }
}
const prng = cyrb128(SEED);

function peekRandom(array, n = 1) {
    const temp = [...array];
    const result = [];
    for (var i=0; i<n; i++) {
        result.push(temp.splice(Math.floor(prng() * temp.length), 1)[0])
    }
    return result;
}

function randInt(max, min = 0) {
    return Math.floor(prng() * (max - min)) + min;
}

const restaurantes = [];
for (var i=0; i<1000; i++) {
    const qualidadeMedia = prng() * 4
    const qtdAvaliacoes = Math.round(Math.pow(prng(), 4) * 100);
    const avaliacoes = [];
    for (j=0; j<qtdAvaliacoes; j++) {
        avaliacoes.push({
            usuario_id: randInt(10, 1),
            nota: 1 + Math.round(Math.pow(prng(), qualidadeMedia) * 10),
            data: new Date(2010 + randInt(13), randInt(12), randInt(28))
        })
    }

    restaurantes.push({
    	_id: ObjectId(randInt(2 ** 52)),
        restaurante: NOMES[randInt(NOMES.length)],
        cozinha: peekRandom(COZINHA)[0],
        tags: peekRandom(TAGS, randInt(8, 1)),
        anoAbertura: 1980 + randInt(40),
        preco: randInt(5, 1),
        aberto: prng() > 0.25,
        avaliacoes: avaliacoes,
    });
}

db.restaurantes.insertMany(restaurantes);
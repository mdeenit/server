const expect = require('expect');
const mongoose = require('mongoose');
const Continent = require('../models/continent');
const {
	getAllContinents,
	getContinentById,
	addContinent,
	deleteContinent,
	updateContinent,
    getFairy,
    
} = require('../utils/continents_utilities');

const databaseConnection = 'mongodb://localhost/tooth_inc_test';
let continentId = null;

before((done) => connectToMongo(done));
after((done) => {
	mongoose.disconnect(() => done());
});

beforeEach(async () => {
	let continent = await setupData();
	continentId = continent._id;
});

afterEach((done) => {
	clearData().exec(() => done());
});

function connectToMongo(done) {
	mongoose.connect(
		databaseConnection,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		},
		(error) => {
			if (error) {
				console.log('Error connecting to MongoDB');
				done();
			} else {
				console.log('Connected to Tooth Inc. TEST database');
				done();
			}
		}
	);
}


function setupData() {
	let date = Date.now();
	let testContinent = {};
	testContinent.continent = 'Europe';
	testContinent.fairy_name = 'Carl';
	testContinent.description = 'Loves walks on the beach with his pet Great Dane. His favourite food is lasagne - the way his mum makes it. Plays water polo to keep fit. Fairy of the Year 3 years running...';
	testContinent.create_date = date;
	testContinent.modified_date = date;
	return Continent.create(testContinent);
}

describe('getAllContinents', () => {
	let req = {
		query: {},
	};
	it('should return all continents if they exist in DB', async () => {
		await getAllContinents(req).exec((error, continents) => {
			expect(Object.keys(continents).length).toBe(1);
		});
	});
	it('the fairy_name should be Carl', async () => {
		await getAllContinents(req).exec((error, continents) => {
			expect(continents[0].fairy_name).toBe('Carl');
		});
	});
});

describe('getContinentById', () => {
	it('should return the continent with fairy_name Carl', async () => {
		let req = {
			params: {
				id: continentId,
			},
		};
		await getContinentById(req).exec((error, continent) => {
			expect(continent.fairy_name).toBe('Carl');
		});
	});
});

describe('makeContinent', () => {
	let req = {
		body: {
			continent: 'Europe',
			fairy_name: 'Carl',
			description: 'Loves walks on the beach with his pet Great Dane. His favourite food is lasagne - the way his mum makes it. Plays water polo to keep fit. Fairy of the Year 3 years running...',
		},
	};
	it('should add and return a continent', async () => {
		await addContinent(req).save((error, continent) => {
			expect(continent.fairy_name).toBe('Carl');
		});
	});


});

describe('deleteContinent', () => {
	it('should delete the specified continent', async () => {
		let req = {
			params: {
				id: continentId,
			},
		};
		await deleteContinent(req).exec();
		await getContinentById(req).exec((error, continent) => {
			expect(continent).toBe(null);
		});
	});
});

describe('updateContinent', () => {
	it('should update the specified continent and specified fields', async () => {
		let req = {
			params: {
				id: continentId,
			},
			body: {
				fairy_name: 'Cindy',
			},
		};
		await updateContinent(req).exec((error, continent) => {
			expect(continent.fairy_name).toBe(req.body.fairy_name);
			expect(continent.continent).toBe('Europe');
		});
	});
});

describe('get Fairy for a particular continent', () => {
    it('should return a fairy if it is in the given continent', async () => {
		await getFairy({
                query: {
                    continent: 'Europe'
                }
            }).exec((err, continents) => {
                console.log(`Continents-----${continents}---`)
                expect(Object.keys(continents).length).toBe(1);
                expect(continents[0].fairy_name).toBe('Carl');
            
            });
        });

    });



	describe('get fairy for a particular continent', () => {
		it('should not return a fairy if the given continent does not exist', async () => {
			await getFairy({
					query: {
						continent: 'Asia'
					}
				}).exec((err, continents) => {
					console.log(`Continenst-----${continents}---`)
					expect(Object.keys(continents).length).toBe(0);
				
				});
			});
	
		});

	function clearData() {
		return Continent.deleteMany();
	}
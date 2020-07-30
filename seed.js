const seeder = require('mongoose-seed');

const databaseConnection = 'mongodb://localhost/tooth_inc';

seeder.connect(databaseConnection, function () {
	seeder.loadModels([
		'./models/user.js',
		'./models/continent.js',
		'./models/booking.js',
		'./models/wish.js',
	]);

	seeder.clearModels(['User', 'Continent', 'Booking', 'Wish'], function () {
		seeder.populateModels(data, function (error, done) {
			if (error) {
				return console.log('There was an error seeding the database: ', error);
			}
			if (done) {
				return console.log('Database seeded: ', done);
			}
			seeder.disconnect();
		});
	});
});

let date = Date.now();

const data = [
	{
		model: 'User',
		documents: [
			{
				username: 'FIC',
				email: 'admin@test.com',
				password: '123456',
				admin: true,
				salt:
					'0a23d660a2858a85fa876884cedd18aa2c7f11be97adf388647bea9c0b3e08a1',
				hash:
					'ace8623a786674e42603bbf7d43c58683c2c6fe667ba73d1e6f04f4740740968989c984bbd1773bfd2b8705ac03d482301a117ee365a5c5e6721d1fb9aadc0f34c59f3c1adaa1646dd325c8a68634138f0d19ff1dc6d8d1369394dbc06a81d34724609231b09dfbb23b41ebf04ba8ad75d337ce73ecc661cb52e5ba1cd797eea8d2fe4cb336eba4ee07abd77a5e102056d876fbb42af28ae5609def5bc5c91c6198ccb2f91c50061402912d5a0457ba72dfdae99d9b34db64dc76c60f21db65a3c48869647b2047975c2ed956f24d39b2aa447f3fab341905826ab60c4f5d92c425eb17c3ee7e19537ad8fafa19c8ee4b8342398ed4ca68a6313114c97f6e842c6c1d435a97e7dec2d6694501c469f846bfbe714bf92d54639579b85f943e51c864635a98c392f82c45cfde95a9af476da121cb5db621cc8f4904ff3d9070057f4fc00a533b0ca1faee08db2413b6bd53ec047d36a5313c55c70b4438efafcfec2299b1520f0b427cd57d00a3d6468f8c8db0db9281c0ad140a503a102bbf39abac95268ba8aedf4b342a04c4726415d8327af0ed42e89ad9080569029d3a564be21fec16c61e5cf53e576fefff4d31466ad4c04f3df4749cc3717ff316a470cd2a50888a8180978c4dacb351ee56ac127cc306faf55c63d1473d716578b0dffb9fe833577dd113af2d85665f080595198f08d1b91d8a82058261d4594ffd0df',
			},
			{
				username: 'user1',
				email: 'user1@test.com',
				password: '123456',
				salt:
					'0a23d660a2858a85fa876884cedd18aa2c7f11be97adf388647bea9c0b3e08a1',
				hash:
					'ace8623a786674e42603bbf7d43c58683c2c6fe667ba73d1e6f04f4740740968989c984bbd1773bfd2b8705ac03d482301a117ee365a5c5e6721d1fb9aadc0f34c59f3c1adaa1646dd325c8a68634138f0d19ff1dc6d8d1369394dbc06a81d34724609231b09dfbb23b41ebf04ba8ad75d337ce73ecc661cb52e5ba1cd797eea8d2fe4cb336eba4ee07abd77a5e102056d876fbb42af28ae5609def5bc5c91c6198ccb2f91c50061402912d5a0457ba72dfdae99d9b34db64dc76c60f21db65a3c48869647b2047975c2ed956f24d39b2aa447f3fab341905826ab60c4f5d92c425eb17c3ee7e19537ad8fafa19c8ee4b8342398ed4ca68a6313114c97f6e842c6c1d435a97e7dec2d6694501c469f846bfbe714bf92d54639579b85f943e51c864635a98c392f82c45cfde95a9af476da121cb5db621cc8f4904ff3d9070057f4fc00a533b0ca1faee08db2413b6bd53ec047d36a5313c55c70b4438efafcfec2299b1520f0b427cd57d00a3d6468f8c8db0db9281c0ad140a503a102bbf39abac95268ba8aedf4b342a04c4726415d8327af0ed42e89ad9080569029d3a564be21fec16c61e5cf53e576fefff4d31466ad4c04f3df4749cc3717ff316a470cd2a50888a8180978c4dacb351ee56ac127cc306faf55c63d1473d716578b0dffb9fe833577dd113af2d85665f080595198f08d1b91d8a82058261d4594ffd0df',
			},
		],
	},
	{
		model: 'Continent',
		documents: [
			{
				continent: 'Europe',
				fairy_name: 'Gary',
				description:
					'Enjoys long beach walks, fine wines and expensive cheeses.',
				create_date: date,
				modified_date: date,
			},
			{
				continent: 'Asia',
				fairy_name: 'Maude',
				description:
					'Longest standing Tooth Inc employee with 567 years of service. Just like your Nanna - if your Nanna drives a dirt-bike. Hobbies include aerial photography while sky-diving and spear-fishing. Once beat the Yeti in arm-wrestling and refuses a rematch. He is certain she cheated, but can\'t figure out how.',
				create_date: date,
				modified_date: date,
			},
			{
				continent: 'Africa',
				fairy_name: 'Sue',
				description:
					'Comes across as aloof and entitled but get to know her and she is the life and sould of every party.',
				create_date: date,
				modified_date: date,
			},
			{
				continent: 'Antarctica',
				fairy_name: 'Nigel',
				description: 'Transferred to Antarctica from the busier European route and still hasn\'t adapted to the cold. When he isn\'t doing pick-ups he can be found eating Cheetos on the couch. The only time he does a pick-up is when the occasional passing cruise ship has a kid aboard - and that kid happens to lose a tooth. A bit of a slob.',
				create_date: date,
				modified_date: date,
			},
			{
				continent: 'North America',
				fairy_name: 'Phil',
				description: 'Named fairy of the year 16 times.',
				create_date: date,
				modified_date: date,
			},
			{
				continent: 'South America',
				fairy_name: 'Mateo',
				description: 'Matteo is a bit of a mummy\'s boy. He likes his steak cooked rare - so he never gets an invite when the other fairies have an assado. Possibly the sweetest fairy you will ever meet.',
				create_date: date,
				modified_date: date,
			},
			{
				continent: 'Oceania',
				fairy_name: 'Maude',
				description: '',
				create_date: date,
				modified_date: date,
			},
		],
	},
	{
		model: 'Booking',
		documents: [
			{
				child_name: 'Arabella',
				username: 'Goldie',
				address: '123 Gorgeous Street',
				city: 'Berlin',
				postcode: '10178',
				country: 'Germany',
				continent: 'Europe',
				teeth: 1,
				currency: 'Euro',
				create_date: date,
				modified_date: date,
				open_status: false,
				review_status: true,
				rating: 10,
				comments: 'Such professionalism!',
			},
			{
				child_name: 'Biyu',
				username: 'user1',
				address:
					'Li Qing Lu Ming Tian Di Yi Cheng 7hao Yuan 2hao Lou 1dan Yuan 201',
				city: 'ChaoYang District',
				postcode: '4003',
				country: 'China',
				continent: 'Asia',
				teeth: 1,
				currency: 'Yuan',
				create_date: date,
				modified_date: date,
				open_status: false,
				review_status: false,
			},
			{
				child_name: 'Golnessa',
				username: 'hope123',
				address: 'No.5, 21st Dt., Gandi St., 1517918314, Tehran, Iran',
				city: 'Tehran',
				postcode: '4003',
				country: 'Iran',
				continent: 'Asia',
				teeth: 1,
				currency: 'Rial',
				create_date: new Date('2020-07-25T02:23:57.684Z'),
				modified_date: new Date('2020-07-25T02:23:57.684Z'),
			},
			{
				child_name: 'Aleksander',
				username: 'boss',
				address: 'Kutuzovskiy Prosp., bld. 23, appt. 8',
				city: ' Moskva',
				postcode: '44093',
				country: 'Russia',
				continent: 'Europe',
				teeth: 1,
				currency: 'Rouble',
				create_date: date,
				modified_date: date,
			},
			{
				child_name: 'Vanshika',
				username: 'theshik',
				address: '45  Habibullah Road, T Nagar',
				city: 'Chennai',
				postcode: '600017',
				country: 'India',
				continent: 'Asia',
				teeth: 1,
				currency: 'Rupee',
				create_date: date,
				modified_date: date,
			},
			{
				child_name: 'Luciana',
				username: 'lulu',
				address: '15 Bueno Street',
				city: 'Mendoza',
				postcode: '4003',
				country: 'Argentina',
				continent: 'South America',
				teeth: 1,
				currency: 'Peso',
				create_date: date,
				modified_date: date,
			},
			{
				child_name: 'Usman',
				username: 'realooze',
				address: '15 Adeolo Hopewel Street',
				city: 'Wamba',
				postcode: '4003',
				country: 'Nigeria',
				continent: 'Africa',
				teeth: 1,
				currency: 'Naira',
				create_date: date,
				modified_date: date,
			},
			{
				child_name: 'Cooper',
				username: 'thecoop',
				address: '34 Koala Way',
				city: 'Tamworth',
				postcode: '2087',
				country: 'Australia',
				continent: 'Oceania',
				teeth: 1,
				currency: 'AUD',
				create_date: date,
				modified_date: date,
			},
			{
				child_name: 'Kai',
				username: 'kooky',
				address: '7456 Blossom Rd',
				city: 'Tokyo',
				postcode: '1234',
				country: 'Japan',
				continent: 'Asia',
				teeth: 1,
				currency: 'Yen',
				create_date: date,
				modified_date: date,
			},
			{
				child_name: 'Thembi',
				username: 'tomboy',
				address: '84 de Waterkant',
				city: 'Cape Town',
				postcode: '4001',
				country: 'South Africa',
				continent: 'Africa',
				teeth: 2,
				currency: 'Rand',
				create_date: date,
				modified_date: date,
			},
			{
				child_name: 'Claudia',
				username: 'Coco',
				address: '84 cours Jean Jaures',
				city: 'Bordeaux',
				postcode: '33800',
				country: 'France',
				continent: 'Europe',
				teeth: 1,
				currency: 'Euro',
				create_date: date,
				modified_date: date,
			},
			{
				child_name: 'Chad',
				username: 'mummzy',
				address: '13 State Drive',
				city: 'Orlando',
				postcode: '33800',
				country: 'United States',
				continent: 'North America',
				teeth: 3,
				currency: 'Euro',
				create_date: date,
				modified_date: date,
			},
			{
				child_name: 'Gisella',
				username: 'solveig1',
				address: '11 Arctic Way',
				city: 'Antarctica',
				postcode: '33800',
				country: 'Antarctica',
				continent: 'Antarctica',
				teeth: 1,
				currency: 'United States Dollar',
				create_date: date,
				modified_date: date,
			},
		],
	},
	{
		model: 'Wish',
		documents: [
			{
				username: 'user1',
				wish: 'I would be so grateful if I could win the lotto',
				create_date: date,
				modified_date: date,
			},
			{
				username: 'user1',
				wish: 'I would also love a pony, that would be amazing',
				open_status: false,
				granted: false,
				create_date: date,
				modified_date: date,
			},
		],
	},
];

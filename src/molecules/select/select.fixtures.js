import generator from 'test/data-generator';
import icons from 'atoms/icon/icon-mapping';

export const FRUITS = [
	{ name: 'Acerola', id: 'acerola' },
	{ name: 'Apple', id: 'apple' },
	{ name: 'Apricots', id: 'apricots' },
	{ name: 'Avocado', id: 'avocado' },
	{ name: 'Banana', id: 'banana' },
	{ name: 'Blackberries', id: 'blackberries' },
	{ name: 'Blackcurrant', id: 'blackcurrant' },
	{ name: 'Blueberries', id: 'blueberries' },
	{ name: 'Breadfruit', id: 'breadfruit' },
	{ name: 'Cantaloupe', id: 'cantaloupe' },
	{ name: 'Carambola', id: 'carambola' },
	{ name: 'Cherimoya', id: 'cherimoya' },
	{ name: 'Cherries', id: 'cherries' },
	{ name: 'Clementine', id: 'clementine' },
	{ name: 'Coconut Meat', id: 'coconut meat' },
	{ name: 'Cranberries', id: 'cranberries' },
	{ name: 'Custard-Apple', id: 'custard-apple' },
	{ name: 'Date Fruit', id: 'date fruit' },
	{ name: 'Durian', id: 'durian' },
	{ name: 'Elderberries', id: 'elderberries' },
	{ name: 'Feijoa', id: 'feijoa' },
	{ name: 'Figs', id: 'figs' },
	{ name: 'Gooseberries', id: 'gooseberries' },
	{ name: 'Grapefruit', id: 'grapefruit' },
	{ name: 'Grapes', id: 'grapes' },
	{ name: 'Guava', id: 'guava' },
	{ name: 'Honeydew Melon', id: 'honeydew melon' },
	{ name: 'Jackfruit', id: 'jackfruit' },
	{ name: 'Java-Plum', id: 'java-plum' },
	{ name: 'Jujube Fruit', id: 'jujube fruit' },
	{ name: 'Kiwifruit', id: 'kiwifruit' },
	{ name: 'Kumquat', id: 'kumquat' },
	{ name: 'Lemon', id: 'lemon' },
	{ name: 'Lime', id: 'lime' },
	{ name: 'Longan', id: 'longan' },
	{ name: 'Loquat', id: 'loquat' },
	{ name: 'Lychee', id: 'lychee' },
	{ name: 'Mandarin', id: 'mandarin' },
	{ name: 'Mango', id: 'mango' },
	{ name: 'Mangosteen', id: 'mangosteen' },
	{ name: 'Mulberries', id: 'mulberries' },
	{ name: 'Nectarine', id: 'nectarine' },
	{ name: 'Olives', id: 'olives' },
	{ name: 'Orange', id: 'orange' },
	{ name: 'Papaya', id: 'papaya' },
	{ name: 'Passion Fruit', id: 'passion fruit' },
	{ name: 'Peaches', id: 'peaches' },
	{ name: 'Pear', id: 'pear' },
	{ name: 'Persimmon', id: 'persimmon' },
	{ name: 'Pitaya (Dragonfruit)', id: 'pitaya (dragonfruit)' },
	{ name: 'Pineapple', id: 'pineapple' },
	{ name: 'Pitanga', id: 'pitanga' },
	{ name: 'Plantain', id: 'plantain' },
	{ name: 'Plums', id: 'plums' },
	{ name: 'Pomegranate', id: 'pomegranate' },
	{ name: 'Prickly Pear', id: 'prickly pear' },
	{ name: 'Prunes', id: 'prunes' },
	{ name: 'Pummelo', id: 'pummelo' },
	{ name: 'Quince', id: 'quince' },
	{ name: 'Raspberries', id: 'raspberries' },
	{ name: 'Rhubarb', id: 'rhubarb' },
	{ name: 'Rose-Apple', id: 'rose-apple' },
	{ name: 'Sapodilla', id: 'sapodilla' },
	{ name: 'Sapote, Mamey', id: 'sapote, mamey' },
	{ name: 'Soursop', id: 'soursop' },
	{ name: 'Strawberries', id: 'strawberries' },
	{ name: 'Sugar-Apple', id: 'sugar-apple' },
	{ name: 'Tamarind', id: 'tamarind' },
	{ name: 'Tangerine', id: 'tangerine' },
	{ name: 'Watermelon', id: 'watermelon' },
];

export function useSyncFruits() {
	return {
		type: 'fruit',
		adapter: {
			getID: (fruit) => fruit.id,
			getLabel: (fruit) => fruit.name,
		},
		fetch: async function fetch({ regex }) {
			return FRUITS.filter(({ name }) => regex.test(name));
		},
	};
}

export function generateSelectOptions() {
	return generator.array(() => {
		const name = generator.name();

		return {
			uuid: generator.id(),
			name,
			icon: generator.pick(icons),
		};
	}, generator.natural({ min: 10, max: 20 }));
}

export const USERS = generateSelectOptions();

export function useAsyncUsers() {
	return {
		type: 'user',
		adapter: {
			getID: (user) => user.uuid,
			getLabel: (user) => user.name,
		},
		fetch: async function fetch({ regex }) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(USERS.filter(({ name }) => regex.test(name)));
				}, 5000);
			});
		},
	};
}

/**
 * @typedef {import("./adapter").SelectAdapter} SelectAdapter
 */

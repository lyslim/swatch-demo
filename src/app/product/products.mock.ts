/**
color label	   waist 	length    	inventory  product(variant) id
burnt greens 	29	      30	      10          001
kahki        	33	      30	     2000         002
denim        	30	      30	     2000         003
kahki        	33	      34	     2000         004
white        	35	      34	     N/A          005
**/

export const product001 = {
	id: '001',
	variantAttributes: [
		{
			key: 'color',
			value: 'burnt greens',
			swatch: {
				url: 'http://www.sceneryexpress.com/images/EX812-2.jpg',
				codes: [
					'#44f720'
				],
				label: 'burnt greens',
			}
		},
		{
			key: 'waist',
			value: '29',
		},
		{
			key: 'length',
			value: '30',
		}
	],
	amount: 10,
};

export const product002 = {
	id: '002',
	variantAttributes: [
		{
			key: 'color',
			value: 'kahki',
			swatch: {
				codes: [
					'#F0E68C'
				],
				label: 'kahki'
			}
		},
		{
			key: 'waist',
			value: '33'
		},
		{
			key: 'length',
			value: '30'
		}
	],
	amount: 2000,
};

export const product003 = {
	id: '003',
	variantAttributes: [
		{
			key: 'color',
			value: 'denim',
			swatch: {
				url: 'http://www.oursupermom.com/wp-content/uploads/2011/11/blue-denim-fabric-closeup-texture.jpg',
				codes: [
					'#4286f4'
				],
				label: 'denim'
			}
		},
		{
			key: 'waist',
			value: '30'
		},
		{
			key: 'length',
			value: "30"
		}
	],
	amount: 2000
};

export const product004 = {
	id: '004',
	variantAttributes: [
		{
			key: 'color',
			value: 'kahki',
			swatch: {
				codes: [
					'#F0E68C'
				],
				label: 'kahki'
			}
		},
		{
			key: 'waist',
			value: '33'
		},
		{
			key: 'length',
			value: '34'
		}
	],
	amount: 2000
};

export const product005 = {
	id: '005',
	variantAttributes: [
		{
			key: 'color',
			value: 'white'
		},
		{
			key: 'waist',
			value: '35'
		},
		{
			key: 'length',
			value: '34'
		}
	],
	amount: null
};

export const products = [
	product001,
	product002,
	product003,
	product004,
	product005,
]

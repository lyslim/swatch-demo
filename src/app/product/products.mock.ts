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
				url: `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533093184&di=4dc747c6cf946ed581bf7e066a754232&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.shejiben.com%2Fcaizhi%2Fday_151020%2F20151021_965e5added6455db654dAoB7AjNfj5SM.jpg`,
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
				url: 'http://www.jituwang.com/uploads/allimg/150924/258217-150924150R462.jpg',
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
				url: `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533093184&di=4dc747c6cf946ed581bf7e066a754232&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.shejiben.com%2Fcaizhi%2Fday_151020%2F20151021_965e5added6455db654dAoB7AjNfj5SM.jpg`,
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
			value: 'white',
			swatch: {
				url: 'https://www.colorcombos.com/images/colors/FFFFFF.png',
				codes: [
					'#ffffff'
				],
				label: 'white',
			}
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

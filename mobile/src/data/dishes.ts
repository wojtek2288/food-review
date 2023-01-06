import Dish from "../responseTypes/Dish";

export const dishes: Dish[] = [
    {
        id: '1',
        name: 'Big Mac',
        restaurantName: 'McDonalds',
        imageUrl: 'https://www.wykop.pl/cdn/c3201142/comment_1598937880cEvGIKhxPh0n4wR1MKSVvb.jpg',
        rating: 9.3,
        description: null,
        tags: [],
        price: 9.99,
    },
    {
        id: '2',
        name: 'Zinger',
        restaurantName: 'Kfc',
        imageUrl: 'https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/new/zinger.png',
        rating: 3.2,
        description: null,
        tags: [],
        price: 9.99,
    },
    {
        id: '3',
        name: 'Italian Bmt',
        restaurantName: 'Subway',
        imageUrl: 'https://i.dayj.com/image/720/food/1899250/italian-bmt-sub.png',
        rating: 6.2,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        tags: [
            {
                id: '1',
                name: 'sandwich',
                colorHex: '#00ff00'
            },
            {
                id: '2',
                name: 'non vegan',
                colorHex: '#FF0000'
            },
            {
                id: '3',
                name: 'fast food',
                colorHex: '#ffa500'
            },
        ],
        price: 15.99,
    },
    {
        id: '4',
        name: 'Super Supreme',
        restaurantName: 'Pizza Hut',
        imageUrl: 'http://i.wpimg.pl/1000x0/products.wpcdn.pl/photos/21298.jpg',
        rating: 7.6,
        description: null,
        tags: [],
        price: 15.99,
    },
    {
        id: '5',
        name: 'Pad Thai',
        restaurantName: 'Thai Wok',
        imageUrl: 'https://pliki.horecatrends.pl/i/01/11/51/011151_r0_940.jpg',
        rating: 8.4,
        description: null,
        tags: [],
        price: 15.99,
    },
    {
        id: '6',
        name: 'Łosoś ze szpinakiem',
        restaurantName: 'North fish',
        imageUrl: 'http://streetfoodpolska.pl/web/wp-content/uploads/2017/09/%C4%9Aoso%C4%97-Stek-Buraczki-North-Fish.jpg',
        rating: 5.2,
        description: null,
        tags: [],
        price: 15.99,
    },
];
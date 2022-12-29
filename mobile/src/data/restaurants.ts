import Restaurant from "../responseTypes/Restaurant";

export const restaurants: Restaurant[] = [
    {
        id: '1',
        name: 'McDonalds',
        imageUrl: 'https://fastfoodwrc.pl/wp-content/uploads/2021/11/mcdonalds-logo.png',
        rating: 9.3,
        description: null,
        tags: [],
    },
    {
        id: '2',
        name: 'Kfc',
        imageUrl: 'https://cdn.galleries.smcloud.net/t/galleries/gf-urM9-FdNU-4STb_kfc-664x442-nocrop.jpg',
        rating: 3.2,
        description: null,
        tags: [],
    },
    {
        id: '3',
        name: 'Subway',
        imageUrl: 'https://marketingprzykawie.pl/wp-content/uploads/2017/10/new-subwayR-retaurants-logo-5-HR.jpg',
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
    },
    {
        id: '4',
        name: 'Pizza Hut',
        imageUrl: 'https://brandingmonitor.pl/wp-content/uploads/2014/12/nowe-logo-pizza-hut.jpg',
        rating: 7.6,
        description: null,
        tags: [],
    },
    {
        id: '5',
        name: 'Thai Wok',
        imageUrl: 'https://play-lh.googleusercontent.com/v337D2KxQzX7Cmwpo3d9bULkATU8RcAcvzoReXlSL8ocliuCQ6DQ6ON2DLQPuD3MzA=w240-h480-rw',
        rating: 8.4,
        description: null,
        tags: [],
    },
];
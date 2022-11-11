import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import { FeedList } from '../components/FeedList';
import FeedDish from '../types/FeedDish';

export default function Feed({ navigation }: RootTabScreenProps<'Feed'>) {

  const dishes: FeedDish[] = [
    {
      id: 1,
      name: 'Big Mac',
      restaurantName: 'McDonalds',
      imageUrl: 'https://www.wykop.pl/cdn/c3201142/comment_1598937880cEvGIKhxPh0n4wR1MKSVvb.jpg',
      rating: 9.3,
    },
    {
      id: 2,
      name: 'Zinger',
      restaurantName: 'Kfc',
      imageUrl: 'https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/Images/Web/new/zinger.png',
      rating: 3.2,
    },
    {
      id: 3,
      name: 'Italian Bmt',
      restaurantName: 'Subway',
      imageUrl: 'https://i.dayj.com/image/720/food/1899250/italian-bmt-sub.png',
      rating: 6.2,
    },
    {
      id: 4,
      name: 'Super Supreme',
      restaurantName: 'Pizza Hut',
      imageUrl: 'http://i.wpimg.pl/1000x0/products.wpcdn.pl/photos/21298.jpg',
      rating: 7.6,
    },
    {
      id: 5,
      name: 'Pad Thai',
      restaurantName: 'Thai Wok',
      imageUrl: 'https://pliki.horecatrends.pl/i/01/11/51/011151_r0_940.jpg',
      rating: 8.4,
    },
  ];

  return (
    <View style={styles.container}>
      <FeedList dishes={dishes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    color: Colors.background,
  },
});

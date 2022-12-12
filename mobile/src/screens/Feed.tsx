import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import { DishesList } from '../components/Dishes/DishesList';
import { useEffect, useState } from 'react';
import Dish from '../responseTypes/Dish';
import { useFeedQuery } from '../api/services';
import { defaultPageSize } from '../constants/Pagination';

export default function Feed({ navigation }: RootTabScreenProps<'Feed'>) {
  const [dishes, setDishes] = useState(new Array<Dish>());
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const paginatedRequest = { pageSize: defaultPageSize, pageCount: currentPage };

  const { response, run } = useFeedQuery(paginatedRequest);

  useEffect(() => {
    run(paginatedRequest);
  }, []);

  useEffect(() => {
    if (response) {
      setDishes([...dishes, ...response.items]);
      // not using isLoading from useFeedQuery to prevent FlatList from changing index
      if (currentPage === 0) {
        setIsLoading(false);
      }
      setCurrentPage(currentPage + 1);
      setTotalCount(response.totalCount);
    }
  }, [response])

  const onEndReached = () => {
    if (currentPage * defaultPageSize >= totalCount || currentPage == 0) {
      return;
    }
    run(paginatedRequest);
  }

  return (
    <View style={styles.container}>
      <DishesList dishes={dishes} isLoading={isLoading} onEndReached={onEndReached} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8 %',
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

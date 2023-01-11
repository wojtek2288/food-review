import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { FeedTabScreenProps, RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import { DishesList } from '../components/Dishes/DishesList';
import { useEffect, useState } from 'react';
import Dish from '../responseTypes/Dish';
import { useFeedQuery } from '../api/services';
import { defaultPageSize } from '../constants/Pagination';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';

export default function Feed({ navigation }: any) {
  const [dishes, setDishes] = useState(new Array<Dish>());
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [tags, setTags] = useState(new Array<string>());
  const feedRequest = {
    pageSize: defaultPageSize,
    pageCount: currentPage,
    sortBy: Array.isArray(sortBy) ? sortBy[0].row : sortBy.row,
    tagIds: tags,
  };

  const { response, run, isLoading } = useFeedQuery(feedRequest);

  useEffect(() => {
    run(feedRequest);
  }, []);

  useEffect(() => {
    if (response) {
      setDishes([...dishes, ...response.items]);
      setCurrentPage(currentPage + 1);
      setTotalCount(response.totalCount);
      console.log(response.items);
    }
  }, [response]);

  const onEndReached = () => {
    if (currentPage * defaultPageSize >= totalCount || currentPage == 0 || isLoading) {
      return;
    }
    run(feedRequest);
  };

  return (
    <View style={styles.container}>
      <DishesList
        dishes={dishes}
        isLoading={isLoading}
        onEndReached={onEndReached}
        navigation={navigation}
        headerComponent={() =>
          isLoading && dishes.length == 0
            ? null
            : <View>
              <Select
                style={styles.select}
                placeholder='Active'
                selectedIndex={sortBy}
                onSelect={index => setSortBy(index)}>
                <SelectItem title='Option 1' />
                <SelectItem title='Option 2' />
                <SelectItem title='Option 3' />
              </Select>
              <Select
                style={styles.select}
                placeholder='Active'
                selectedIndex={sortBy}
                onSelect={index => setSortBy(index)}>
                <SelectItem title='Option 1' />
                <SelectItem title='Option 2' />
                <SelectItem title='Option 3' />
              </Select>
            </View>
        }
      />
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
  selectContainer: {
    flexDirection: 'column',
  },
  select: {
    flex: 1,
  },
});

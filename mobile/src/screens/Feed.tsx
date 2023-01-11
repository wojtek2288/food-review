import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { FeedTabScreenProps, RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import { DishesList } from '../components/Dishes/DishesList';
import { useEffect, useState } from 'react';
import Dish from '../responseTypes/Dish';
import { useFeedQuery, useTagsQuery } from '../api/services';
import { defaultPageSize } from '../constants/Pagination';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { ScrollView } from 'react-native-virtualized-view';
import Tag from '../responseTypes/Tag';

export default function Feed({ navigation }: any) {
  const [dishes, setDishes] = useState(new Array<Dish>());
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState<IndexPath>();
  const [tags, setTags] = useState<Tag[]>(new Array<Tag>());
  const [selectedTags, setSelectedTags] = useState<IndexPath[]>(new Array<IndexPath>());
  const [firstLoading, setFirstLoading] = useState(true);

  const feedRequest = {
    pageSize: defaultPageSize,
    pageCount: currentPage,
    sortBy: sortBy === undefined ? 0 : (Array.isArray(sortBy) ? sortBy[0].row : sortBy.row),
    tagIds: selectedTags.map(idx => tags[idx.row].id),
  };

  const feed = useFeedQuery(feedRequest);
  const tag = useTagsQuery({});

  useEffect(() => {
    feed.run(feedRequest);
    tag.run({});
  }, []);

  useEffect(() => {
    if (feed.response) {
      setDishes([...dishes, ...feed.response.items]);
      setCurrentPage(currentPage + 1);
      setTotalCount(feed.response.totalCount);
      setFirstLoading(false);
      console.log(feed.response.items);
    }
  }, [feed.response]);

  useEffect(() => {
    if (tag.response) {
      setTags(tag.response);
    }
  }, [tag.response])

  const onEndReached = () => {
    if (currentPage * defaultPageSize >= totalCount
      || currentPage == 0
      || feed.isLoading
      || tag.isLoading) {
      return;
    }
    feed.run(feedRequest);
  };

  const onSortChanged = (index: IndexPath) => {
    if (index === sortBy) {
      return;
    }
    setSortBy(index);
    setDishes(new Array<Dish>());
    setCurrentPage(0);
    setTotalCount(0);
    feed.run({
      pageSize: defaultPageSize,
      pageCount: 0,
      sortBy: index.row,
      tagIds: selectedTags.map(idx => tags[idx.row].id),
    });
  }

  const onTagsSelectionChanged = (index: IndexPath[]) => {
    if (!feed.isLoading) {
      setSelectedTags(index);
      setDishes(new Array<Dish>());
      setCurrentPage(0);
      setTotalCount(0);
      feed.run({
        pageSize: defaultPageSize,
        pageCount: 0,
        sortBy: sortBy === undefined ? 0 : sortBy.row,
        tagIds: index.map(idx => tags[idx.row].id),
      });
    }
  }

  const sorts = ["Most popular", "Most recent"];

  return (
    <View style={styles.container}>
      {(feed.isLoading && firstLoading) || tag.isLoading
        ? null
        : <View style={styles.selectContainer}>
          <Select
            style={styles.select}
            placeholder='Sort By'
            selectedIndex={sortBy}
            value={sortBy === undefined ? undefined : sorts[sortBy.row]}
            onSelect={index => {
              if (!Array.isArray(index)) {
                onSortChanged(index);
              }
            }}>
            <SelectItem title={sorts[0]} />
            <SelectItem title={sorts[1]} />
          </Select>
          <Select
            style={styles.select}
            placeholder='Filter'
            selectedIndex={selectedTags}
            multiSelect={true}
            value={selectedTags.map(idx => tags[idx.row].name).join(", ")}
            onSelect={index => {
              if (Array.isArray(index)) {
                onTagsSelectionChanged(index)
              }
            }}>
            {tags.map(t => <SelectItem key={t.id} title={t.name} />)}
          </Select>
        </View>}
      <DishesList
        dishes={dishes}
        isLoading={feed.isLoading}
        onEndReached={onEndReached}
        navigation={navigation}
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
    flexDirection: 'row',
    width: '85 %',
  },
  select: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'red'
  },
});

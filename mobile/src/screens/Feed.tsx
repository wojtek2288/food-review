import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import { DishesList } from '../components/Dishes/DishesList';
import { dishes } from '../data/dishes';

export default function Feed({ navigation }: RootTabScreenProps<'Feed'>) {

  return (
    <View style={styles.container}>
      <DishesList dishes={dishes} />
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

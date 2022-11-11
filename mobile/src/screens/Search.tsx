import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import { RootTabScreenProps } from '../types';

export default function Search({ navigation }: RootTabScreenProps<'Search'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="/screens/Search.tsx" />
      <Pressable
        onPress={() => navigation.navigate('Modal')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
        <FontAwesome
          name="info-circle"
          size={25}
          color={Colors.text}
          style={{ marginRight: 15 }}
        />
      </Pressable>
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

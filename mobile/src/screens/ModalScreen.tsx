import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { View } from 'react-native';
import Colors from '../constants/Colors';
import { Button } from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';
import { ProfileTabScreenProps } from '../types';

export default function ModalScreen({
  navigation,
}: ProfileTabScreenProps<'Modal'>) {
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        onPress={async () => {
          await SecureStore.deleteItemAsync('refreshToken');
          await SecureStore.deleteItemAsync('accessToken');
          await SecureStore.deleteItemAsync('accessTokenExpiration');
          navigation.replace('Profile');
        }}
      >
        Sign Out
      </Button>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.background,
    borderColor: Colors.background,
    borderRadius: 10,
    width: '60 %',
  },
});

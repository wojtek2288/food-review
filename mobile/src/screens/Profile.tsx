import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { ProfileTabScreenProps } from '../types';
import { useSignIn } from '../hooks/useSignIn';
import { Spinner } from '@ui-kitten/components';

export default function Profile({
  navigation,
}: ProfileTabScreenProps<'Profile'>) {
  const { isLoading, isAuthenticated, run } = useSignIn();

  useEffect(() => {
    run();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated === true) {
        navigation.replace('MyProfile');
      } else if (isAuthenticated === false) {
        navigation.replace('Login');
      }
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Spinner status='warning' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

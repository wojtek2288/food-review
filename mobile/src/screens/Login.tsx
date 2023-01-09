import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, View, Image } from 'react-native';
import { ProfileTabScreenProps } from '../types';
import { Button, Input, Spinner } from '@ui-kitten/components';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSignIn } from '../hooks/useSignIn';

export default function Login({ navigation }: ProfileTabScreenProps<'Login'>) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const { isLoading, isAuthenticated, run, error } = useSignIn();

  useEffect(() => {
    run();
  }, []);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigation.replace('MyProfile');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error !== null) {
      setShowError(true);
    }
  }, [error]);

  const renderIcon = () => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      {secureTextEntry ? (
        <Feather name='eye-off' size={24} color={Colors.darkText} />
      ) : (
        <Feather name='eye' size={24} color={Colors.darkText} />
      )}
    </TouchableWithoutFeedback>
  );

  return (
    <>
      {isLoading && !buttonClicked
        ? <View style={styles.container}>
          <Spinner status='warning' />
        </View>
        : <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../assets/images/logo.png')}
              />
            </View>
            <View style={styles.loginContainer}>
              <View style={styles.loginTopConatiner}>
                <KeyboardAwareScrollView
                  contentContainerStyle={styles.inputsContainer}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.signInText}>Sign In</Text>
                  {showError ? (
                    <Text style={styles.errorText}>
                      Invalid username or password
                    </Text>
                  ) : null}
                  <Input
                    placeholder='Username'
                    label='Username'
                    value={username}
                    onChangeText={(nextValue) => setUsername(nextValue)}
                    size='large'
                    style={styles.input}
                  />
                  <Input
                    placeholder='Password'
                    value={password}
                    label='Password'
                    secureTextEntry={secureTextEntry}
                    accessoryRight={renderIcon}
                    onChangeText={(nextValue) => setPassword(nextValue)}
                    size='large'
                    style={styles.input}
                  />
                  {isLoading ? (
                    <Spinner style={styles.spinner} status='warning' />
                  ) : (
                    <Button
                      style={styles.button}
                      onPress={() => {
                        setButtonClicked(true);
                        run({ username: username, password: password });
                      }
                      }
                    >
                      Sign In
                    </Button>
                  )}
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#414a4c' }}>
                      Don't have an account ?{' '}
                    </Text>
                    {/* you can use also .replace */}
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Register')}
                    >
                      <Text style={{ color: Colors.background }}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAwareScrollView>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100 %',
    backgroundColor: 'white',
  },
  inputsContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100 %',
  },
  logo: {
    width: '40 %',
    height: '65 %',
  },
  loginContainer: {
    flex: 2.4,
    width: '100 %',
    backgroundColor: 'white',
  },
  loginTopConatiner: {
    flex: 1,
    alignItems: 'center',
    width: '100 %',
    height: '100 %',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#ececec',
  },
  signInText: {
    fontWeight: '600',
    fontSize: 24,
    marginBottom: '6 %',
    color: '#414a4c',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: '3 %',
  },
  input: {
    marginBottom: '4 %',
    borderRadius: 10,
    width: '80 %',
  },
  button: {
    backgroundColor: Colors.background,
    borderColor: Colors.background,
    borderRadius: 10,
    marginTop: '8 %',
    marginBottom: '8 %',
    flex: 0.08,
    alignSelf: 'stretch',
  },
  spinner: {
    marginTop: '8 %',
    marginBottom: '8 %',
  },
});

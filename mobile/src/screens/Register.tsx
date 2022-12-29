import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, View, Image } from 'react-native';
import { ProfileTabScreenProps, RootTabScreenProps } from '../types';
import { Button, Input, Spinner } from '@ui-kitten/components';
import { AntDesign, Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRegisterCommand } from '../api/services';
import { forEach } from 'lodash';
import { useSignIn } from '../hooks/useSignIn';

export default function Register({
  navigation,
}: ProfileTabScreenProps<'Register'>) {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const registerRequest = {
    email: email,
    username: username,
    password: password,
  };

  const {
    run: registerRun,
    error: registerError,
    requestSuccessful: registerRequestSuccessful,
    isLoading: registerLoading,
  } = useRegisterCommand(registerRequest);

  const {
    isLoading: loginLoading,
    isAuthenticated,
    run: loginRun,
  } = useSignIn();

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

  const signIn = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    registerRun(registerRequest);
  };

  useEffect(() => {
    if (registerError !== null) {
      forEach(registerError, (err) => {
        switch (err.PropertyName) {
          case 'Email':
            setEmailError(err.ErrorMessage);
            break;
          case 'Password':
            setPasswordError(err.ErrorMessage);
            break;
          case 'Username':
            setUsernameError(err.ErrorMessage);
            break;
        }
      });
    }
  }, [registerError]);

  useEffect(() => {
    if (registerRequestSuccessful === true) {
      loginRun({ username: username, password: password });
    }
  }, [registerRequestSuccessful]);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('MyProfile');
    }
  }, [isAuthenticated]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={{ position: 'absolute', left: '5 %', top: '24 %' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <AntDesign
                name='leftcircleo'
                size={45}
                color={Colors.background}
              />
            </TouchableOpacity>
          </View>
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
              <Text style={styles.signInText}>Sign Up</Text>
              {emailError !== null ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
              <Input
                placeholder='Email address'
                label='Email address'
                value={email}
                onChangeText={(nextValue) => {
                  setEmail(nextValue);
                  setEmailError(null);
                }}
                size='large'
                status={emailError ? 'danger' : undefined}
                style={styles.input}
              />
              {usernameError !== null ? (
                <Text style={styles.errorText}>{usernameError}</Text>
              ) : null}
              <Input
                placeholder='Username'
                label='Username'
                value={username}
                onChangeText={(nextValue) => {
                  setUsername(nextValue);
                  setUsernameError(null);
                }}
                size='large'
                status={usernameError !== null ? 'danger' : undefined}
                style={styles.input}
              />
              {passwordError !== null ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
              <Input
                placeholder='Password'
                value={password}
                label='Password'
                secureTextEntry={secureTextEntry}
                accessoryRight={renderIcon}
                onChangeText={(nextValue) => {
                  setPassword(nextValue);
                  setPasswordError(null);
                }}
                size='large'
                status={passwordError ? 'danger' : undefined}
                style={styles.input}
              />
              <Input
                placeholder='Confirm password'
                value={confirmPassword}
                label='Confirm password'
                secureTextEntry={secureTextEntry}
                accessoryRight={renderIcon}
                onChangeText={(nextValue) => {
                  setConfirmPassword(nextValue);
                  setPasswordError(null);
                }}
                size='large'
                style={styles.input}
              />
              {registerLoading || loginLoading ? (
                <Spinner status='warning' />
              ) : (
                <Button style={styles.button} onPress={() => signIn()}>
                  Sign Up
                </Button>
              )}
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#414a4c' }}>
                  Already have an account ?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={{ color: Colors.background }}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 0.5,
    flexDirection: 'column',
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
    height: '100 %',
  },
  logo: {
    width: '22 %',
    height: '60 %',
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
    marginBottom: '5 %',
    color: '#414a4c',
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
    marginTop: '3 %',
    marginBottom: '4 %',
    flex: 0.08,
    alignSelf: 'stretch',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: '1 %',
  },
});

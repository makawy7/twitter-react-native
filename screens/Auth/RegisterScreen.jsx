import {
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuthContext } from '../../context/AuthProvider';
import logo from '../../assets/logo.png';
import { useState } from 'react';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { error, loading } = useAuthContext();

  function register(email, username, password, confirmPassword) {
    Alert.alert('Register logic here!');
  }
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
        <View style={styles.inputBoxContainer}>
          {error && <Text style={{ color: '#B00020' }}>{error}</Text>}
          <TextInput
            style={styles.inputBox}
            onChangeText={setName}
            value={name}
            placeholder="Name"
            placeholderTextColor="gray"
            textContentType="name"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="gray"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            placeholderTextColor="gray"
            textContentType="username"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="gray"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => register(email, username, password, confirmPassword)}
          disabled={loading}
        >
          {loading && (
            <ActivityIndicator
              style={{ position: 'absolute', left: '35%' }}
              size="small"
              color="white"
            />
          )}
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
            <Text style={styles.registerTextLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d9bf1',
  },
  subContainer: {
    width: '65%',
  },
  logoContainer: { alignItems: 'center' },
  logo: {
    width: 120,
    height: 120,
  },
  inputBoxContainer: { marginTop: 18, gap: 8 },
  inputBox: {
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 6,
  },
  loginButton: {
    flexDirection: 'row',
    backgroundColor: '#0084b3',
    padding: 12,
    borderRadius: 5,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: { color: 'white' },
  registerContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 3,
    justifyContent: 'center',
  },
  registerText: { color: 'white', fontSize: 13 },
  registerTextLink: {
    color: 'white',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});
export default RegisterScreen;

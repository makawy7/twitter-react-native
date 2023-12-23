import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useAuthContext } from '../../context/AuthProvider';
import logo from '../../assets/logo.png';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuthContext();

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
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="gray"
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => login(email, password)}
          disabled={loading}
        >
          {loading && (
            <ActivityIndicator
              style={{ position: 'absolute', left: '35%' }}
              size="small"
              color="white"
            />
          )}
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register Screen')}
          >
            <Text style={styles.registerTextLink}>Register</Text>
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

export default LoginScreen;

import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useAuthContext } from '../../context/AuthProvider';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is login screen</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        placeholderTextColor="gray"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="gray"
        autoCapitalize="none"
        secureTextEntry={true}
        style={styles.input}
      />
      <Button onPress={() => login(email, password)} title="Login" />
      <Button
        onPress={() => navigation.navigate('Register Screen')}
        title="Register"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 30,
    borderWidth: 1,
  },
});

export default LoginScreen;

import { Button, Text, View } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is register screen</Text>
      <Button
        onPress={() => navigation.navigate('Login Screen')}
        title="Login"
      />
    </View>
  );
};

export default RegisterScreen;

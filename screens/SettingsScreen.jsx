import { View, Text, Button } from 'react-native';
import { useAuthContext } from '../context/AuthProvider';

export default function SettingsScreen() {
  const { logout } = useAuthContext();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SettingsScreen</Text>
      <Button onPress={() => logout()} title="Logout" />
    </View>
  );
}

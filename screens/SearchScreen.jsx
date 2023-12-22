import { Text, View } from 'react-native';
import { useAuthContext } from '../context/AuthProvider';

export default function SearchScreen() {
  const { user } = useAuthContext();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{user.name}</Text>
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
    </View>
  );
}

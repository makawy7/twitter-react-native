import { Button, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen / Feed</Text>
      <Button
        title="New Tweet"
        onPress={() => navigation.navigate('New Tweet')}
      />
      <Button
        title="Tweet Screen"
        onPress={() => navigation.navigate('Tweet Screen')}
      />
      <Button
        title="Profile Screen"
        onPress={() => navigation.navigate('Profile Screen')}
      />
    </View>
  );
}
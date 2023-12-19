import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function NewTweet({ navigation }) {
  const [tweet, setTweet] = useState('');
  const sendTweet = () => {
    navigation.navigate('Tab');
  };
  return (
    <View style={styles.container}>
      <View style={styles.tweetButtonContainer}>
        <Text style={tweet.length > 250 ? styles.textRed : styles.colorGray}>
          Characters left: {280 - tweet.length}
        </Text>
        <TouchableOpacity
          onPress={() => sendTweet()}
          style={styles.tweetButton}
        >
          <Text style={styles.tweetButtonText}>Tweet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tweetBoxContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={setTweet}
          value={tweet}
          placeholder="What's Happening?"
          placeholderTextColor="gray"
          multiline
          maxLength={280}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  colorGray: {
    color: 'gray',
  },
  textRed: {
    color: 'red',
  },
  ml4: {
    marginLeft: 4,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tweetButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tweetButton: {
    backgroundColor: '#1d9bf1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tweetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 8,
    marginTop: 10,
    borderRadius: 21,
  },
  tweetBoxContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 18,
    lineHeight: 28,
    padding: 10,
  },
});

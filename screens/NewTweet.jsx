import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axiosInstance from '../utils/axiosConfig';
import { useAuthContext } from '../context/AuthProvider';

export default function NewTweet({ navigation }) {
  const [tweet, setTweet] = useState('');
  const [loading, isLoading] = useState(false);
  const { user } = useAuthContext();

  const sendTweet = () => {
    if (tweet.length === 0) {
      Alert.alert('Please enter a tweet!');
      return;
    }

    isLoading(true);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    axiosInstance
      .post('/tweets', {
        body: tweet,
      })
      .then(() => {
        navigation.navigate('Home Screen', {
          newTweetAdded: true,
        });
        isLoading(false);
      })
      .catch((err) => {
        console.log(err);
        isLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tweetButtonContainer}>
        <Text style={tweet.length > 250 ? styles.textRed : styles.colorGray}>
          Characters left: {280 - tweet.length}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {loading && (
            <ActivityIndicator style={{ marginRight: 4 }} color="gray" />
          )}
          <TouchableOpacity
            onPress={() => sendTweet()}
            style={styles.tweetButton}
            disabled={loading}
          >
            <Text
              style={
                loading
                  ? { ...styles.buttonDisabled, ...styles.tweetButtonText }
                  : styles.tweetButtonText
              }
            >
              Tweet
            </Text>
          </TouchableOpacity>
        </View>
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
  buttonDisabled: {
    opacity: 0.5,
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

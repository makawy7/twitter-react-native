import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import formatDistance from '../utils/formatDistanceCustom';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllTweets();
  }, []);

  const getAllTweets = () => {
    axios
      .get('http://192.168.1.6:8001/api/tweets')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const goToProfile = () => {
    navigation.navigate('Profile Screen');
  };
  const goToSingleTweet = () => {
    navigation.navigate('Tweet Screen');
  };
  const goToNewTweet = () => {
    navigation.navigate('New Tweet');
  };

  const renderItem = ({ item: tweet }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => goToProfile()}>
        <Image
          style={styles.avatar}
          source={{
            uri: tweet?.user?.avatar,
          }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => goToSingleTweet()}
        >
          <Text numberOfLines={1} style={styles.tweetName}>
            {tweet?.user?.name}
          </Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            @{tweet?.user?.username}
          </Text>
          <Text>&middot;</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            {formatDistanceToNowStrict(tweet.created_at, {
              locale: {
                ...locale,
                formatDistance,
              },
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tweetContentContainer}
          onPress={() => goToSingleTweet()}
        >
          <Text style={styles.tweetContent}>{tweet.body}</Text>
        </TouchableOpacity>

        <View style={styles.tweetEngagement}>
          <TouchableOpacity style={styles.flexRow}>
            <EvilIcons
              name="comment"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>32</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flexRow}>
            <EvilIcons
              name="retweet"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>5,456</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flexRow}>
            <EvilIcons
              name="heart"
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
            <Text style={styles.textGray}>456</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flexRow}>
            <EvilIcons
              name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
              size={22}
              color="gray"
              style={{ marginRight: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(tweet) => tweet.id}
        ItemSeparatorComponent={() => (
          <View style={styles.tweetSeperator}></View>
        )}
      />
      <TouchableOpacity
        onPress={() => goToNewTweet()}
        style={styles.floatingButton}
      >
        <AntDesign name="plus" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexRow: {
    flexDirection: 'row',
  },
  textGray: {
    color: 'gray',
  },
  tweetContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  tweetSeperator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 8,
    borderRadius: 21,
  },
  tweetName: {
    fontWeight: 'bold',
    marginRight: 2,
    color: '#222222',
  },
  tweetHandle: {
    marginHorizontal: 6,
  },
  tweetContentContainer: {
    marginTop: 4,
  },
  tweetContent: {
    lineHeight: 20,
  },
  tweetEngagement: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d9bf1',
    position: 'absolute',
    right: 12,
    bottom: 20,
  },
});

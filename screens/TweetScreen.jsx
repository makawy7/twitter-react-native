import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { Modalize } from 'react-native-modalize';
import { format } from 'date-fns';
import { AntDesign } from '@expo/vector-icons';
import { useAuthContext } from '../context/AuthProvider';

export default function TweetScreen({ route, navigation }) {
  const { tweetId } = route.params;
  const [tweet, setTweet] = useState({});
  const [loading, setLoading] = useState(true);
  const modalizeRef = useRef(null);
  const { user } = useAuthContext();

  useEffect(() => {
    axiosInstance
      .get(`/tweets/${tweetId}`)
      .then((res) => {
        setTweet(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const goToProfile = (userId) => {
    navigation.navigate('Profile Screen', { userId });
  };

  const deleteTweet = () => {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    axiosInstance
      .delete(`/tweets/${tweetId}`)
      .then((res) => {
        Alert.alert('Tweet has been deleted.');
        navigation.navigate('Home Screen', {
          tweetDeleted: true,
        });
      })
      .catch((err) => console.log(err));
  };

  const showAlert = () => {
    Alert.alert('Delete this tweet?', null, [
      {
        text: 'Confirm',
        style: 'default',
        onPress: () => deleteTweet(),
      },
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => modalizeRef.current?.close(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <>
          <View>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() => {
                  goToProfile(tweet.user.id);
                }}
                style={styles.flexRow}
              >
                <Image
                  style={styles.avatar}
                  source={{
                    uri: tweet.user.avatar,
                  }}
                />
                <View>
                  <Text style={styles.tweetName}>{tweet.user.name}</Text>
                  <Text style={styles.tweetHandle}>@{tweet.user.username}</Text>
                </View>
              </TouchableOpacity>
              {tweet.user.id === user.id && (
                <TouchableOpacity onPress={() => modalizeRef.current?.open()}>
                  <Entypo name="dots-three-vertical" size={20} color="gray" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.tweetContentContainer}>
              <Text style={styles.tweetContent}>{tweet.body}</Text>
              <View style={styles.tweetTimestampContainer}>
                <Text style={styles.fontGray}>
                  {format(new Date(tweet.created_at), 'h:mm a')}
                </Text>
                <Text style={styles.fontGray}>&middot;</Text>
                <Text style={styles.fontGray}>
                  {' '}
                  {format(new Date(tweet.created_at), 'd MMM yy')}
                </Text>
                <Text style={styles.fontGray}>&middot;</Text>
                <Text style={styles.linkColor}>Twitter for iPhone</Text>
              </View>
            </View>

            <View style={styles.tweetEngagement}>
              <View style={[styles.flexRow, styles.gap4]}>
                <Text style={styles.fontBold}>628</Text>
                <Text style={styles.fontGray}>Retweets</Text>
              </View>
              <View style={[styles.flexRow, styles.gap4]}>
                <Text style={styles.fontBold}>38</Text>
                <Text style={styles.fontGray}>Quote tweets</Text>
              </View>
              <View style={[styles.flexRow, styles.gap4]}>
                <Text style={styles.fontBold}>2,628</Text>
                <Text style={styles.fontGray}>Likes</Text>
              </View>
            </View>

            <View style={[styles.tweetEngagement, styles.spaceAround]}>
              <TouchableOpacity style={styles.flexRow}>
                <EvilIcons
                  name="comment"
                  size={32}
                  color="gray"
                  style={{ marginRight: 2 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.flexRow}>
                <EvilIcons
                  name="retweet"
                  size={32}
                  color="gray"
                  style={{ marginRight: 2 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.flexRow}>
                <EvilIcons
                  name="heart"
                  size={32}
                  color="gray"
                  style={{ marginRight: 2 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.flexRow}>
                <EvilIcons
                  name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
                  size={32}
                  color="gray"
                  style={{ marginRight: 2 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Modalize
            adjustToContentHeight
            childrenStyle={{ height: 180 }}
            ref={modalizeRef}
            snapPoint={180}
          >
            <View style={styles.menuButtonContainer}>
              <TouchableOpacity style={styles.menuButton}>
                <AntDesign name="pushpino" size={24} color="black" />
                <Text style={styles.menuButtonText}>Pin Tweet</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={showAlert} style={styles.menuButton}>
                <AntDesign name="delete" size={24} color="black" />
                <Text style={styles.menuButtonText}>Delete Tweet</Text>
              </TouchableOpacity>
            </View>
          </Modalize>
        </>
      )}
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
  gap4: {
    gap: 4,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  fontGray: {
    color: 'gray',
  },
  linkColor: {
    color: '#1d9bf1',
  },
  spaceAround: { justifyContent: 'space-around' },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 8,
  },
  tweetName: {
    fontWeight: 'bold',
    color: '#222222',
  },
  tweetHandle: {
    color: 'gray',
    marginTop: 1,
  },
  tweetContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tweetContent: {
    fontSize: 20,
    lineHeight: 30,
  },
  tweetEngagement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tweetTimestampContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
  },
  menuButtonContainer: { paddingHorizontal: 24, paddingVertical: 32, gap: 32 },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuButtonText: {
    fontSize: 20,
    color: '#222',
  },
});

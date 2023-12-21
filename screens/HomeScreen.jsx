import {
  ActivityIndicator,
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
import axiosInstance from '../utils/axiosConfig';
import { useEffect, useRef, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import formatDistance from '../utils/formatDistanceCustom';

export default function HomeScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    getAllTweets();
  }, [page]);

  // a new tweet has been submitted
  useEffect(() => {
    if (route.params?.newTweetAdded) {
      page !== 1 ? setPage(1) : getAllTweets();
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      navigation.setParams({ newTweetAdded: false });
    }
  }, [route.params?.newTweetAdded]);

  const getAllTweets = () => {
    axiosInstance
      .get(`/tweets?page=${page}`)
      .then((res) => {
        if (page === 1) {
          setData(res.data.data);
        } else {
          setData([...data, ...res.data.data]);
        }

        if (!res.data.next_page_url) {
          setIsLastPage(true);
        } else {
          setIsLastPage(false);
        }

        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (page !== 1) {
      //this will trigger getAllTweets() inside useEffect
      setPage(1);
      return;
    }
    getAllTweets();
  };

  const handleEnd = () => {
    if (!isLastPage) {
      setPage(page + 1);
    }
  };

  const goToProfile = (userId) => {
    navigation.navigate('Profile Screen', { userId });
  };

  const goToSingleTweet = (tweetId) => {
    navigation.navigate('Tweet Screen', {
      tweetId,
    });
  };
  
  const goToNewTweet = () => {
    navigation.navigate('New Tweet');
  };

  const renderItem = ({ item: tweet }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => goToProfile(tweet.user.id)}>
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
          onPress={() => goToProfile(tweet.user.id)}
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
          onPress={() => goToSingleTweet(tweet.id)}
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
      {isLoading === true ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={(tweet) => tweet.id}
          ItemSeparatorComponent={() => (
            <View style={styles.tweetSeperator}></View>
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={0}
          ListFooterComponent={() =>
            !isLastPage && <ActivityIndicator size="large" color="gray" />
          }
        />
      )}
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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

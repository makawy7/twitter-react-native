import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import RenderItem from '../components/RenderItem';
import axiosInstance from '../utils/axiosConfig';
import { AntDesign } from '@expo/vector-icons';
import { useAuthContext } from '../context/AuthProvider';

export default function SearchScreen({ route, navigation }) {
  const { user } = useAuthContext();
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
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    axiosInstance
      .get(`/tweets_all?page=${page}`)
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

  const goToNewTweet = () => {
    navigation.navigate('New Tweet');
  };

  return (
    <View style={styles.container}>
      {isLoading === true ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={(props) => <RenderItem {...props} />}
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
  tweetSeperator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
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

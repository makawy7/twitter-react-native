import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import RenderItem from '../components/RenderItem';
import { EvilIcons } from '@expo/vector-icons';
import axiosInstance from '../utils/axiosConfig';
import { format } from 'date-fns';

export default function ProfileScreen({ route, navigation }) {
  const { userId } = route.params;
  const [user, setUser] = useState({});
  const [userTweets, setUserTweets] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [userTweetsFirstLoad, setUserTweetsFirstLoad] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUserTweets();
  }, [page]);

  const getUser = () => {
    axiosInstance
      .get(`/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        setProfileLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setProfileLoading(false);
      });
  };

  const getUserTweets = () => {
    axiosInstance
      .get(`/users/${userId}/tweets?page=${page}`)
      .then((res) => {
        page === 1
          ? setUserTweets(res.data.data)
          : setUserTweets([...userTweets, ...res.data.data]);
        !res.data.next_page_url ? setIsLastPage(true) : setIsLastPage(false);
        setUserTweetsFirstLoad(false);
        setIsRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
        setUserTweetsFirstLoad(false);
        setIsRefreshing(false);
      });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (page !== 1) {
      setPage(1);
      return;
    }
    getUserTweets();
  };

  const handleEnd = () => {
    if (userTweetsFirstLoad || isLastPage) return;
    setPage(page + 1);
  };

  const ProfileHeader = () =>
    profileLoading ? (
      <View style={styles.container}>
        <ActivityIndicator style={styles.mt4} size="large" color="gray" />
      </View>
    ) : (
      <View style={styles.seperator}>
        <Image
          style={styles.backgroundImage}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />

        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: user.avatar,
            }}
          />
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileHandle}>@{user.username}</Text>
        </View>

        <View style={styles.profileContainer}>
          <Text style={styles.profileContainerText}>{user.profile}</Text>
        </View>

        <View style={styles.locationContainer}>
          <EvilIcons name="location" size={24} color="gray" />
          <Text style={styles.textGray}>{user.location}</Text>
        </View>

        <View style={styles.linkContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL(user.link)}
            style={styles.linkItem}
          >
            <EvilIcons name="link" size={24} color="gray" />
            <Text style={styles.linkColor}>{user.link_text}</Text>
          </TouchableOpacity>
          <View style={styles.linkItem}>
            <EvilIcons name="calendar" size={24} color="gray" />
            <Text style={styles.textGray}>
              Joined {format(new Date(user.created_at), 'MMM yyyy')}
            </Text>
          </View>
        </View>

        <View style={styles.followContainer}>
          <TouchableOpacity style={styles.followItem}>
            <Text style={styles.followItemNumber}>409</Text>
            <Text>Following</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.followItem}>
            <Text style={styles.followItemNumber}>2,354</Text>
            <Text>Followers</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

  return (
    <FlatList
      style={styles.container}
      data={userTweets}
      keyExtractor={(item) => item.id}
      renderItem={(props) => <RenderItem {...props} />}
      ItemSeparatorComponent={() => <View style={styles.tweetSeperator}></View>}
      ListHeaderComponent={ProfileHeader}
      ListEmptyComponent={() =>
        profileLoading || <ActivityIndicator size="large" color="gray" />
      }
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReached={handleEnd}
      onEndReachedThreshold={0}
      ListFooterComponent={() =>
        isLastPage ||
        userTweetsFirstLoad || <ActivityIndicator size="large" color="gray" />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  textGray: {
    color: 'gray',
  },
  flexRow: {
    flexDirection: 'row',
  },
  mt4: {
    marginTop: 10,
  },
  backgroundImage: {
    width: '100%',
    height: 120,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
  },
  profileImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: -34,
    paddingHorizontal: 10,
  },
  followButton: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  nameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  profileHandle: {
    color: 'gray',
    marginTop: 1,
  },
  profileContainer: {
    paddingHorizontal: 10,
    marginTop: 8,
  },
  profileContainerText: {
    lineHeight: 22,
  },
  locationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 4,
    gap: 10,
  },
  linkColor: {
    color: '#1d9bf1',
  },
  linkItem: {
    flexDirection: 'row',
  },
  followContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 14,
  },
  followItem: {
    flexDirection: 'row',
    gap: 4,
  },
  followItemNumber: {
    fontWeight: 'bold',
  },
  seperator: { borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
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
});

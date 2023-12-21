import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import axiosInstance from '../utils/axiosConfig';
import { useEffect, useState } from 'react';
import { format, formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import formatDistance from '../utils/formatDistanceCustom';

export default function ProfileScreen({ route, navigation }) {
  const { userId } = route.params;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axiosInstance
      .get(`/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const ProfileHeader = () => (
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

  const renderItem = ({ item: tweet }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => goToProfile(user.id)}>
        <Image
          style={styles.avatar}
          source={{
            uri: user.avatar,
          }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => goToProfile(user.id)}
        >
          <Text numberOfLines={1} style={styles.tweetName}>
            {user.name}
          </Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            @{user.username}
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

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  ) : (
    <FlatList
      style={styles.container}
      data={user.tweets}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.tweetSeperator}></View>}
      ListHeaderComponent={ProfileHeader}
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

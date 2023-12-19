import { FlatList, Image, Linking, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    title: 'First Item',
  },
  {
    id: '2',
    title: 'Second Item',
  },
  {
    id: '3',
    title: 'Third Item',
  },
  {
    id: '4',
    title: 'Fourth Item',
  },
  {
    id: '5',
    title: 'Fifth Item',
  },
  {
    id: '6',
    title: 'Sixth Item',
  },
  {
    id: '7',
    title: 'Seventh Item',
  },
  {
    id: '8',
    title: 'Eight Item',
  },
  {
    id: '9',
    title: 'Ninth Item',
  },
  {
    id: '10',
    title: 'Tenth Item',
  },
];

export default function ProfileScreen() {
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
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.profileName}>Abdallah</Text>
        <Text style={styles.profileHandle}>@username</Text>
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.profileContainerText}>
          CEO of CEOs. PhD, MSc, SEO, HTML, CSS, JS Evangelist Pro Expert S Rank
          Elite Best of the best.
        </Text>
      </View>

      <View style={styles.locationContainer}>
        <EvilIcons name="location" size={24} color="gray" />
        <Text style={styles.textGray}>Toronto, Canada</Text>
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://laracasts.com/')}
          style={styles.linkItem}
        >
          <EvilIcons name="link" size={24} color="gray" />
          <Text style={styles.linkColor}>laracasts.com</Text>
        </TouchableOpacity>
        <View style={styles.linkItem}>
          <EvilIcons name="calendar" size={24} color="gray" />
          <Text style={styles.textGray}>Joined March 2009</Text>
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

  const renderItem = ({ item }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => goToProfile()}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => goToSingleTweet()}
        >
          <Text numberOfLines={1} style={styles.tweetName}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            @username
          </Text>
          <Text>&middot;</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            9m
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tweetContentContainer}
          onPress={() => goToSingleTweet()}
        >
          <Text style={styles.tweetContent}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam aut
            vel modi quia maxime doloribus ipsa mollitia, eum at eveniet.
          </Text>
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
    <FlatList
      style={styles.container}
      data={data}
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

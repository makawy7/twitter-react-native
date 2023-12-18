import { Image, StyleSheet, Text, View } from 'react-native';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TweetScreen({ navigation }) {
  const goToProfile = () => {
    navigation.navigate('Profile Screen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity
          onPress={() => {
            goToProfile();
          }}
          style={styles.flexRow}
        >
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
          <View>
            <Text style={styles.tweetName}>Abdallah</Text>
            <Text style={styles.tweetHandle}>@username</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.tweetContentContainer}>
        <Text style={styles.tweetContent}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, quasi
          id architecto aliquid iure quidem! Praesentium vel, alias corporis
          doloremque minus aspernatur, quisquam ex inventore, laudantium
          voluptatum adipisci! Minus, aliquid.
        </Text>
      </View>

      <View style={styles.tweetEngagement}>
        <View style={[styles.flexRow, styles.gap4]}>
          <Text style={styles.fontBold}>628</Text>
          <Text style={styles.fontGray}>Retweets</Text>
        </View>
        <View style={[styles.flexRow, styles.gap4]}>
          <Text style={styles.fontBold}>628</Text>
          <Text style={styles.fontGray}>Retweets</Text>
        </View>
        <View style={[styles.flexRow, styles.gap4]}>
          <Text style={styles.fontBold}>628</Text>
          <Text style={styles.fontGray}>Retweets</Text>
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
});

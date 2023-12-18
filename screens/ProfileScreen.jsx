import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />

      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  textGray: {
    color: 'gray',
  },
  backgroundImage: {
    width: '100%',
    height: 120,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
  },
  avatarContainer: {
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
});

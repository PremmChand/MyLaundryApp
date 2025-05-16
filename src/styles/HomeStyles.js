import { Pressable, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 20,
    marginTop: 50,
  },
  containerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    padding: 10
  },
  homeText: {
    fontSize: 18,
    fontWeight: "600"
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  pressableImage: {
    marginLeft: "auto",
    marginRight: 7
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchInputView: {
    padding: 5,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 16,
  },
  bottomPressable: {
    backgroundColor: "#088F8F",
    padding: 10,
    marginBottom: 40,
    margin: 15,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bottomText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
  bottomText1: {
    fontSize: 13,
    fontWeight: "400",
    color: "white",
    marginVertical:6
  },
  bottomText2: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },

});

export default styles;
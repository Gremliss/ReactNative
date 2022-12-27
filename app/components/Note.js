import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../misc/colors";

const Note = ({ item, onPress, onLongPress, user }) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container(user.color)}
    >
      <Text numberOfLines={2} style={styles.tite}>
        {title}
      </Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: (colorUser) => {
    return {
      backgroundColor: colorUser || colors.PRIMARY,
      width: width / 2 - 10,
      padding: 8,
      borderRadius: 10,
    };
  },
  tite: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.LIGHT,
  },
});

export default Note;

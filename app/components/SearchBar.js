import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../misc/colors";

const SearchBar = ({ containerStyle, value, onClear, onChangeText, user }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar(user.color)}
        placeholder="Search"
      ></TextInput>
      {value ? (
        <AntDesign
          name="close"
          size={20}
          color={colors.PRIMARY}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
  },
  searchBar: (colorUser) => {
    return {
      borderWidth: 0.5,
      borderColor: colorUser || colors.PRIMARY,
      height: 40,
      borderRadius: 40,
      paddingLeft: 15,
      fontSize: 20,
    };
  },
  clearIcon: {
    position: "absolute",
    right: 10,
    alignContent: "center",
  },
});

export default SearchBar;

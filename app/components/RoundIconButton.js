import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../misc/colors";

const RoundIconBtn = ({ antIconName, size, color, style, onPress, user }) => {
  var colorUser = colors.PRIMARY;
  if (user.color != undefined && user.color != null) {
    colorUser = user.color;
  }
  return (
    <AntDesign
      name={antIconName}
      size={size || 24}
      color={color || colors.LIGHT}
      style={[styles.icon(colorUser), { ...style }]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: (colorUser) => {
    return {
      backgroundColor: colorUser || colors.PRIMARY,
      padding: 15,
      borderRadius: 50,
      elevation: 5,
    };
  },
});

export default RoundIconBtn;

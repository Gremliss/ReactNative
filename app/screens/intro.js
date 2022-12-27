import { useState } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import colors from "../misc/colors";
import RoundIconBtn from "../components/RoundIconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = ({ onFinish }) => {
  const [name, setName] = useState("");
  const handleOnChangeText = (text) => setName(text);

  const handleSubmit = async () => {
    const user = { name: name, color: "blue" };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    if (onFinish) onFinish();
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.inputTitle}>Enter Your name to continue</Text>
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder="Enter name"
          style={styles.textInput}
        />
        {name.trim().length >= 3 ? (
          <RoundIconBtn
            antIconName={"arrowright"}
            onPress={handleSubmit}
            user={{ color: "#006600" }}
          />
        ) : null}
      </View>
    </>
  );
};

const width = Dimensions.get("window").width - 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    color: colors.PRIMARY,
    width,
    height: 40,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    marginBottom: 15,
  },
  inputTitle: {
    alignSelf: "flex-start",
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5,
  },
});

export default Intro;

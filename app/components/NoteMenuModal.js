import { useEffect, useState } from "react";
import {
  Keyboard,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconButton";

const NoteMenuModal = ({ visible, onClose, onSubmit, name, user }) => {
  const [newName, setNewName] = useState(name);
  const [newColor, setNewColor] = useState(user.color);
  const handleModalClose = () => {
    Keyboard.dismiss();
  };
  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "name") setNewName(text);
  };

  const handleSubmit = () => {
    onSubmit(newName, newColor);
    onClose();
  };

  const handleSubmitColor = (color) => {
    setNewColor(color);
    onSubmit(newName, newColor);
    user.color = color;
  };

  const closeModal = () => {
    onClose();
  };

  const userPink = { name: name, color: "#b22eb2" };
  const userGreen = { name: name, color: "#006600" };
  const userBrown = { name: name, color: "#b5633b" };
  const userBlue = { name: name, color: "#202069" };

  return (
    <>
      <StatusBar />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <Text style={styles.text}>Change your name</Text>
          <TextInput
            value={newName}
            onChangeText={(text) => handleOnChangeText(text, "name")}
            placeholder="Name"
            style={[styles.input(user.color), styles.title]}
          />
          <Text style={styles.text}>Change primary color</Text>
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={25}
              antIconName="select1"
              onPress={() => handleSubmitColor(userPink.color)}
              user={userPink}
              style={styles.btnChangeColor}
            />
            <RoundIconBtn
              size={25}
              antIconName="select1"
              onPress={() => handleSubmitColor(userGreen.color)}
              user={userGreen}
              style={styles.btnChangeColor}
            />
            <RoundIconBtn
              size={25}
              antIconName="select1"
              onPress={() => handleSubmitColor(userBrown.color)}
              user={userBrown}
              style={styles.btnChangeColor}
            />
            <RoundIconBtn
              size={25}
              antIconName="select1"
              onPress={() => handleSubmitColor(userBlue.color)}
              user={userBlue}
              style={styles.btnChangeColor}
            />
          </View>
          <View style={styles.btnContainerBottom}>
            <RoundIconBtn
              size={15}
              antIconName="check"
              onPress={handleSubmit}
              user={user}
            />
            <RoundIconBtn
              size={15}
              style={{ marginLeft: 15 }}
              antIconName="close"
              onPress={closeModal}
              user={user}
            />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: (userColor) => {
    return {
      borderBottomWidth: 2,
      borderBottomColor: userColor,
      fontSize: 20,
      color: colors.DARK,
      backgroundColor: "#333333",
      padding: 5,
    };
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnContainerBottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    justifyContent: "space-evenly",
  },
  btnChangeColor: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
});

export default NoteMenuModal;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNotes } from "../contexts/NoteProvider";
import colors from "../misc/colors";
import NoteInputModal from "./NoteInputModal";
import RoundIconBtn from "./RoundIconButton";

const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetail = (props) => {
  const [note, setNote] = useState(props.route.params.note);
  const [user] = useState(props.route.params.user);
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Are you sure?",
      "This will delete the note permanently",
      [
        { text: "Delete", onPress: () => deleteNote() },
        { text: "No", onPress: () => console.log("No") },
      ],
      { cancelable: true }
    );
  };

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: 20 }]}
      >
        <Text style={styles.time}>Created at {formatDate(note.id)}</Text>
        <Text style={styles.time}>
          {note.isUpdated ? `Updated at ${formatDate(note.time)}` : ``}
        </Text>
        <Text style={styles.title(user.color)}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName={"delete"}
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
          user={user}
        ></RoundIconBtn>
        <RoundIconBtn
          antIconName={"edit"}
          onPress={openEditModal}
          user={user}
        ></RoundIconBtn>
      </View>
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        visible={showModal}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        user={user}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  title: (colorUser) => {
    return {
      fontSize: 30,
      color: colorUser || colors.PRIMARY,
      fontWeight: "bold",
    };
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: "right",
    fontSize: 16,
    opacity: 0.5,
  },
  btnContainer: {
    position: "absolute",
    right: 20,
    bottom: 50,
  },
});

export default NoteDetail;

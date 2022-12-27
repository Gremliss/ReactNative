import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Intro from "./app/screens/intro";
import NoteScreen from "./app/screens/NoteScreen";
import NoteDetail from "./app/components/NoteDetail";
import { NavigationContainer } from "@react-navigation/native";
import NoteProvider from "./app/contexts/NoteProvider";
// import { createStackNavigator } from "react-navigation-stack";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
    // AsyncStorage.clear();
  }, []);

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  // return <NoteScreen user={user} />;
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator>
          <Stack.Screen
            component={RenderNoteScreen}
            name="NoteScreen"
            options={{ title: "Notes" }}
          />
          <Stack.Screen
            component={NoteDetail}
            name="NoteDetail"
            options={{ title: "Note Detail" }}
          />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

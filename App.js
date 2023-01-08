import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from "react-native";
import SingleTodo from "./component/singleTODO";
import singleTODO from "./component/singleTODO";

const App = () => {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const handleAddTodo = () => {
    if (!todo) return

    setTodos([...todos, { id: Date.now(), text: todo }])
    setTodo("");
  };

  const fetchTodos = async () => {
    const data = await AsyncStorage.getItem('todos');
    if (data) setTodos(JSON.parse(data));
  };


  useEffect(() => {
    fetchTodos();
  }, []);



  return (

    <View style={styles.container}>
      <StatusBar hidden={false}></StatusBar>
      <Text style={styles.heading}>TODO LIST  </Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setTodo(text)}
          value={todo}
          placeholder="Enter Task "
          style={styles.input}

        ></TextInput>
        <TouchableOpacity onPress={handleAddTodo}>
          <Text style={styles.button}>
            GO
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%', marginTop: 20 }}>
        <FlatList
          data={todos}
          renderItem={({ item }) => <SingleTodo
            todo={item}
            todos={todos}
            setTodos={setTodos}
          >

          </SingleTodo>}
          keyExtractor={(item) => item.id.toString()}

        />
      </View>



    </View>




  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#CD5C5C"


  },
  heading: {
    marginVertical: 30,
    marginBottom: 30,


    fontSize: 40,
    fontWeight: "700"


  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    shadowColor: "#808080",
    backgroundColor: "#DCDCDC",
    elevation: 20,
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 45,
  },
  button: {
    padding: 15,
    backgroundColor: "#4B0082",
    color: "white",
    borderRadius: 50,
    elevation: 20,
  }

})
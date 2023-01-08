import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SingleTodo({ todo, setTodos, todos }) {

    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    useEffect(() => {
        AsyncStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const handleEdit = () => {
        if (!edit)
            setEdit(!edit);
        else {
            setEdit(!edit)
            setTodos(
                todos.map((t) =>
                    t.id === todo.id
                        ? {
                            id: t.id,
                            text: editText,
                        } : t

                )
            );
            AsyncStorage.setItem("todos", JSON.stringify(todos));
        }

    };

    const handleDelete = (id) => {
        setTodos(todos.filter((t) => t.id !== id));
    };


    return (
        <View style={styles.todo}>

            {
                !edit ?
                    <Text style={styles.todoText}>{todo.text}</Text> :
                    <TextInput
                        style={styles.todoinput}
                        value={editText}
                        onChangeText={(text) => setEditText(text)}
                    ></TextInput>
            }

            <TouchableOpacity>
                <MaterialIcons
                    style={styles.todoaction}
                    name="edit"
                    size={30}
                    color="black"
                    onPress={handleEdit} />
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialCommunityIcons
                    style={styles.todoaction}
                    name="delete"
                    size={30}
                    color="black"
                    onPress={() => handleDelete(todo.id)}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: "row",
        elevation: 10,
        shadowColor: "black",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 55,

    },
    todoText: {
        flex: 1,
        fontSize: 20,
        paddingVertical: 3,
        paddingHorizontal: 5,
    },
    todoaction: {
        marginLeft: 15,
    },
    todoinput: {
        flex: 1,
        fontSize: 20,
        paddingHorizontal: 5,
        borderRadius: 5,
        borderColor: "grey",
        borderWidth: 1,
    }

});

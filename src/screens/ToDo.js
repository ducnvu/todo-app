import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTaskID, setTasks } from '../redux/actions';

export default function ToDo({navigation}) {

    const {tasks} = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        getTasks();
    }, [])

    const getTasks = () => {
        AsyncStorage.getItem("Tasks")
            .then(tasks => {
                const parsedTasks = JSON.parse(tasks);
                if (parsedTasks && typeof parsedTasks === "object") {
                    dispatch(setTasks(parsedTasks));
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.body}>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                    >
                        <Text>
                            {item.Title}
                        </Text>
                        <Text>
                            {item.Desc}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    dispatch(setTaskID(tasks.length + 1));
                    navigation.navigate("Task");
                }}
            >
                <FontAwesome5
                    name={"plus"}
                    size={20}
                    color={"#ffffff"}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#0080ff",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        right: 10,
        elevation: 5,
    },
    item: {
        marginHorizontal: 10,
        marginVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        borderRadius: 10,
        elevation: 5,
    }
})
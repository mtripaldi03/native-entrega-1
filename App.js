import React, { useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { AddTask } from './components/AddTask';
import { MyModal } from './components/Modal';




export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    itemList: {
      flex: 1,
      marginVertical: 20,
      marginHorizontal: 20,
    },
    itemContainer: {
      flex: 1,
      marginVertical: 5,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      backgroundColor: '#00FF00',
      paddingHorizontal: 10,
      paddingVertical: 20,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    item: {
      fontSize: 16,
      color: '#000000',
    },
    delete: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 3,
    },
    check: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 3,
    },
    itemBtnContainer: {
      flex: 3,
      flexDirection: 'column',
      alignItems: 'flex-end',
      padding: 5,
      justifyContent: 'space-between',
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
      paddingVertical: 20,
    },
    modalTitle: {
      fontSize: 16
    },
    modalMessageContainer : {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
    },
    modalMessage: {
      fontSize: 14,
    },
    selectedTask: {
      fontSize: 16,
      color: '#000000',
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: 20,
    },
    button: {
      backgroundColor: '#698F3F',
      padding: 5,
      marginBottom: 5
    }
  });

  const onHandleChangeText = (text) => {
    console.warn('text', text);
    setText(text);
  }

  const addItem = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), value: text },
    ]);
    setText('');
  }

  const onHandleModal = (id) => {
    setModalVisible(!modalVisible);
    setSelectedTask(tasks.find((item) => item.id === id))
  }


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item.value}</Text>
      <View style={styles.itemBtnContainer}>
         <TouchableOpacity style={styles.button} onPress={() => onHandleModal(item.id)}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
      </View>
    </View>
  )

  

  const onHandleDeleteItem = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
    setSelectedTask(null);
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <AddTask 
        item={text}
        onChangeText={onHandleChangeText}
        placeholder='enter new task'
        addItem={addItem}
        selectionColor='#4A306D'
        placeholderTextColor='#4A306D'
        textButton='ADD'
        color='#058E3F'
      />
      <FlatList
        style={styles.itemList}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <MyModal animationType='slide' visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Task detail</Text>
        </View>
        <View style={styles.modalMessageContainer}> 
          <Text style={styles.modalMessage}>Are you sure you want to delete:</Text>
        </View>
        <View style={styles.modalMessageContainer}> 
          <Text style={styles.selectedTask}>{selectedTask?.value}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title='Delete'
            onPress={() => onHandleDeleteItem(selectedTask?.id)}
            color='#4A306D'
          />
          <Button 
            title='Cancel'
            onPress={() => setModalVisible(!modalVisible)}
            color='#cccccc'
          />
        </View>
      </MyModal>
    </View>
  );
}

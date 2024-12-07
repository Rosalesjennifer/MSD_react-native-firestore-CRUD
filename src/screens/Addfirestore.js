import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { collection, addDoc } from "firebase/firestore";
import { database } from "../config/firestore";

export default function Addfirestore() {
  const navigation = useNavigation();
  const [newItem, setNewItem] = useState({
    itemID: "",
    toDo: "",
    description: "",
    due_date: "",
    status: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const onSubmit = async () => {
    if (!newItem.itemID || !newItem.toDo || !newItem.description || !newItem.due_date || !newItem.status) {
      Alert.alert("Missing Fields", "Please fill in all fields before submitting.");
      return;
    }

    try {
      await addDoc(collection(database, "cruds"), newItem);
      Alert.alert("Success", "Task added successfully!");
      navigation.navigate("Listfirestore");
    } catch (error) {
      Alert.alert("Error", "Failed to add data. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add New Task</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Task ID"
          style={styles.input}
          value={newItem.itemID}
          onChangeText={(text) => setNewItem({ ...newItem, itemID: text })}
        />
        <TextInput
          placeholder="Task Name"
          style={styles.input}
          value={newItem.toDo}
          onChangeText={(text) => setNewItem({ ...newItem, toDo: text })}
        />
        <TextInput
          placeholder="Description"
          style={[styles.input, styles.multiLineInput]}
          value={newItem.description}
          onChangeText={(text) => setNewItem({ ...newItem, description: text })}
          multiline
        />
        <TextInput
          placeholder="Due Date (YYYY-MM-DD)"
          style={styles.input}
          value={newItem.due_date}
          onChangeText={(text) => setNewItem({ ...newItem, due_date: text })}
        />
        <TextInput
          placeholder="Status"
          style={styles.input}
          value={newItem.status}
          onChangeText={(text) => setNewItem({ ...newItem, status: text })}
        />
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea", // Light gray background
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2d2d2d", // Dark gray for readability
  },
  form: {
    backgroundColor: "#ffffff", // White background for the form
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#b0b0b0", // Light border color
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9", // Light background for inputs
    color: "#333", // Text color
  },
  multiLineInput: {
    height: 100, // Increased height for multiline input
  },
  submitButton: {
    backgroundColor: "#28a745", // Green color for the submit button
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#ffffff", // White text for contrast
    fontSize: 18,
    fontWeight: "bold",
  },
});

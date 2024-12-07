import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../config/firestore";
import { MaterialIcons } from "@expo/vector-icons";

export default function Detailsfirestore({ route, navigation }) {
  const { data } = route.params;

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(database, "cruds", data.id));
      Alert.alert("Success", "Data deleted successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to delete the data.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsCard}>
        <Text style={styles.headerText}>Details</Text>
        <Text style={styles.infoText}>ToDo ID: {data.itemID}</Text>
        <Text style={styles.infoText}>ToDo Name: {data.toDo}</Text>
        <Text style={styles.infoDescription}>Description: {data.description}</Text>
        <Text style={styles.infoDescription}>Due Date: {data.due_date}</Text>
        <Text style={styles.infoDescription}>Status: {data.status}</Text>

        <View style={styles.actionsContainer}>
          <Pressable
            style={({ pressed }) => [styles.actionButton, { opacity: pressed ? 0.7 : 1 }]}
            onPress={() => navigation.navigate("Updatefirestore", { item: data })}
          >
            <MaterialIcons name="edit" size={20} color="#0000FF" />
            <Text style={styles.actionText}>Edit</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.actionButton, { opacity: pressed ? 0.7 : 1 }]}
            onPress={handleDelete}
          >
            <MaterialIcons name="delete" size={20} color="#FF6768" />
            <Text style={styles.actionText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfedfa",
  },
  detailsCard: {
    padding: 20,
    margin: 15,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    elevation: 10,
    shadowColor: "#333",
    shadowOpacity: 0.3,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  infoDescription: {
    fontSize: 14,
    fontWeight: "300",
    color: "#666",
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    elevation: 5,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#555",
  },
});

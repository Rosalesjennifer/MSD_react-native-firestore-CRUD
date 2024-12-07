import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { database } from "../config/firestore";

export default function Listfirestore() {
  const navigation = useNavigation();
  const [cruds, setCruds] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const dbRef = collection(database, "cruds");
    const q = query(dbRef, orderBy("itemID", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCruds(data);
      setFilteredData(data);
    });

    return unsubscribe;
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setFilteredData(cruds);
    } else {
      const filtered = cruds.filter((item) =>
        item.toDo.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("Detailsfirestore", { data: item })}
      style={({ pressed }) => [
        styles.itemContainer,
        {
          backgroundColor: pressed ? "#cce7ff" : "#ffffff",
          opacity: pressed ? 0.95 : 1,
        },
      ]}
    >
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>Task: {item.toDo}</Text>
        <Text style={styles.itemDescription}>Description: {item.description}</Text>
        <Text style={styles.itemMeta}>Due Date: {item.due_date}</Text>
        <Text style={styles.itemMeta}>Status: {item.status}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Addfirestore")}
      >
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks available</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea", // Light gray background for a soft, clean look
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d2d2d", // Dark gray for better readability
    textAlign: "center",
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#b0b0b0", // Subtle border for contrast
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#007bff", // Bright blue for the main action button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 15,
  },
  addButtonText: {
    color: "#ffffff", // White text for contrast
    fontSize: 16,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ffffff", // White background for list items
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemDetails: {
    flexDirection: "column",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d2d2d", // Dark gray for main title
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: "#555555", // Medium gray for secondary text
    marginBottom: 5,
  },
  itemMeta: {
    fontSize: 14,
    color: "#777777", // Light gray for meta information
  },
  emptyText: {
    fontSize: 16,
    color: "#888888", // Light gray for empty list message
    textAlign: "center",
    marginTop: 50,
  },
});

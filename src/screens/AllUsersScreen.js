import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 🔹 Replace with your server IP and port
const API_BASE_URL = "http://192.168.0.105:5000/api/users";

export default function AllUsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.error("No token found in storage");
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const response = await fetch(API_BASE_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data); // Expecting an array of { name, email }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load when screen is focused (so it updates dynamically)
  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 1 ? styles.rowAlt : null]}>
      <Text style={[styles.cell, styles.cellIndex]}>{index + 1}</Text>
      <Text style={[styles.cell, styles.cellName]}>{item.name}</Text>
      <Text style={[styles.cell, styles.cellEmail]}>{item.email}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#a9745b" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header row */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.cellIndex, styles.headerCell]}>#</Text>
          <Text style={[styles.cell, styles.cellName, styles.headerCell]}>Name</Text>
          <Text style={[styles.cell, styles.cellEmail, styles.headerCell]}>Email</Text>
        </View>

        {/* Users list */}
        {users.length === 0 ? (
          <View style={styles.loader}>
            <Text style={{ color: "#aaa" }}>No users found.</Text>
          </View>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  rowAlt: {
    backgroundColor: "#2c2c2c",
  },
  headerRow: {
    borderBottomWidth: 2,
    borderColor: "#a9745b",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#a9745b",
  },
  cell: {
    color: "#fff",
    fontSize: 16,
  },
  cellIndex: {
    flex: 0.5,
  },
  cellName: {
    flex: 2,
  },
  cellEmail: {
    flex: 3,
  },
});

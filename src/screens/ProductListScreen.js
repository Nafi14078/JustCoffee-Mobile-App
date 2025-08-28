import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

const API_BASE_URL = 'http://10.253.160.115:5000/api'; // Your API base

const ProductListScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await response.json();
        setProducts(data); // Assuming your API returns an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Display all model attributes
  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductEdit', { productId: item._id })}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      ) : null}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        {item.description ? (
          <Text style={styles.productDescription}>Description: {item.description}</Text>
        ) : null}
        <Text style={styles.productPrice}>Price: ${item.price?.toFixed(2)}</Text>
        {item.sizeOptions && item.sizeOptions.length > 0 ? (
          <Text style={styles.productSubtext}>Sizes: {item.sizeOptions.join(', ')}</Text>
        ) : null}
        {item.ingredients && item.ingredients.length > 0 ? (
          <Text style={styles.productSubtext}>Ingredients: {item.ingredients.join(', ')}</Text>
        ) : null}
        {item.roastLevel ? (
          <Text style={styles.productSubtext}>Roast Level: {item.roastLevel}</Text>
        ) : null}
        <Text style={styles.productSubtext}>Rating: {item.rating} ({item.ratingCount} reviews)</Text>
        {item.createdAt ? (
          <Text style={styles.productSubtext}>Created: {new Date(item.createdAt).toLocaleString()}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#a9745b" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderProductItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 50,
    backgroundColor: '#1E1E1E',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  productDescription: {
    color: '#ccc',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#a9745b',
    fontWeight: '600',
    marginBottom: 4,
  },
  productSubtext: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 2,
  },
});

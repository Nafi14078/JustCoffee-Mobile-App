import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProductCard from '../components/ProductCard';
import productService from '../services/productService'; // Import your product service

// Get screen width for responsive layout
const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 36 - CARD_MARGIN * 2) / 2; // 36 is total horizontal padding

// Images
const userIcon = require('../../assets/images/user.jpg');
const burgerIcon = 'menu';

const categories = ['All', 'Cappuccino', 'Espresso', 'Americano', 'Macchiato', 'Beans'];

export default function HomeScreen({ navigation }) {
  const nav = navigation || useNavigation();

  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsData = await productService.getAll();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to load products');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load products when screen focuses (e.g., return from ProductCreate)
  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();
    }, [])
  );

  // Pull to refresh function
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, []);

  // Function to categorize products based on title
  const categorizeProductByTitle = (product) => {
    const title = product.name.toLowerCase();
    
    // Check if any category name is included in the product title
    for (const category of categories) {
      if (category !== 'All' && title.includes(category.toLowerCase())) {
        return category;
      }
    }
    
    // If no category found in title, return a default or the product's existing category
    return product.category || 'All';
  };

  // Filter products by category and search term
  const filteredProducts = products.filter(p => {
    // First check if product matches search term
    const matchesSearch = search.length === 0 || 
                         p.name.toLowerCase().includes(search.toLowerCase());
    
    // If "All" category is selected, only apply search filter
    if (activeCategory === 'All') {
      return matchesSearch;
    }
    
    // For specific categories, check if category is in title or product category
    const productCategory = categorizeProductByTitle(p);
    return matchesSearch && productCategory === activeCategory;
  });

  const handleAddProduct = product => {
    // Add-to-cart logic here
  };

  // Render each product item in grid
  const renderProductItem = ({ item, index }) => {
    return (
      <View 
        style={[
          styles.productCardContainer, 
          index % 2 === 0 ? styles.leftCard : styles.rightCard
        ]}
      >
        <ProductCard 
          product={item} 
          onPress={() => nav.navigate('ProductDetails', { product: item })}
          style={styles.productCard}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Top Header Icons */}
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name={burgerIcon} size={28} color="white" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.iconButton}>
            <Image source={userIcon} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <View style={styles.header}>
          <Text style={styles.heading}>Find the best{'\n'}coffee for you</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="ios-search" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Find Your Coffee..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>

        {/* Categories Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryTab, activeCategory === category && styles.activeCategoryTab]}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                style={{
                  color: activeCategory === category ? '#a9745b' : '#fff',
                  fontFamily: activeCategory === category ? 'OpenSans-Bold' : 'OpenSans-Regular',
                }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading products...</Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cafe-outline" size={50} color="#a9745b" />
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>
              {search.length > 0 
                ? 'Try a different search term' 
                : `No products found in ${activeCategory} category`}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            numColumns={2}
            keyExtractor={item => item._id || item.id.toString()}
            renderItem={renderProductItem}
            style={styles.productsGrid}
            scrollEnabled={false} // Disable internal scrolling since it's inside a ScrollView
          />
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#18181A',
  },
  container: {
    flex: 1,
    backgroundColor: '#18181A',
    paddingHorizontal: 18,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 0,
    minHeight: 42,
  },
  iconButton: {
    padding: 4,
    borderRadius: 24,
    backgroundColor: 'transparent',
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  header: {
    marginBottom: 16,
    marginLeft: 2,
    marginTop: 4,
  },
  heading: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'OpenSans-Bold',
    marginLeft: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23232b',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    marginLeft: 2,
    marginRight: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 18,
    marginLeft: 2,
    marginRight: 2,
  },
  categoryTab: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  activeCategoryTab: {
    backgroundColor: '#23232b',
  },
  productsGrid: {
    marginTop: 5,
    marginBottom: 35,
  },
  productCardContainer: {
    width: CARD_WIDTH,
    marginBottom: CARD_MARGIN * 2,
  },
  leftCard: {
    marginRight: CARD_MARGIN,
  },
  rightCard: {
    marginLeft: CARD_MARGIN,
  },
  productCard: {
    width: '100%',
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#a9745b',
    fontSize: 16,
  },
  emptyContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'OpenSans-Bold',
  },
  emptySubtext: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'OpenSans-Regular',
  },
});
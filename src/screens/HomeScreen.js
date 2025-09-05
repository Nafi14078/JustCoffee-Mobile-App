import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import BeanCard from '../components/BeanCard';
import { useCart } from '../context/CartContext';

// Images
const userIcon = require('../../assets/images/user.jpg');
const burgerIcon = 'menu';

const categories = [
  'All', 'Cappuccino', 'Espresso', 'Americano', 'Macchiato'
];

const products = [
  {
    id: 1,
    name: 'Cappuccino',
    desc: 'With Steamed Milk',
    image: require('../../assets/images/coffee1.jpg'),
    price: 4.20,
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Cappuccino',
    desc: 'With Foam',
    image: require('../../assets/images/coffee2.jpg'),
    price: 4.20,
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Espresso',
    desc: 'Strong Coffee',
    image: require('../../assets/images/coffee1.jpg'),
    price: 3.50,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Americano',
    desc: 'Diluted Espresso',
    image: require('../../assets/images/coffee2.jpg'),
    price: 3.80,
    rating: 4.3,
  },
  {
    id: 5,
    name: 'Macchiato',
    desc: 'Espresso with Milk',
    image: require('../../assets/images/coffee1.jpg'),
    price: 4.50,
    rating: 4.6,
  },
];

const beans = [
  {
    id: 1,
    name: 'Robusta Beans',
    desc: 'Medium Roasted',
    image: require('../../assets/images/robusta_coffee_beans_square.png'),
    price: 4.50,
    rating: 4.6,
  },
  {
    id: 2,
    name: 'Arabica Beans',
    desc: 'Light Roasted',
    image: require('../../assets/images/arabica_coffee_beans_square.png'),
    price: 5.20,
    rating: 4.8,
  },
];

export default function HomeScreen({ navigation }) {
  const nav = navigation || useNavigation();
  const { addItem } = useCart();

  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');

  const handleAddProduct = (product) => {
    addItem(product, 'product');
    Alert.alert('Added to Cart', `${product.name} has been added to your cart!`);
  };

  const handleAddBean = (bean) => {
    addItem(bean, 'bean');
    Alert.alert('Added to Cart', `${bean.name} has been added to your cart!`);
  };

  const getFilteredProducts = () => {
    let filtered = products.filter(p => {
      // Category filter
      const categoryMatch = activeCategory === 'All' || p.name === activeCategory;

      // Search filter
      const searchMatch = search.length === 0 ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase());

      // Price filter
      let priceMatch = true;
      if (priceRange === 'Low') priceMatch = p.price <= 4.0;
      else if (priceRange === 'Medium') priceMatch = p.price > 4.0 && p.price <= 5.0;
      else if (priceRange === 'High') priceMatch = p.price > 5.0;

      // Rating filter
      let ratingMatch = true;
      if (ratingFilter === '4+') ratingMatch = p.rating >= 4.0;
      else if (ratingFilter === '4.5+') ratingMatch = p.rating >= 4.5;

      return categoryMatch && searchMatch && priceMatch && ratingMatch;
    });

    return filtered;
  };

  const getFilteredBeans = () => {
    return beans.filter(b => {
      const searchMatch = search.length === 0 ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.desc.toLowerCase().includes(search.toLowerCase());

      let priceMatch = true;
      if (priceRange === 'Low') priceMatch = b.price <= 4.0;
      else if (priceRange === 'Medium') priceMatch = b.price > 4.0 && b.price <= 5.0;
      else if (priceRange === 'High') priceMatch = b.price > 5.0;

      let ratingMatch = true;
      if (ratingFilter === '4+') ratingMatch = b.rating >= 4.0;
      else if (ratingFilter === '4.5+') ratingMatch = b.rating >= 4.5;

      return searchMatch && priceMatch && ratingMatch;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Header Icons */}
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name={burgerIcon} size={24} color="#bdbdbd" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={userIcon} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <View style={styles.header}>
          <Text style={styles.heading}>
            Find the best{'\n'}coffee for you
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#bdbdbd" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search coffee..."
              placeholderTextColor="#bdbdbd"
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
              <Ionicons name="options" size={20} color="#a9745b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Price:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {['All', 'Low', 'Medium', 'High'].map(range => (
                  <TouchableOpacity
                    key={range}
                    style={[styles.filterBtn, priceRange === range && styles.activeFilterBtn]}
                    onPress={() => setPriceRange(range)}
                  >
                    <Text style={[styles.filterText, priceRange === range && styles.activeFilterText]}>
                      {range}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Rating:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {['All', '4+', '4.5+'].map(rating => (
                  <TouchableOpacity
                    key={rating}
                    style={[styles.filterBtn, ratingFilter === rating && styles.activeFilterBtn]}
                    onPress={() => setRatingFilter(rating)}
                  >
                    <Text style={[styles.filterText, ratingFilter === rating && styles.activeFilterText]}>
                      {rating}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Categories Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryTab, activeCategory === category && styles.activeCategoryTab]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products */}
        <FlatList
          data={getFilteredProducts()}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => nav.navigate('ProductDetails', { product: item })}
              onPressAdd={() => handleAddProduct(item)}
            />
          )}
          style={{ marginTop: 5, marginBottom: 35 }}
          contentContainerStyle={{ paddingLeft: 2 }}
        />

        {/* Coffee Beans */}
        <Text style={styles.sectionHeading}>Coffee beans</Text>
        <FlatList
          data={getFilteredBeans()}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <BeanCard
              bean={item}
              onPress={() => nav.navigate('ProductDetails', { product: item })}
              onPressAdd={() => handleAddBean(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
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
    justifyContent: 'space-between',
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
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23232b',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
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
  filtersContainer: {
    backgroundColor: '#23232b',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    marginHorizontal: 2,
  },
  filterRow: {
    marginBottom: 8,
  },
  filterLabel: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 8,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#2c2c2c',
    marginRight: 8,
  },
  activeFilterBtn: {
    backgroundColor: '#a9745b',
  },
  filterText: {
    color: '#bdbdbd',
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
  },
  activeFilterText: {
    color: '#fff',
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
  categoryText: {
    color: '#bdbdbd',
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
  },
  sectionHeading: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    marginTop: 6,
    marginBottom: 10,
    marginLeft: 2,
  },
});


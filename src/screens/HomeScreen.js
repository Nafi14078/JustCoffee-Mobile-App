import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import ProductCard from '../components/ProductCard';
import BeanCard from '../components/BeanCard';

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
  // Add more items...
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
  // Add more beans...
];

export default function HomeScreen({ navigation }) {
  // If navigation isn't passed (sometimes with custom hooks), get it:
  const nav = navigation || useNavigation();

  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p =>
    (activeCategory === 'All' || p.name === activeCategory) &&
    (search.length === 0 || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddProduct = (product) => {
    // For add-to-cart on product
  };

  const handleAddBean = (bean) => {
    // For add-to-cart on bean
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 30}}>
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
          <Text style={styles.heading}>
            Find the best{'\n'}coffee for you
          </Text>
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
          />
        </View>

        {/* Categories Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                activeCategory === category && styles.activeCategoryTab
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                style={{
                  color: activeCategory === category ? '#a9745b' : '#fff',
                  fontFamily: activeCategory === category ? 'OpenSans-Bold' : 'OpenSans-Regular'
                }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard 
              product={item}
              onPress={() => nav.navigate('ProductDetails', { product: item })}
            />
          )}
          style={{ marginTop: 5, marginBottom: 35 }}
          contentContainerStyle={{ paddingLeft: 2 }}
        />

        {/* Coffee Beans */}
        <Text style={styles.sectionHeading}>Coffee beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={beans}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <BeanCard 
              bean={item} 
              onPressAdd={handleAddBean}
              onPress={() => nav.navigate('BeanDetails', { bean: item })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />

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
    // removed paddingTop; SafeAreaView handles it!
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
  bigProductCard: {
    width: 170,
    backgroundColor: '#23232b',
    borderRadius: 22,
    marginRight: 18,
    paddingBottom: 12,
    paddingTop: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  bigProductImage: {
    width: 170,
    height: 120,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  productName: {
    fontFamily: 'OpenSans-Bold',
    color: '#fff',
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  productDesc: {
    color: '#bdbdbd',
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardFooter: {
    width: '90%',
    alignSelf: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 3,
    color: '#a9745b',
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    justifyContent: 'space-between'
  },
  productPrice: {
    color: '#a9745b',
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    marginRight: 7,
  },
  addBtn: {
    backgroundColor: '#a9745b',
    padding: 7,
    borderRadius: 8,
    marginLeft: 7,
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

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useCart } from '../context/CartContext';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');

  const sizes = ['S', 'M', 'L'];
  const sizeMultipliers = { S: 0.8, M: 1, L: 1.2 };

  const getCurrentPrice = () => {
    return product.price * sizeMultipliers[selectedSize];
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      selectedSize,
      price: getCurrentPrice(),
      name: `${product.name} (${selectedSize})`,
    };

    addItem(itemToAdd, 'product');
    Alert.alert(
      'Added to Cart',
      `${product.name} (${selectedSize}) has been added to your cart!`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => navigation.navigate('Cart') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={product.image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={20} color="#a9745b" />
          <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
        </View>

        <Text style={styles.description}>
          {product.description || `Delicious ${product.name} ${product.desc}. Made with premium ingredients and expertly crafted for the perfect taste experience.`}
        </Text>

        <Text style={styles.sectionTitle}>Choose Size</Text>
        <View style={styles.sizesRow}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => setSelectedSize(size)}
              style={[
                styles.sizeBtn,
                selectedSize === size && styles.sizeBtnSelected,
              ]}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.sizeText,
                selectedSize === size && styles.sizeTextSelected,
              ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>${getCurrentPrice().toFixed(2)}</Text>
          <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 280,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
  },
  name: {
    fontSize: 26,
    fontFamily: 'OpenSans-Bold',
    color: '#a9745b',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  ratingText: {
    marginLeft: 6,
    color: '#a9745b',
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
  },
  description: {
    color: 'white',
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#a9745b',
    fontFamily: 'OpenSans-Bold',
    marginBottom: 12,
  },
  sizesRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  sizeBtn: {
    borderWidth: 1,
    borderColor: '#a9745b',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeBtnSelected: {
    backgroundColor: '#a9745b',
  },
  sizeText: {
    color: '#a9745b',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  sizeTextSelected: {
    color: '#fff',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 22,
    fontFamily: 'OpenSans-Bold',
    color: '#a9745b',
  },
  addToCartBtn: {
    backgroundColor: '#a9745b',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    shadowColor: '#a9745b',
    shadowOpacity: 0.7,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
  },
  addToCartText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'OpenSans-Bold',
  },
});

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState('M');

  const sizes = ['S', 'M', 'L'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Image source={product.image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={18} color="#a9745b" />
          <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Choose Size</Text>
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
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && { color: 'white', fontWeight: '700' },
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.8}>
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
  },
  sizeBtn: {
    borderWidth: 1,
    borderColor: '#a9745b',
    borderRadius: 24,
    paddingVertical: 6,
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
  },
  bottomRow: {
    marginTop: 30,
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

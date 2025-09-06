import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onPress, onPressAdd }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  // Generate a colored placeholder based on product name
  const generatePlaceholderColor = (name) => {
    const colors = ['#3a3a3a', '#4a4a4a', '#5a5a5a', '#6a6a6a'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleAddToCart = (e) => {
    e.stopPropagation && e.stopPropagation(); // prevent card tap
    
    // Add to cart with default size 'M'
    addToCart(product, 'M');
    
    // Show success message
    Alert.alert('✅ Added to Cart', `${product.name} has been added to your cart!`);
    
    // Call the original onPressAdd if provided
    if (onPressAdd) onPressAdd(product);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.card}
    >
      {/* IMAGE AT THE TOP WITH LOADING STATE */}
      <View style={styles.imageContainer}>
        {imageLoading && !imageError && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#a9745b" />
          </View>
        )}
        
        {imageError || !product.imageUrl ? (
          <View style={[styles.placeholder, { backgroundColor: generatePlaceholderColor(product.name) }]}>
            <Ionicons name="cafe-outline" size={40} color="#a9745b" />
          </View>
        ) : (
          <Image 
            source={{ uri: product.imageUrl }}
            style={styles.image} 
            resizeMode="cover"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
              console.log('Image failed to load:', product.imageUrl);
            }}
          />
        )}
      </View>
      
      {/* INFO BLOCK BELOW IMAGE */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.desc} numberOfLines={2}>
          {product.description}
        </Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={15} color="#a9745b" />
          <Text style={styles.ratingText}>{product.rating?.toFixed(1) || '0.0'}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price?.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleAddToCart}
          >
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: '#23232b',
    borderRadius: 22,
    marginRight: 18,
    paddingBottom: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: 170,
    height: 140,
  },
  image: {
    width: 170,
    height: 140,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  placeholder: {
    width: 170,
    height: 120,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 1,
  },
  info: {
    width: '90%',
    alignItems: 'center',
    marginTop: 8,
  },
  name: {
    fontFamily: 'OpenSans-Bold',
    color: '#fff',
    fontSize: 18,
    marginBottom: 2,
    textAlign: 'center',
  },
  desc: {
    color: '#bdbdbd',
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
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
    marginTop: 5,
    justifyContent: 'space-between',
    width: '100%',
  },
  price: {
    color: '#a9745b',
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: '#a9745b',
    padding: 7,
    borderRadius: 8,
    marginLeft: 7,
  },
});
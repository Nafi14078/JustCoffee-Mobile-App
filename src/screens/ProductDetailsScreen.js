import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  
  // Use actual product data instead of hardcoded values
  const productSizes = product.sizeOptions && product.sizeOptions.length > 0 
    ? product.sizeOptions 
    : ['S', 'M', 'L'];
  
  const productIngredients = product.ingredients && product.ingredients.length > 0
    ? product.ingredients
    : ['Coffee', 'Milk']; // Default fallback
  
  const productRoastLevel = product.roastLevel || 'Medium Roasted';
  
  // Set default size to the first size in the product's sizeOptions
  // If no sizeOptions exist, default to 'M'
  const defaultSize = productSizes.length > 0 ? productSizes[0] : 'M';
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [isFavorite, setIsFavorite] = useState(false);

  const productDesc = product.description || '';
  const productRating = typeof product.rating === 'number' ? product.rating : 4.5;
  const productRatingCount = typeof product.ratingCount === 'number' ? product.ratingCount : 6879;
  const productPrice = typeof product.price === 'number' ? product.price : 4.2;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.screen}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Full hero image */}
          <View style={styles.imageContainer}>
            {product.imageUrl ? (
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Ionicons name="cafe-outline" size={60} color="#a9745b" />
                <Text style={styles.placeholderText}>No Image</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.favoriteBtn}
              activeOpacity={0.9}
              onPress={() => setIsFavorite((fav) => !fav)}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={32}
                color={isFavorite ? '#d43a31' : '#fff'}
              />
            </TouchableOpacity>
          </View>

          {/* Details Card - Extends up to description */}
          <View style={styles.shadowCard}>
            {/* Title row */}
            <View style={styles.titleRow}>
              <Text style={styles.name}>{product.name}</Text>
              
              {/* Ingredients icons */}
              <View style={styles.inlineIcons}>
                {productIngredients.slice(0, 2).map((ingredient, index) => (
                  <View key={index} style={styles.iconInfo}>
                    <MaterialCommunityIcons
                      name={ingredient.toLowerCase() === 'milk' ? 'glass-mug-variant' : 'coffee'}
                      size={22}
                      color="#a9745b"
                    />
                    <Text style={styles.iconText}>{ingredient}</Text>
                  </View>
                ))}
                {productIngredients.length > 2 && (
                  <View style={styles.iconInfo}>
                    <Text style={styles.moreIngredients}>+{productIngredients.length - 2}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Rating & badge */}
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={19} color="#a9745b" />
              <Text style={styles.ratingText}>{productRating.toFixed(1)}</Text>
              <Text style={styles.ratingCount}>({productRatingCount})</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{productRoastLevel}</Text>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description}>
              {productDesc ||
                'Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.'}
            </Text>
          </View>

          {/* Unified Dark Card for Size, Ingredients, and Price/Add button */}
          <View style={styles.unifiedCard}>
            {/* Size selection - All 3 buttons horizontally */}
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizesRow}>
              <TouchableOpacity
                onPress={() => setSelectedSize('S')}
                style={[
                  styles.sizeBtn,
                  selectedSize === 'S' && styles.sizeBtnSelected,
                ]}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === 'S' && {
                      color: '#fff',
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  S
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setSelectedSize('M')}
                style={[
                  styles.sizeBtn,
                  selectedSize === 'M' && styles.sizeBtnSelected,
                ]}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === 'M' && {
                      color: '#fff',
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  M
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setSelectedSize('L')}
                style={[
                  styles.sizeBtn,
                  selectedSize === 'L' && styles.sizeBtnSelected,
                ]}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === 'L' && {
                      color: '#fff',
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  L
                </Text>
              </TouchableOpacity>
            </View>

            {/* Ingredients list */}
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsContainer}>
              {productIngredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientPill}>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>

            {/* Price and Add to Cart button inside the unified card */}
            <View style={styles.bottomSection}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.price}>${productPrice.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.9}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#18181A',
  },
  screen: {
    flex: 1,
    backgroundColor: '#18181A',
  },
  container: {
    flex: 1,
    backgroundColor: '#18181A',
    paddingBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 340,
    position: 'relative',
    marginBottom: -32,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2a2a32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#a9745b',
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'OpenSans-Regular',
  },
  favoriteBtn: {
    position: 'absolute',
    right: 18,
    top: Platform.OS === 'android' ? 40 : 22,
    backgroundColor: 'rgba(44,44,44,0.8)',
    borderRadius: 28,
    padding: 10,
    zIndex: 2,
  },
  shadowCard: {
    backgroundColor: 'rgba(32,32,36,0.88)',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    marginBottom: 16,
  },
  unifiedCard: {
    backgroundColor: 'rgba(32,32,36,0.88)',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  name: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'OpenSans-Bold',
    maxWidth: '56%',
  },
  inlineIcons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  iconInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23232b',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 5,
  },
  iconText: {
    color: '#a9745b',
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    marginLeft: 5,
  },
  moreIngredients: {
    color: '#a9745b',
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  ratingText: {
    marginLeft: 7,
    color: '#a9745b',
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  ratingCount: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: '#ccc',
    marginLeft: 6,
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#a9745b',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  badgeText: {
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
    fontSize: 13,
  },
  description: {
    color: '#eaeaea',
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 17,
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
    marginBottom: 12,
    marginTop: 15,
  },
  sizesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  sizeBtn: {
    borderWidth: 2,
    borderColor: '#a9745b',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
    marginHorizontal: 4,
  },
  sizeBtnSelected: {
    backgroundColor: '#a9745b',
    borderColor: '#a9745b',
  },
  sizeText: {
    color: '#a9745b',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  ingredientPill: {
    backgroundColor: '#23232b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#a9745b',
  },
  ingredientText: {
    color: '#a9745b',
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  priceLabel: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
  },
  price: {
    fontSize: 24,
    color: '#a9745b',
    fontFamily: 'OpenSans-Bold',
  },
  addToCartBtn: {
    backgroundColor: '#a9745b',
    height: 44,
    paddingHorizontal: 28,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#a9745b',
    shadowOpacity: 0.18,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 2 },
  },
  addToCartText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
    letterSpacing: 0.5,
  },
});
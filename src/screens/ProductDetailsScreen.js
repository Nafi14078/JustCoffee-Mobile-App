import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // expo install react-native-safe-area-context

export default function ProductDetailsScreen({ route }) {
  const { product } = route.params;
  const [selectedSize, setSelectedSize] = useState('S');
  const [isFavorite, setIsFavorite] = useState(false);

  const sizes = ['S', 'M', 'L'];
  const productDesc = product.desc || product.description || '';
  const productSubtitle = product.subtitle || product.desc || '';
  const productRating =
    typeof product.rating === 'number' ? product.rating : 4.5;
  const productPrice =
    typeof product.price === 'number' ? product.price : 4.2;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.screen}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 100 }} // reduced bottom padding so it's not too empty
          showsVerticalScrollIndicator={false}
        >
          {/* Full hero image */}
          <View style={styles.imageContainer}>
            <Image
              source={product.image}
              style={styles.image}
              resizeMode="cover"
            />
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

          {/* Details Card */}
          <View style={styles.shadowCard}>
            {/* Title row */}
            <View style={styles.titleRow}>
              <Text style={styles.name}>{product.name}</Text>
              <View style={styles.inlineIcons}>
                <View style={styles.iconInfo}>
                  <MaterialCommunityIcons
                    name="coffee"
                    size={22}
                    color="#a9745b"
                  />
                  <Text style={styles.iconText}>Coffee</Text>
                </View>
                <View style={styles.iconInfo}>
                  <MaterialCommunityIcons
                    name="glass-mug-variant"
                    size={22}
                    color="#a9745b"
                  />
                  <Text style={styles.iconText}>Milk</Text>
                </View>
              </View>
            </View>
            <Text style={styles.subtitle}>{productSubtitle}</Text>

            {/* Rating & badge */}
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={19} color="#a9745b" />
              <Text style={styles.ratingText}>{productRating.toFixed(1)}</Text>
              <Text style={styles.ratingCount}>(6,879)</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Medium Roasted</Text>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description}>
              {productDesc ||
                'Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.'}
            </Text>

            {/* Size selection */}
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizesRow}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={[
                    styles.sizeBtn,
                    selectedSize === size && styles.sizeBtnSelected,
                  ]}
                  activeOpacity={0.85}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && {
                        color: '#fff',
                        fontWeight: 'bold',
                      },
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Bottom floating bar */}
        <View style={styles.bottomBar}>
          <Text style={styles.price}>${productPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.9}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
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
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
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
  },
  iconInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    backgroundColor: '#23232b',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 15,
  },
  iconText: {
    color: '#a9745b',
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    marginLeft: 5,
  },
  subtitle: {
    fontSize: 17,
    color: '#c9a183',
    fontFamily: 'OpenSans-Regular',
    marginBottom: 14,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
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
    marginTop: 3,
  },
  sizesRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  sizeBtn: {
    borderWidth: 2,
    borderColor: '#a9745b',
    borderRadius: 18,
    paddingVertical: 7,
    paddingHorizontal: 28,
    backgroundColor: 'transparent',
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
  // Fixed bottomBar placement
  bottomBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 10 : 6, // small gap from bottom
    left: 12,
    right: 12,
    height: 60,
    paddingHorizontal: 18,
    backgroundColor: '#18181A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -1 },
    elevation: 3,
    zIndex: 10,
  },
  price: {
    fontSize: 24,
    color: '#a9745b',
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold',
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

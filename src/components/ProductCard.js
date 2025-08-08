import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <Image source={product.image} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#a9745b" />
          <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
        </View>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2c2c2c',
    borderRadius: 14,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: 120,
    height: 120,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: 'white',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontFamily: 'OpenSans-Regular',
    color: '#a9745b',
  },
  price: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    color: '#a9745b',
  },
});

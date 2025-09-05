import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductCard({ product, onPress, onPressAdd }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(product)}>
      {/* IMAGE AT THE TOP */}
      <Image source={product.image} style={styles.image} />

      {/* INFO BLOCK BELOW IMAGE */}
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.desc}>{product.desc}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={15} color="#a9745b" />
          <Text style={styles.ratingText}>{product.rating?.toFixed(1)}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price?.toFixed(2)}</Text>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={(e) => {
              e.stopPropagation();
              onPressAdd?.(product);
            }}
          >
            <Ionicons name="add" size={20} color="#fff" />
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
  image: {
    width: 170,
    height: 120,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
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


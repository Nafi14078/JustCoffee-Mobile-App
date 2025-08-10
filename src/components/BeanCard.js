import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BeanCard({ bean, onPress, onPressAdd }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => onPress?.(bean)}>
      <Image source={bean.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.name} numberOfLines={1}>{bean.name}</Text>
      <Text style={styles.desc} numberOfLines={2}>{bean.desc}</Text>
      <View style={styles.footer}>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingStar}>★</Text>
          <Text style={styles.ratingText}>{bean.rating?.toFixed(1)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${bean.price?.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addBtn} onPress={(e) => { e.stopPropagation(); onPressAdd?.(bean); }}>
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
  image: {
    width: 170,
    height: 120,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  name: {
    fontFamily: 'OpenSans-Bold',
    color: '#fff',
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  desc: {
    color: '#bdbdbd',
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  footer: {
    width: '90%',
    alignSelf: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingStar: {
    color: '#a9745b',
    fontSize: 15,
    marginRight: 3,
  },
  ratingText: {
    color: '#a9745b',
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    justifyContent: 'space-between',
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

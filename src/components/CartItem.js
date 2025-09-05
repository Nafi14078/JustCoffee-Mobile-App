import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
        <Text style={styles.price}>${item.price?.toFixed(2)}</Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityBtn}
          onPress={() => onUpdateQuantity(item.id, item.quantity - 1, item.type)}
        >
          <Ionicons name="remove" size={16} color="#a9745b" />
        </TouchableOpacity>

        <Text style={styles.quantity}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.quantityBtn}
          onPress={() => onUpdateQuantity(item.id, item.quantity + 1, item.type)}
        >
          <Ionicons name="add" size={16} color="#a9745b" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => onRemove(item.id, item.type)}
      >
        <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#23232b',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 2,
  },
  desc: {
    color: '#bdbdbd',
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    marginBottom: 4,
  },
  price: {
    color: '#a9745b',
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityBtn: {
    backgroundColor: '#2c2c2c',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    marginHorizontal: 12,
  },
  removeBtn: {
    padding: 4,
  },
});

import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import ProductCard from '../components/ProductCard';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Robusta Coffee Beans',
    price: 15.99,
    rating: 4.5,
    image: require('../../assets/images/coffee1.jpg'),
    description:
      'Rich and bold robusta coffee beans with a strong flavor and dense crema. Perfect for espresso lovers.',
  },
  {
    id: '2',
    name: 'Cappuccino',
    price: 4.99,
    rating: 4.7,
    image: require('../../assets/images/coffee2.jpg'),
    description: 'Creamy cappuccino with foamed milk and a perfect espresso shot.',
  },
];

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Featured Coffees</Text>
      <FlatList
        data={MOCK_PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  heading: {
    fontSize: 24,
    fontFamily: 'OpenSans-Bold',
    color: '#a9745b',
    marginBottom: 16,
  },
});

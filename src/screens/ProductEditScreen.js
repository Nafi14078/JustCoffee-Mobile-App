import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import productService from '../services/productService';

export default function ProductEditScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const productId = route.params?.productId;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sizeOptions, setSizeOptions] = useState('');
  const [rating, setRating] = useState('');
  const [ratingCount, setRatingCount] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [roastLevel, setRoastLevel] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Fetch existing product details
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const products = await productService.getAll();
        const product = products.find((p) => p._id === productId);
        if (!product) {
          Alert.alert('Error', 'Product not found');
          navigation.goBack();
          return;
        }
        setName(product.name || '');
        setDescription(product.description || '');
        setPrice(product.price !== undefined ? product.price.toString() : '');
        setSizeOptions((product.sizeOptions || []).join(', '));
        setRating(product.rating !== undefined ? product.rating.toString() : '');
        setRatingCount(product.ratingCount !== undefined ? product.ratingCount.toString() : '');
        setIngredients((product.ingredients || []).join(', '));
        setRoastLevel(product.roastLevel || '');
        setImageUrl(product.imageUrl || '');
      } catch (err) {
        Alert.alert('Error', 'Could not load product details');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  // Save updates to backend
  const handleSave = async () => {
    const updatedProduct = {
      name,
      description,
      price: parseFloat(price),
      sizeOptions: sizeOptions.split(',').map((s) => s.trim()).filter(Boolean),
      rating: parseFloat(rating) || 0,
      ratingCount: parseInt(ratingCount) || 0,
      ingredients: ingredients.split(',').map((i) => i.trim()).filter(Boolean),
      roastLevel,
      imageUrl,
    };

    try {
      setSaving(true);
      await productService.update(productId, updatedProduct);
      Alert.alert('Success', 'Product updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Description"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
        placeholder="Price"
      />

      <Text style={styles.label}>Size Options (comma separated)</Text>
      <TextInput
        style={styles.input}
        value={sizeOptions}
        onChangeText={setSizeOptions}
        placeholder="S, M, L"
      />

      <Text style={styles.label}>Ingredients (comma separated)</Text>
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Coffee, Milk"
      />

      <Text style={styles.label}>Roast Level</Text>
      <TextInput style={styles.input} value={roastLevel} onChangeText={setRoastLevel} placeholder="Medium Roasted" />

      <Text style={styles.label}>Rating</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={setRating}
        keyboardType="decimal-pad"
        placeholder="Rating"
      />

      <Text style={styles.label}>Rating Count</Text>
      <TextInput
        style={styles.input}
        value={ratingCount}
        onChangeText={setRatingCount}
        keyboardType="numeric"
        placeholder="Number of Ratings"
      />

      <Text style={styles.label}>Image URL</Text>
      <TextInput
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="http://example.com/image.jpg"
      />
      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.previewImage} /> : null}

      <Button title={saving ? 'Saving...' : 'Save Changes'} onPress={handleSave} disabled={saving} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    paddingTop: 50,
    backgroundColor: '#1E1E1E',
  },
  label: {
    color: '#a9745b',
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#2c2c2c',
    color: '#fff',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginVertical: 12,
    borderWidth: 2,
    borderColor: '#a9745b',
  },
});

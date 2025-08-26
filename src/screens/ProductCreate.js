import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import productService from '../services/productService';

export default function ProductCreate() {
  const navigation = useNavigation();

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sizeOptions, setSizeOptions] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [roastLevel, setRoastLevel] = useState('');
  const [rating, setRating] = useState('');
  const [ratingCount, setRatingCount] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pickedImage, setPickedImage] = useState(null);

  // Pick image from gallery
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      return Alert.alert('Permission required', 'Please allow access to your gallery.');
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      setImageUrl('');
    }
  };

  // Save product
  const handleCreate = async () => {
    if (!name || !price) {
      return Alert.alert('Validation Error', 'Name and Price are required!');
    }

    const productData = {
      name,
      description,
      price: parseFloat(price),
      sizeOptions: sizeOptions ? sizeOptions.split(',').map((s) => s.trim()) : [],
      ingredients: ingredients ? ingredients.split(',').map((i) => i.trim()) : [],
      roastLevel,
      rating: rating ? parseFloat(rating) : 0,
      ratingCount: ratingCount ? parseInt(ratingCount) : 0,
      imageUrl: pickedImage || imageUrl,
    };

    try {
      await productService.create(productData);
      Alert.alert('✅ Success', 'Product created successfully!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('❌ Error', err.message || 'Something went wrong');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      <Text style={styles.title}>✨ Create New Product</Text>

      {/* Name */}
      <FormInput icon="cafe-outline" value={name} onChange={setName} placeholder="Product Name" />

      {/* Description */}
      <FormInput
        icon="document-text-outline"
        value={description}
        onChange={setDescription}
        placeholder="Description"
        multiline
      />

      {/* Price */}
      <FormInput
        icon="pricetag-outline"
        value={price}
        onChange={setPrice}
        placeholder="Price"
        keyboardType="numeric"
      />

      {/* Size Options */}
      <FormInput
        icon="resize-outline"
        value={sizeOptions}
        onChange={setSizeOptions}
        placeholder="Size Options (comma separated, e.g. S,M,L)"
      />

      {/* Ingredients */}
      <FormInput
        icon="leaf-outline"
        value={ingredients}
        onChange={setIngredients}
        placeholder="Ingredients (comma separated, e.g. Coffee,Milk)"
      />

      {/* Roast Level */}
      <FormInput
        icon="flame-outline"
        value={roastLevel}
        onChange={setRoastLevel}
        placeholder="Roast Level (e.g. Medium Roasted)"
      />

      {/* Rating */}
      <FormInput
        icon="star-outline"
        value={rating}
        onChange={setRating}
        placeholder="Rating (default 0)"
        keyboardType="numeric"
      />

      {/* Rating Count */}
      <FormInput
        icon="people-outline"
        value={ratingCount}
        onChange={setRatingCount}
        placeholder="Rating Count (default 0)"
        keyboardType="numeric"
      />

      {/* Image URL */}
      <FormInput
        icon="image-outline"
        value={imageUrl}
        onChange={(text) => {
          setImageUrl(text);
          setPickedImage(null);
        }}
        placeholder="Image URL (optional if picking file)"
      />

      {/* Pick Image */}
      <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
        <Ionicons name="images-outline" size={20} color="#fff" />
        <Text style={styles.pickText}>Pick Image from Gallery</Text>
      </TouchableOpacity>

      {/* Preview */}
      {(pickedImage || imageUrl) ? (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Image Preview</Text>
          <Image source={{ uri: pickedImage || imageUrl }} style={styles.previewImage} resizeMode="cover" />
        </View>
      ) : null}

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Ionicons name="save-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Save Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Reusable input component
const FormInput = ({ icon, value, onChange, placeholder, keyboardType = 'default', multiline = false }) => (
  <View style={styles.card}>
    <Ionicons name={icon} size={20} color="#a9745b" style={styles.icon} />
    <TextInput
      style={[styles.input, multiline && { height: 80 }]}
      placeholder={placeholder}
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      multiline={multiline}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 18,
    paddingTop: 45,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#a9745b',
    marginBottom: 25,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: { marginRight: 8 },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  pickButton: {
    backgroundColor: '#444',
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  pickText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  previewContainer: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
  previewText: { color: '#a9745b', fontSize: 16, fontWeight: '600', marginBottom: 10 },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#a9745b',
  },
  button: {
    backgroundColor: '#a9745b',
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    shadowColor: '#a9745b',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 8 },
});
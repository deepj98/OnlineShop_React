import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screen to display
const ProductDetailsScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontWeight: '600', fontSize: 20, paddingVertical: 10 }}>
        {item.name}
      </Text>
      <Text style={{ fontWeight: '500', paddingVertical: 10 }}>{item.category}</Text>
      <Text style={{ fontWeight: '500', fontSize: 18, paddingVertical: 10 }}>
        {item.price}
      </Text>
      <Text>{item.description}</Text>
    </View>
  );
};

// Screen to add a new product
const AddItemScreen = ({ navigation, route }) => {
  const { onAddItem } = route.params;
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleAddItem = () => {
    const newItem = {
      id: Math.random().toString(),
      name,
      category,
      price,
      description,
    };
    onAddItem(newItem);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontWeight: '600', fontSize: 20, paddingVertical: 10 }}>Add Item</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Category"
        style={styles.input}
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        style={styles.input}
      />
      <Button title="Add Product" onPress={handleAddItem} />
    </View>
  );
};

const ClothesScreen = ({ navigation }) => {
  const [clothes, setClothes] = useState([
    {
      id: 1,
      description: 'description1',
      name: 'product1',
      category: 'category1',
      price: 20,
    },
    {
      id: 2,
      description: 'description2',
      name: 'product2',
      category: 'category2',
      price: 50,
    },
  ]);

  const [filteredClothes, setFilteredClothes] = useState(clothes);
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleAddItem = (newItem) => {
    setClothes([...clothes, newItem]);
    setFilteredClothes([...clothes, newItem]);
  };

  const handleAddCloth = () => {
    navigation.navigate('AddItem', { onAddItem: handleAddItem });
  };

  const handleDeleteCloth = (id) => {
    const updatedClothes = clothes.filter((item) => item.id !== id);
    setClothes(updatedClothes);
    setFilteredClothes(updatedClothes);
  };

  const handleEditCloth = (item) => {
    navigation.navigate('EditItem', {
      item,
      clothes,
      setClothes,
      filteredClothes,
      setFilteredClothes,
    });
  };

  const handleFilterByCategory = () => {
    if (categoryFilter === '') {
      setFilteredClothes(clothes);
    } else {
      const filteredItems = clothes.filter(
        (item) => item.category.toLowerCase() === categoryFilter.toLowerCase()
      );
      setFilteredClothes(filteredItems);
    }
  };

  const handleSortByPrice = () => {
    const sortedClothes = [...filteredClothes].sort((a, b) => a.price - b.price);
    setFilteredClothes(sortedClothes);
  };

  const handleSortByPriceDesc = () => {
    const sortedClothes = [...filteredClothes].sort((a, b) => b.price - a.price);
    setFilteredClothes(sortedClothes);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#eeff',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20,
        borderRadius: 20,
      }}
      onPress={() => navigation.navigate('ProductDetails', { item })}
    >
      <View>
        <Text style={{ fontWeight: '600', fontSize: 20, paddingVertical: 10 }}>
          {item.name}
        </Text>
        <Text style={{ fontWeight: '500', paddingVertical: 10 }}>{item.category}</Text>
        <Text style={{ fontWeight: '500', fontSize: 18, paddingVertical: 10 }}>
          {item.price}
        </Text>
      </View>
      <Pressable onPress={() => handleDeleteCloth(item.id)} style={{ justifyContent: 'center' }}>
        <Text style={{ color: 'red', fontWeight: '600' }}>Delete</Text>
      </Pressable>
      <Pressable onPress={() => handleEditCloth(item)} style={{ justifyContent: 'center' }}>
        <Text style={{ color: 'blue', fontWeight: '600' }}>Update</Text>
      </Pressable>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', width: '100%' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          placeholder="Search by Category"
          value={categoryFilter}
          style={{
            height: 50,
            backgroundColor: '#eef',
            fontSize: 10,
            margin: 20,
            borderRadius: 10,
            padding: 10,
          }}
          onChangeText={(text) => setCategoryFilter(text)}
        />
        <Pressable
          onPress={handleFilterByCategory}
          style={{
            height: 40,
            justifyContent: 'center',
            backgroundColor: '#565',
            margin: 20,
            alignItems: 'center',
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: 6,
              padding: 5,
              justifyContent: 'center',
            }}
          >
            Filter
          </Text>
        </Pressable>
        <Pressable
          onPress={handleSortByPrice}
          style={{
            height: 40,
            justifyContent: 'center',
            backgroundColor: '#565',
            margin: 20,
            alignItems: 'center',
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: 6,
              padding: 5,
              justifyContent: 'center',
            }}
          >
            Sort by PriceASC
          </Text>
        </Pressable>
        <Pressable
          onPress={handleSortByPriceDesc}
          style={{
            height: 40,
            justifyContent: 'center',
            backgroundColor: '#565',
            margin: 20,
            alignItems: 'center',
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: 6,
              padding: 5,
              justifyContent: 'center',
            }}
          >
            Sort by PriceDESC
          </Text>
        </Pressable>
      </View>
      <FontAwesome5 name="sort" size={24} color="black" style={{ justifyContent: 'center' }} />
      <FlatList
        data={filteredClothes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddCloth}>
        <Text style={styles.addText}>Add item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Clothes">
        <Stack.Screen name="Clothes" component={ClothesScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  addButton: {
    height: 80,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#565',
    margin: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  addText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 24,
  },
  input: {
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '80%',
  },
});

export default App;

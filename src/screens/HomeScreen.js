import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/actions/cartActions';
import productData from '../assets/products.json';

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      // Show an alert before exiting the app
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true; // Prevents default back action
    };

    // Add event listener for hardware back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    loadMoreProducts();
  }, [page]);

  const loadMoreProducts = () => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    setProducts(prevProducts => [
      ...prevProducts,
      ...productData.products.slice(start, end),
    ]);
  };

  const handleAddToCart = product => {
    dispatch(addToCart(product));
    Alert.alert('Product added to cart!');
  };

  const renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Image
        source={{
          uri: item.thumbnail
            ? item.thumbnail
            : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Ffallback&psig=AOvVaw2AyAsX1zrqTgGvweA0S_sC&ust=1730966943486000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjyncagx4kDFQAAAAAdAAAAABAE',
        }}
        style={styles.thumbnail}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.brand}>Brand: {item.brand}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.discount}>
          Discount: {item.discountPercentage}%
        </Text>
        <Text style={styles.rating}>Rating: {item.rating} ★</Text>
        <Text style={styles.stock}>In Stock: {item.stock}</Text>
        <Button
          title="Add to Cart"
          onPress={() => handleAddToCart(item)}
          color="#4CAF50"
        />
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>BlTestTask</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartContainer}>
          <Image
            source={{uri: 'https://img.icons8.com/ios/452/shopping-cart.png'}}
            style={styles.cartIcon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartContainer: {
    backgroundColor: '#f2ef14',
    borderRadius: 50,
    padding: 8,
    elevation: 5,
  },
  cartIcon: {
    width: 25,
    height: 25,
  },
  listContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  productContainer: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 13,
    color: '#777',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  discount: {
    fontSize: 13,
    color: '#e91e63',
    marginBottom: 5,
  },
  rating: {
    fontSize: 13,
    color: '#ffa000',
    marginBottom: 5,
  },
  stock: {
    fontSize: 13,
    color: '#8e8e8e',
    marginBottom: 10,
  },
});

export default HomeScreen;

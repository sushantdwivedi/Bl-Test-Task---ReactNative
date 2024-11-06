import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../redux/actions/cartActions';

const CartScreen = ({navigation}) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Add" onPress={() => dispatch(addToCart(item))} />
          <Button
            title="Remove"
            onPress={() => dispatch(removeFromCart(item.id))}
            color="#FF6347"
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../assets/chevron-left.png')}
            style={styles.backIcon}
          />
          <Text style={styles.backText}>Home</Text>
        </TouchableOpacity>

        <Text style={styles.headerLeft}>Cart</Text>
        <Text style={styles.headerRight}>Total: ${totalPrice}</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
        style={[
          styles.checkoutButton,
          {backgroundColor: totalPrice > 0 ? '#4CAF50' : '#cccccc'},
        ]}
        onPress={() =>
          navigation.navigate('Checkout', {totalAmount: totalPrice})
        }
        disabled={totalPrice <= 0}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  backButton: {
    // marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  backText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1C7EF2',
  },
  headerLeft: {
    // marginLeft: '-40%',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkoutButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default CartScreen;

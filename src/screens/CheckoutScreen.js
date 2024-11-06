import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';

import {useDispatch} from 'react-redux';
import {clearCart} from '../redux/actions/cartActions';

const CheckoutScreen = ({navigation, route}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  const totalAmount = route.params?.totalAmount || 0;
  console.log(totalAmount, 'totalAmount');

  const handleCheckout = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      dispatch(clearCart());
      Alert.alert(
        'Order Complete',
        'Your order has been placed successfully! Payment Method: Cash on Delivery',
      );
      navigation.navigate('Home');
    }, 5000);
  };

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
          <Text style={styles.backText}>Cart</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Checkout</Text>
        <Text style={styles.headerTotal}>Total: ${totalAmount}</Text>
      </View>
      {isProcessing ? (
        <LottieView
          source={require('../assets/Success.json')}
          autoPlay
          loop={false}
          style={styles.lottieAnimation}
        />
      ) : (
        <>
          <View style={styles.paymentSection}>
            <Text style={styles.paymentText}>
              Payment Method: Cash on Delivery (COD)
            </Text>
          </View>

          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handleCheckout}>
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
    width: '100%',
  },
  backButton: {
    // padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 32,
    height: 32,
    // backgroundColor: 'red',
  },
  backText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1C7EF2',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  headerTotal: {
    fontSize: 18,
    fontWeight: 'bold',

    color: '#4CAF50',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    // padding: 20,
  },
  paymentSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
    width: '100%',
    elevation: 3,
    marginTop: 30,
  },
  paymentText: {
    fontSize: 16,
    color: '#555',
  },
  lottieAnimation: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  placeOrderButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CheckoutScreen;

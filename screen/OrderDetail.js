import React from 'react';
import { View, Text } from 'react-native';

const OrderDetail = ({ route }) => {
  const { product } = route.params;
  if (!product || !product.itemCart || !product.itemCart.ten) {
    return <Text >Không có thông tin sản phẩm</Text>;
  }
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.itemCart.ten}</Text>
    </View>
  );
};

export default OrderDetail;

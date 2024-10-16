import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Intro = () => {
  // Mảng chứa các đường dẫn đến hình ảnh
  const images = [
    require('../../../../public/client/uploads/1.png'),
    require('../../../../public/client/uploads/3.png'),
    require('../../../../public/client/uploads/1.png'),
    require('../../../../public/client/uploads/3.png'),
    require('../../../../public/client/uploads/1.png'),
    require('../../../../public/client/uploads/3.png'),
    require('../../../../public/client/uploads/1.png'),
    require('../../../../public/client/uploads/3.png'),
    require('../../../../public/client/uploads/1.png'),
    require('../../../../public/client/uploads/3.png')
  ];

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <View key={index} style={styles.gridItem}>
          <Image source={image} style={styles.image} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  gridItem: {
    width: '18%', // 5 cột, mỗi cột chiếm khoảng 18% (cộng thêm khoảng cách giữa các cột)
    aspectRatio: 1, // Đảm bảo hình vuông
    margin: '1%', // Khoảng cách giữa các ô
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default Intro;
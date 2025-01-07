import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ItemRelated from './itemRelated';


const RelatedFoodScreen = ({id}) => {
  const [data, setData] = useState([]);

  // Fetch Data, Call API
  useEffect(() => {
    fetchRelatedData(itemId);
  }, [itemId]);

  const fetchRelatedData = (id) => {
    // Bạn có thể thay đổi phần này để lấy dữ liệu thực tế từ API hoặc từ nguồn dữ liệu khác
    const relatedItems = [
      { id: 1, name: "Related Item 1" },
      { id: 2, name: "Related Item 2" },
      { id: 3, name: "Related Item 3" },
      { id: 4, name: "Related Item 4" },
    ];
    
    // Lọc hoặc xử lý dữ liệu liên quan dựa trên itemId
    setData(relatedItems);  // Đây là dữ liệu giả, thay bằng dữ liệu thực tế
  };

  return (
    <FlatList
      data={data}  // Dữ liệu được truyền vào
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => <ItemRelated key={item} />}  // Render mỗi item
    />
  );
};


export default RelatedFoodScreen;
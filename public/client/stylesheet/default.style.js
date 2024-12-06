import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",  // Đảm bảo container chiếm toàn bộ không gian
    alignItems: "stretch",
  },
  outletContainer: {
    height: '100%',
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 80,
  },
  searchContainer: {
    marginVertical: 10,
  },
  onboardingContainer: {
    marginBottom: 20,
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  collectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    color: 'blue',
  },
  containerScrollView: {
    flex: 1,
  },
  navigationBottomContainer: {
    position: 'absolute', // Đặt ở vị trí dưới cùng
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,  // Đảm bảo NavigationBottom sẽ hiển thị trên các phần tử khác
  },
});

  export default styles;
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 10,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  onboarding: {
    flex: 1.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  collectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#666',
    fontSize: 14,
  },
});

  export default styles;
import { StyleSheet } from 'react-native';

// Shared styles used by dashboard screens to produce a centered, clean layout
export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  pageContainer: { padding: 20, alignItems: 'center' },
  content: { width: '100%', maxWidth: 920 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  headerLeft: { flex: 1 },
  headerRight: { flexDirection: 'row', gap: 8 },
  title: { marginBottom: 4, textAlign: 'left' },
  subtitle: { color: '#555', marginBottom: 12 },
  centeredCard: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 18,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  cardSubtitle: { color: '#666', marginTop: 6, textAlign: 'center' },
  cardNumber: { marginTop: 10, fontSize: 18, fontWeight: '700' },
  section: { backgroundColor: '#fafafa', padding: 14, borderRadius: 10, marginVertical: 10 },
  sectionTitle: { fontWeight: '700', marginBottom: 8 },
  label: { fontWeight: '700', marginBottom: 6, color: '#333' },
  input: { borderWidth: 1, borderColor: '#e6e6e6', padding: 8, borderRadius: 6, marginBottom: 8, backgroundColor: 'transparent' },
  actionsRow: { marginTop: 12, flexDirection: 'row', justifyContent: 'center', gap: 8 },
});

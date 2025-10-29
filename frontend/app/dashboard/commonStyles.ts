import { StyleSheet } from 'react-native';

// Centralized design tokens to keep layout consistent across dashboard screens
const COLORS = {
  background: '#ffffff',
  panel: '#fafafa',
  border: '#e6e6e6',
  text: '#333333',
  muted: '#666666',
};

export default StyleSheet.create({
  // page scaffolding
  safe: { flex: 1, backgroundColor: COLORS.background },
  pageContainer: { padding: 20, alignItems: 'stretch' },
  content: { width: '100%', maxWidth: 920, alignSelf: 'center' },

  // header
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  headerLeft: { flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  headerRightChild: { marginLeft: 8 },

  // titles
  title: { marginBottom: 4, textAlign: 'left' },
  subtitle: { color: COLORS.muted, marginBottom: 12 },

  // cards
  centeredCard: {
    backgroundColor: COLORS.panel,
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
  cardSubtitle: { color: COLORS.muted, marginTop: 6, textAlign: 'center' },
  cardNumber: { marginTop: 10, fontSize: 18, fontWeight: '700' },

  // form sections
  section: { backgroundColor: COLORS.panel, padding: 14, borderRadius: 10, marginVertical: 10 },
  sectionTitle: { fontWeight: '700', marginBottom: 8 },
  label: { fontWeight: '700', marginBottom: 6, color: COLORS.text },

  // inputs
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'transparent',
    minHeight: 44,
  },
  inputMultiline: { height: 90, textAlignVertical: 'top' },
  pickerContainer: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, marginBottom: 10, overflow: 'hidden' },

  // form layout helpers
  formRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: undefined },
  twoColumn: { flexDirection: 'row', justifyContent: 'space-between', gap: undefined },

  // actions
  actionsRow: { marginTop: 12, flexDirection: 'row', justifyContent: 'center' },
  actionButtonSpacing: { marginRight: 8 },
});

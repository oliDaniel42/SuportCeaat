import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-core-responsive-screen';


const styles =  StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6E44FF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 112,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 90,
    textAlign: 'center',
    height:100,
},
  infocontainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
},
  placeholderText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
},
  Button:{
    marginBottom: 20,
},
  headerTitle: {
    fontSize: 25,
    color: '#fff',
    marginLeft: 150,
    alignItems:"center",
    paddingTop: 30,
},
  profileIconContainer: {
    alignItems: 'center',
    marginTop: 30,
},
  profileIcon: {
    width: 140,
    height: 140,
    backgroundColor: '#E0E0E0',
    borderRadius: 80,
},
  inputContainer: {
    paddingHorizontal: 32,
    marginTop: 80,
},
  inputRow: {
    marginBottom: 25,
},
  inputLabel: {
    marginBottom: 8,
    fontSize: 16,
    color: '#6E44FF',
},
  input: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
},
  editButton: {
    marginHorizontal: 32,
    marginTop: 20,
    backgroundColor: '#6E44FF',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
},
  editButtonText: {
    color: '#fff',
    fontSize: 18,
},
modalOverlay: {
  flex: 1,
  backgroundColor: '',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContainer: {
  width: '80%',
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 8,
  alignItems: 'center',
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
modalInput: {
  width: '100%',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  marginBottom: 20,
},
modalButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
cancelButton: {
  backgroundColor: '#ccc',
  padding: 10,
  borderRadius: 5,
  flex: 1,
  marginRight: 5,
},
cancelButtonText: {
  color: 'white',
  textAlign: 'center',
},
saveButton: {
  backgroundColor: '#6E44FF',
  padding: 10,
  borderRadius: 5,
  flex: 1,
  marginLeft: 5,
},
saveButtonText: {
  color: 'white',
  textAlign: 'center',
},
nameTitle:{
  fontSize: 20,
  color: '#fff',
  marginLeft: 2,
  textAlign:"center",
  paddingTop: 30,
},
messageContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 25,
  paddingHorizontal: moderateScale(16),
  paddingVertical: moderateScale(8),
  width: '100%',
  maxWidth: 600,
  marginVertical: moderateScale(10),
  backgroundColor:'white'
}
})

export default styles;
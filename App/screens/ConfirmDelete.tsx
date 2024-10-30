import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import axios from "axios";


export const ConfirmDelete = ({ data, visible, onPress }) => {
    const url = "http://localhost:3000/";
    const saveCar = () => {
        
        axios.delete(url + 'cars?id='+data.id)
            .then(response => {
                const res = response.data;
                switch (res.code) {
                    case 200:
                        onPress()
                        break;
                        case 300:
                          alert("Internal server error");
                          break;
                        default:
                          break;
                      }
                     
                
            })
            .catch(error => {
                console.error('Error posting data:', error.response ? error.response.data : error.message);
            });

    }


    return (

        <Modal
            animationType="slide"
            transparent={true}  
            visible={visible}
            onRequestClose={() => onPress} 
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <Text style={styles.header}>Are you sure you want to delete the car?</Text>                        
                        <TouchableOpacity style={styles.button} onPress={() => saveCar()}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    {/* Close button */}
                    <Pressable
                        style={styles.closeButton}
                        onPress={onPress}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

    const styles = StyleSheet.create({
        button: {
            backgroundColor: '#4CAF50',
            padding: 15,
            borderRadius: 10,
            width: '100%',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        input: {
            width: '100%',
            padding: 15,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 10,
            marginBottom: 20,
            backgroundColor: '#fff',
            fontSize: 16,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#333',
        },
        container: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#f8f8f8',
        },
        modalText: {
            fontSize: 18,
            marginBottom: 15,
            textAlign: 'center',
        },
        modalView: {
            width: 300,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 30,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalOverlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Transparent dark background
        },
        buttonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
        },
        closeButton: {
            backgroundColor: '#FF6347',
            padding: 15,
            borderRadius: 20,
            elevation: 5,
            marginTop: 20,
          }
    })
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import Geolocation from 'react-native-geolocation-service';

const FormSaveCar = ({ onPress, visible, idUser, title, btnText,data}) => {

    const url = "http://localhost:3000/";
    const [placas, setPlacas] = useState("");
    const [user_id, setUser_id] = useState(idUser);
    const [marca, setMarca] = useState("");
    const [color, setColor] = useState("");
    const [modelo, setModelo] = useState("");
    const [latitud, setLatitud] = useState(51.909864);
    const [longitud, setLongitud] = useState(-0.118092);


    const getLocation = () => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitud(latitude)
            setLongitud(longitude)
          },
          (error) => {
            console.error(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      };

    const processData = (response) =>{
        const res = response.data
        console.log(res.code);
        switch (res.code) {
            case 200:
                // alert("Car created");
                onPress(!visible)
                break;
            case 300:
                alert("Placas already exists");
                break;

            default:
                break;
        }
    }

    const saveCar = () => {
        if (placas.trim().length > 2 &&
            marca.trim().length > 2 &&
            color.trim().length > 2 &&
            modelo.trim().length > 2 &&
            latitud != 0 &&
            longitud != 0
        ) {
            const dataToSave = { user_id, placas, marca, color, modelo, latitud, longitud}
            
            if(data != null){
                console.log("Update");
                const dataPut = {...data, placas,marca,color,modelo}
                
                axios.put(url + 'carsById', dataPut, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer your_token_here'
                    }
                    })
                    .then(response => {
                        processData(response)
                    })
                    .catch(error => {
                        console.error('Error posting data:', error.response ? error.response.data : error.message); // Handle the error
                    });
            }else{
                axios.post(url + 'cars', dataToSave, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer your_token_here'
                    }
                    })
                    .then(response => {
                        processData(response)
                    })
                    .catch(error => {
                        console.error('Error posting data:', error.response ? error.response.data : error.message); // Handle the error
                    });
            }

        } else {
            console.log("Datos no validos");

        }
    }

    useEffect(() => {
        
            getLocation();
            console.log("Form data: ",data);
            
            if (data != null){
                setPlacas(data.plates)
                setUser_id(data.user_id)
                setMarca(data.brand)
                setColor(data.color)
                setModelo(data.model)
                setLatitud(data.latitude)
                setLongitud(data.longitude)
            }
        
      }, [data]);

    return (
        <Modal
            animationType="slide"  // Slide in from bottom
            transparent={true}     // Modal will be transparent around the content
            visible={visible}
            onRequestClose={() => onPress}  // Close when back button is pressed
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <Text style={styles.header}>{title}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Plates"
                            value={placas}
                            onChangeText={setPlacas}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Brand"
                            value={marca}
                            onChangeText={setMarca}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Color"
                            value={color}
                            onChangeText={setColor}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Model"
                            value={modelo}
                            onChangeText={setModelo}
                        />

                        <TouchableOpacity style={styles.button} onPress={()=>saveCar()}>
                            <Text style={styles.buttonText}>{btnText}</Text>
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
    );
};


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
});


export default FormSaveCar;
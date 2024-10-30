import { AdvancedMarker, APIProvider, CollisionBehavior, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, Text, Image,TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { io } from 'socket.io-client';
import storeSession from '../tools/storeSession';
import axios from 'axios';
import {AdvancedMarkerAnchorPoint} from '@vis.gl/react-google-maps';
import NewItemButton from './NewItemButton';
import FormSaveCar from './FormSaveCar';
import { Operations } from './Operations';

const { width, height } = Dimensions.get('window');
const SOCKET_SERVER_URL = 'http://localhost:3001';


// Update Button Component


const Dashboard = ({ navigation }) => {
  const [cars, setCars] = useState([
    // { id: '3', name: 'Car C', location: { lat: 51.909865, lng: -0.118092 } },
    // { id: '1', name: 'Car r', location: { lat: 51.909844, lng: -0.138092 } },
  ]);
  const [markerLocation, setMarkerLocation] = useState(null);
  
  const [tableData, setTableData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [changeVisible, setModalChangeVisible] = useState(false);
  const [dataModify, setDataModify] = useState(null);
  const setDataChange = (data) =>{
    setDataModify(data)
    setModalChangeVisible(true)
    // setTableData([])
  }
  
  const tableHead = ['Id','Plates', 'Owner', 'Brand', 'Color', 'Model', 'Last Update', 'Creation', 'Latitude', 'Longitude', 'Operations'];
  //   const tableData = cars.map(car => [car.name, 4, 8,4,3,4,3,2,1]);


  const [user, setUser] = useState(null)
  


  const getData = (data) => {

    console.log("1111111111111111111111111111");
    
    
    const url = "http://localhost:3000/";
    const urlTmp = `${url}cars?role=${data.role}&idUser=${data.id}`;
    console.log("uRLtEMPS: ", urlTmp);

    axios.get(urlTmp)
      .then(response => {
        const res = response.data;
        console.log("Res: ", res.data);

        switch (res.code) {
          case 200:

            const tableD = res.data.map(car => [car.id,car.plates, car.username, car.brand, car.color, car.model,
            car.updated_at, car.created_at, car.latitude, car.longitude, 
              <Operations data={car} onPressDrop={()=>getData(data)} onPress={() => setDataChange(car)}></Operations>
          ]);

            const carData = res.data.map(car => ({ id: car.id.toString(), name: car.id + " - "+car.plates + " - "+car.username, location: { lat: parseFloat(car.latitude), lng: parseFloat(car.longitude) } }));

            setCars(carData)
            console.log("Cars start: ", carData);

            setTableData(tableD);
            setUser(data)

            if (res.data.length > 0)
              setMarkerLocation({
                lat: parseFloat(res.data[0].latitude),
                lng: parseFloat(res.data[0].longitude)
              })

            break;
          case 300:
            alert("Credenciales no validas");
            break;
          default:
            break;
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      });
  }

  useEffect(() => {
    const initializeSocket = () => {
      const socket = io(SOCKET_SERVER_URL, {
        transports: ['websocket'], // Ensure using websockets
      });

      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
    });

    
      socket.on('connect', () => {
        console.log('Connected to the socket server');
        
    });

      socket.on('message', (message) => {
        console.log("id: ", message);
        console.log("lat: ", message.latitud);
        console.log("long: ", message.longitud);

        const newData = [message.id,message.plates, message.username, message.brand, message.color, message.model,
        message.updated_at, message.created_at, message.latitude.toString(), message.longitude.toString(),
        <Operations data={message} onPressDrop={()=>getData(user)} onPress={() => setDataChange(message)}></Operations>]

        const carData = {
          id: message.id.toString(), name: message.id +" - "+ message.plates+ " - "+message.username ,
          location: { lat: parseFloat(message.latitude), lng: parseFloat(message.longitude) }
        }

        
        setCars((prevTableData) => {
          const updatedItems = prevTableData.map((item) =>
            item.id == message.id // Assuming item has an id field to match
              ? carData
              : item
          );
          // console.log("New cars socket: ", updatedItems);

          return updatedItems;
        });


        setTableData((prevTableData) => {
          const updatedItems = prevTableData.map((item) =>
            item[0] == message.id // Assuming item has an id field to match
              ? newData
              : item
          );
          return updatedItems;
        });


      });

      return socket;
    };

    storeSession.getSession().then(data => {
      console.log("uSER: ", data);




      const socket = initializeSocket();


      getData(data)

      return () => {
        socket.disconnect(); // Clean up the socket connection
      };
    });

  }, []); // Only run once when the component mounts


  const makeUpdates = (value) =>{
 
    setModalChangeVisible(value)
    if (!value) {
      getData(user);
    }
  }

  const makeChanges = (value) =>{
    console.log("Refresh items: ", value);
    
    setModalVisible(value)
    if (!value) {
      console.log("Refreshing data");
      
      getData(user);
    }
  }
  const [markerRef, marker] = useAdvancedMarkerRef();


  if (user != null)
    return (
      <View style={styles.container}>
                {
                  markerLocation != null ? (
                   
                  
                    <APIProvider apiKey={"AIzaSyCCg23xyMPBwenW4av9zdi2TsIpQe9Ou4w"}>
                      <Map
                        style={styles.map}
                        defaultZoom={13}
                        defaultCenter={markerLocation}
                        gestureHandling={"greedy"}
                        disableDefaultUI
                      >
                        {cars.map(data => (
                          <Marker 
                          icon={{
                            url: "https://cdn.icon-icons.com/icons2/577/PNG/256/ExecutiveCar_Black_icon-icons.com_54904.png",
                            scale:0.1
                          }}
                          
                          title={data.name} key={data.id} position={data.location} />  
                  
         
                        ))}
                      </Map>
                    </APIProvider>
                
                  ) : (<View style={[styles.container, styles.center]}>
                    <Text>You do not have registered vehicles</Text>
                    <Image
                      source={require('../assets/car.png')}
                      style={styles.image}
                    />
                  </View>)
                }

        <FormSaveCar data={null} title={"Add a car"} btnText={"Add car"} idUser={user.id} onPress={() => makeChanges(!modalVisible)} visible={modalVisible}>
        </FormSaveCar>

        <FormSaveCar data={dataModify} title={"Modify Car"} btnText={"Save changes"} idUser={user.id} onPress={() => makeUpdates(!changeVisible)} visible={changeVisible}>
        </FormSaveCar>


        <View style={styles.tableContainer}>
          <View style={styles.newItemButton}>
            <NewItemButton onPress={() => setModalVisible(true)} />
          </View>
          <View style={{maxHeight:400}}>
            <ScrollView>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal={width < 1064 ?true:false} showsVerticalScrollIndicator={true}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                  <Row data={tableHead} style={styles.header} textStyle={styles.text} />
                  <TableWrapper style={styles.wrapper}>
                    <Rows

                      data={tableData}

                      textStyle={styles.text} />
                  </TableWrapper>
                </Table>
              </ScrollView>
            </ScrollView>

          </View>
        </View>
      </View>
    );
}


const styles = StyleSheet.create({
  text: {
    margin: 6,
    textAlign: 'center',
  },
  wrapper: {
    backgroundColor: 'white',
  },
  newItemButton: {
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#f1f8ff',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  map: {
    height: height * 0.5,
    borderRadius: 10,
    marginBottom: 15,
  },
  center: {
    alignItems: 'center',
    justifyContent: "center"
  },
  image: {
    width: 100,
    height: 100
  },
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 6,
  }
});
export default Dashboard;
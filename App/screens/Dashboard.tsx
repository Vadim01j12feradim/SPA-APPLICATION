import { APIProvider } from '@vis.gl/react-google-maps';
import { Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, Text, Image } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { io } from 'socket.io-client';
import storeSession from '../tools/storeSession';
import axios from 'axios';
import NewItemButton from './NewItemButton';
import FormSaveCar from './FormSaveCar';
import { Operations } from './Operations';

const { width, height } = Dimensions.get('window');
const SOCKET_SERVER_URL = 'http://localhost:3001';


const Dashboard = ({ navigation }) => {
  //#region Declarations
  const [cars, setCars] = useState([]);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [tableData, setTableData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [changeVisible, setModalChangeVisible] = useState(false);
  const [dataModify, setDataModify] = useState(null);
  const [user, setUser] = useState(null)
  //#endregion

  //#region Initialization
  const tableHead = ['Id', 'Plates', 'Owner', 'Brand', 'Color', 'Model', 'Last Update', 'Creation', 'Latitude', 'Longitude', 'Operations'];


  //#endregion

  const setDataChange = (data) => {
    setDataModify(data)
    setModalChangeVisible(true)
  }

  const getData = (data) => {


    const url = "http://localhost:3000/";
    const urlTmp = `${url}cars?role=${data.role}&idUser=${data.id}`;
    console.log("uRLtEMPS: ", urlTmp);

    axios.get(urlTmp)
      .then(response => {
        const res = response.data;
        switch (res.code) {
          case 200:

            const tableD = res.data.map(car => [car.id, car.plates, car.username, car.brand, car.color, car.model,
            car.updated_at, car.created_at, car.latitude, car.longitude,
            <Operations data={car} onPressDrop={() => getData(data)} onPress={() => setDataChange(car)}></Operations>
            ]);

            const carData = res.data.map(car => ({ id: car.id.toString(), name: car.id + " - " + car.plates + " - " + car.username, location: { lat: parseFloat(car.latitude), lng: parseFloat(car.longitude) } }));

            setCars(carData)

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
        transports: ['websocket'], 
      });

      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });


      socket.on('connect', () => {
        console.log('Connected to the socket server');

      });

      socket.on('message', (message) => {

        const newData = [message.id, message.plates, message.username, message.brand, message.color, message.model,
        message.updated_at, message.created_at, message.latitude.toString(), message.longitude.toString(),
        <Operations data={message} onPressDrop={() => getData(user)} onPress={() => setDataChange(message)}></Operations>]

        const carData = {
          id: message.id.toString(), name: message.id + " - " + message.plates + " - " + message.username,
          location: { lat: parseFloat(message.latitude), lng: parseFloat(message.longitude) }
        }


        setCars((prevTableData) => {
          const updatedItems = prevTableData.map((item) =>
            item.id == message.id 
              ? carData
              : item
          );

          return updatedItems;
        });


        setTableData((prevTableData) => {
          const updatedItems = prevTableData.map((item) =>
            item[0] == message.id
              ? newData
              : item
          );
          return updatedItems;
        });


      });

      return socket;
    };

    storeSession.getSession().then(data => {
      const socket = initializeSocket();
      getData(data)
      return () => {
        socket.disconnect();
      };
    });

  }, []);


  const makeUpdates = (value) => {
    setModalChangeVisible(value)
    if (!value) {
      getData(user);
    }
  }

  const makeChanges = (value) => {

    setModalVisible(value)
    if (!value) {
      getData(user);
    }
  }



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
                      scale: 0.1
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
          <View style={{ maxHeight: 400 }}>
            <ScrollView>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal={width < 1064 ? true : false} showsVerticalScrollIndicator={true}>
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
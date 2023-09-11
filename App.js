/* eslint-disable prettier/prettier */
import React, {useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';

import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
const App = () => {
  //Hooks
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);

  const nuevaCitaHandler = () => {
    console.log('nuevaCita');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>
      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
      </Pressable>

      {pacientes.length === 0 ?
        <Text style={styles.noPacientes}> No hay pacientes aún</Text>
       :
        <FlatList
        style={styles.listado}
          data={pacientes}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return (
              <Paciente
              paciente = {item.paciente}
              fecha={item.fecha}
              />
            );
          }}
        />
      }
      <Formulario
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setPacientes={setPacientes}
        pacientes={pacientes}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: 'bold',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 20,
    marginHorizontal: '2.5%',
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  listado: {
    marginTop:50,
    marginHorizontal: 30,
  },
});

export default App;

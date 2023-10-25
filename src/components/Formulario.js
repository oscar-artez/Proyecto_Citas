/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Button,
  Modal,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const Formulario = ({modalVisible, setModalVisible, setPacientes, pacientes, pacienteEdit,setPacienteEdit}) => {

  const [paciente, setPaciente] = useState('');
  const [id, setId] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [email, setEmail] = useState('');
  const [sintomas, setSintomas] = useState('');

  useEffect(() => {
      if (Object.keys(pacienteEdit).length > 0) {
         setId(pacienteEdit.id);
         setEmail(pacienteEdit.email);
         setFecha(pacienteEdit.fecha);
         setTelefono(pacienteEdit.telefono);
         setPaciente(pacienteEdit.paciente);
         setPropietario(pacienteEdit.propietario);
         setSintomas(pacienteEdit.sintomas);
        console.log("si hay algo",pacienteEdit)
      }
  }, [pacienteEdit]);

  const handleCita = () => {
    //validar
    if ([paciente, propietario,telefono, fecha, email, sintomas].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    const nuevoPaciente = {
      id: Date.now(),
      paciente,
      propietario,
      fecha,
      telefono,
      email,
      sintomas,
  };
    //Revisar si es un registro nuevo o edición
    if (id){
      nuevoPaciente.id = id;
      const pacientesEditados = pacientes.map(pacienteState => pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState)
      setPacientes(pacientesEditados);
      setPacienteEdit({});

    } else {
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);

    }

    setModalVisible(!modalVisible);
    setId('');
    setPaciente('');
    setPropietario('');
    setTelefono('');
    setFecha(new Date());
    setEmail('');
    setSintomas('');
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenid}>
        <ScrollView>
          <Text style={styles.titulo}>{pacienteEdit.id ? 'Editar' : 'Nueva'}<Text style={styles.tituloBold}> Cita</Text>
          </Text>
          <Pressable
            style={styles.btnCancelar}
            onPress={() => {
              setModalVisible(!modalVisible);
              setPacienteEdit({});
              setId('');
              setPaciente('');
              setPropietario('');
              setTelefono('');
              setFecha(new Date());
              setEmail('');
              setSintomas('');
            }}>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre paciente"
              placeholderTextColor={'#666666'}
              value={paciente}
              onChange={(e)=>setPaciente(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre propietario"
              placeholderTextColor={'#666666'}
              value={propietario}
              onChange={(e)=>setPropietario(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Email propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Email propietario"
              placeholderTextColor={'#666666'}
              keyboardType="email-address"
              value={email}
              onChange={(e)=>setEmail(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono propietario"
              placeholderTextColor={'#666666'}
              keyboardType="number-pad"
              value={telefono}
              onChange={(e)=>setTelefono(e.nativeEvent.text)}
              maxLength={10}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker
                date={fecha}
                locale="es"
                onDateChange={date => setFecha(date)}
              />
            </View>
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Síntomas"
              placeholderTextColor={'#666666'}
              value={sintomas}
              onChange={(e)=>setSintomas(e.nativeEvent.text)}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <Pressable style={styles.btnNuevaCita} onPress={()=>handleCita()}>
            <Text style={styles.btnNuevaCitaTexto}>{pacienteEdit.id ? 'Editar' : 'Agregar'} Paciente</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenid: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  tituloBold: {
    fontWeight: '900',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  textArea: {
    height: 100,
  },
  fechaContenedor: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  btnNuevaCita: {
    marginVertical: 30,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    textAlign: 'center',
    color: '#5827A4',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Formulario;

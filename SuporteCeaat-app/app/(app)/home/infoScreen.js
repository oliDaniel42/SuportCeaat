import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o pacote de ícones instalado
import { Stack } from 'expo-router';

const InfoScreen = () => {
    const [visibleModal, setVisibleModal] = useState(null); // controla o modal aberto

    // Função para abrir o modal do transtorno específico
    const openModal = (transtorno) => {
        setVisibleModal(transtorno);
    };

    // Função para fechar o modal
    const closeModal = () => {
        setVisibleModal(null);
    };

    return (
        <View style={styles.container}>
            {/* Botões para cada transtorno em fileiras de dois */}
            <Stack.Screen options={{headerShown: false}}/>
            <View style={styles.row}>
                <TouchableOpacity style={styles.button}  onPress={() => openModal('ansiedade')}>
                    <Ionicons name="alert-circle" size={40} style={styles.icon} />
                    <Text style={styles.buttonText}>Ansiedade</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => openModal('depressao')}>
                    <Ionicons name="sad" size={40} style={styles.icon} />
                    <Text style={styles.buttonText}>Depressão</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={() => openModal('tdah')}>
                    <Ionicons name="flash" size={40} style={styles.icon} />
                    <Text style={styles.buttonText}>TDAH</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => openModal('outro')}>
                    <Ionicons name="help-circle" size={40} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Outro</Text>
                </TouchableOpacity>
            </View>
            
            {/* Modal de Ansiedade */}
            <Modal visible={visibleModal === 'ansiedade'} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Ansiedade</Text>
                        <Text style={styles.modalText}>Aqui estão informações sobre ansiedade...</Text>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de Depressão */}
            <Modal visible={visibleModal === 'depressao'} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Depressão</Text>
                        <Text style={styles.modalText}>Aqui estão informações sobre depressão...</Text>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de TDAH */}
            <Modal visible={visibleModal === 'tdah'} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>TDAH</Text>
                        <Text style={styles.modalText}>Aqui estão informações sobre TDAH...</Text>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    icon: {
        marginRight: 8, // Espaço entre o ícone e o texto
        color: "white",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 8, // Espaçamento entre as linhas de botões
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6f48df',
        paddingVertical: 85,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 0.48, // Tamanho do botão para caber dois por linha
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 8, // Espaço entre o ícone e o texto
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        margin: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default InfoScreen;

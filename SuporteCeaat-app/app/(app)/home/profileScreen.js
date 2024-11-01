import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../context/authContext'
import {Stack} from  'expo-router'


const ProfileScreen = () => {
    const router = useRouter();
    const { user } = useAuth();

    const{logout} = useAuth()
    const handleLogout = async () =>{
        await logout()

    }
    
    return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nome do usuário</Text>
        </View>

        {/* Profile Icon */}
        <View style={styles.profileIconContainer}>
        <View style={styles.profileIcon}>
            {/* Placeholder for the profile image */}
        </View>
        </View>

        {/* Inputs */}
        <View style={styles.inputContainer}>

        <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput style={styles.input} value={user?.email} keyboardType="email-address" editable={false}/>
        </View>

        <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput style={styles.input} value="********" secureTextEntry={true} editable={false} />
        </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Alterar Foto</Text>
        </TouchableOpacity>

        {/* Edit Profile Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.editButton}>
        <Text style={styles.editButtonText}>Desconectar</Text>
        </TouchableOpacity>

    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6E44FF',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    height: 100,
  },
  backArrow: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 110,
    alignItems:"center",
    paddingTop: 20,
  },
  profileIconContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  profileIcon: {
    width: 150,
    height: 150,
    backgroundColor: '#E0E0E0',
    borderRadius: 80,
  },
  inputContainer: {
    paddingHorizontal: 32,
    marginTop: 40,
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
});

export default ProfileScreen;

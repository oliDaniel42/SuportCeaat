// app/_layout.js
import { createDrawerNavigator } from "@react-navigation/drawer";
import layout from "../(app)/home/_layout";
import stackRoute from "../(app)/stack/stack_route";
import changeScreen from  "./home/settings/changeScreen";
import { useState, useEffect} from "react";
import {ActivityIndicator, StyleSheet} from "react-native"


import { useRole } from "../inicial"; 

const Drawer = createDrawerNavigator();

const routes = {
  "Funcionário(a)": [
    { name: "home", component: layout, label: "Ínicio" },
    { name: "ComumProfile", component: stackRoute, label: "Seu Perfil" },
  ],
  "Aluno(a)": [
    { name: "StudentHome", component: layout, label: "Ínicio" },
    { name: "StudentProfile", component: stackRoute, label: "Seu Perfil" },
    { name: "StudentRegister", component: changeScreen, label: "Seu Registro" },
  ],
  "Psicopedagogo(a)": [
    { name: "PsicopedagogoHome", component: layout, label: "Ínicio" },
    { name: "Profile", component: stackRoute, label: "Seu Perfil" },
  ],
};

export default function DrawerRoutes() {
  const { role } = useRole(); 

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Verifique se o role está definido
    if (role) {
      setLoading(false);
    }
  }, [role]);
  
  if (loading) {
    // Retorne um carregador ou uma tela de carregamento
    return <ActivityIndicator style={styles.circle} />;
  }



  return (
    <Drawer.Navigator
      screenOptions={{
        title: "",
        headerStyle: { height: 0 },
      }}
    >
      {routes[role] && routes[role].map((route) => (
        <Drawer.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            drawerLabel: route.label,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  circle:{
      transform:[{scale: 2}],
      color: "gray",
  },
});

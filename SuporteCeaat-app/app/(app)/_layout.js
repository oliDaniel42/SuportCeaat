// app/_layout.js
import { Slot } from "expo-router";
import { createDrawerNavigator} from "@react-navigation/drawer";
import _layout from '../(app)/home/_layout'
import stackRoute from '../(app)/stack/stack_route';


const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator screenOptions={{
      title: '',
      headerStyle: {height: 0},
      }}>
        <Drawer.Screen 
        name="home" 
        component={_layout}
        options={{
            drawerLabel: 'Home',
        }}

        />
        <Drawer.Screen 
        name="Profile" 
        component={stackRoute}
        options={{
            drawerLabel: 'Configurações',
        }}
        />
    </Drawer.Navigator>
  );
}

import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../home/profileScreen";

const Stack = createStackNavigator();

export default  function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{title: ''}}>
            <Stack.Screen
            name="Home"
            component={ProfileScreen}
            />
        </Stack.Navigator>
    )
}

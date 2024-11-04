import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../home/settings/profileScreen";
import StudentProfile from "../home/settings/studentProfile";
import { useRole } from "../../inicial";

const Stack = createStackNavigator();

const getScreen = (role) => {

  
  switch (role) {
    case "Funcionário(a)":
    case "Psicopedagogo(a)":
      return (
          <Stack.Screen
            name="Home"
            component={ProfileScreen}
          />

      );
    case "Aluno(a)":
      return (
          <Stack.Screen
            name="Register"
            component={StudentProfile}
          />
      );
    default:
      return null;
  }
};

export default function HomeStack() {
  const { role } = useRole();

  return (
    <Stack.Navigator screenOptions={{ title: '' }}>
      {getScreen(role)}
    </Stack.Navigator>
  );
}
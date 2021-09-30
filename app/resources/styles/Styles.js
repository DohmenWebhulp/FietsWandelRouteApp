import { Dimensions } from "react-native";

const styling = {
    padding: 30,
    marginTop: 40,
    backgroundColor: 'red',
}
const textstyle = {
    fontSize: 25,
    marginRight: 10
}
const map = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
export {styling, textstyle, map};
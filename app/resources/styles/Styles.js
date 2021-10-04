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
const textstyle2 = {
    fontSize: 25,
    textAlign: 'center'
}
const textfield = {
    fontSize: 25,
    marginRight: 10,
    width: '100%',
    height: 70,
    padding: 15,
    backgroundColor: 'yellow',
    borderColor: 'orange',
    borderWidth: 5,
    marginBottom: 30,
    textAlign: 'center',
    color: 'grey'
}
const map = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
export {styling, textstyle, textstyle2, map, textfield};
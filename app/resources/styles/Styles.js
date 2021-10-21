import { Dimensions } from "react-native";

const styling = {
    padding: 25,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'red',
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 30
}

const margins = {
    margin: 30
}

const textstyle = {
    fontSize: 23,
    marginRight: 10
}
const textstyle2 = {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20
}

const buttonstyle = {
    height: 50,
    margin: 30
}

const textfield = {
    fontSize: 25,
    marginRight: 20,
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
export {styling, textstyle, buttonstyle, margins, textstyle2, map, textfield};
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { connect } from 'react-redux';
import * as Types from '../store/types';
import Blink from '../components/blink';
import { useNavigation } from '@react-navigation/native';
import field from '../field';


function Auto(props) {
    const [autoFuel, setAutoFuel] = useState(0);
    const [autoMissedFuel, setAutoMissedFuel] = useState(0);
    const [autoShuttledFuel, setAutoShuttledFuel] = useState(0);
    const [autoClimb, setAutoClimb] = useState("");
    const endgameText = ['N/A', 'Level 1', 'Level 2', 'Level 3'];

    const [autoActions, setAutoActions] = useState([]);
    const alliance = props.eventReducer.alliance;

    const themeColor1 = (alliance === 'red') ? '#DA4A19' : '#34BFA1';
    const themeBorderColor1 = (alliance === 'red') ? '#C03D25' : '#289E85';
    const themeColor2 ="#9c60bf";
    const themeBorderColor2 = "#734c8a";

    const fieldOrientation = props.eventReducer.fieldOrientation;
    const matchData = JSON.parse(JSON.stringify(props.eventReducer.currentMatchData));
    const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `Auto | ${matchData.team}`
    })
  }, [])

  const navigate = () => {
    matchData.autoFuel = autoFuel;
    matchData.autoMissedFuel = autoMissedFuel;
    matchData.autoShuttledFuel = autoShuttledFuel;
    matchData.autoClimbStatus = autoClimb;

    props.setCurrentMatchData(matchData);
    navigation.navigate('teleop');
  }

  const undo = () => {
    if (autoActions.length == 0) return;

    switch (autoActions[autoActions.length - 1]) {
      case 'autoFuel': setAutoFuel(autoFuel-1); break;
      case 'autoMissedFuel': setAutoMissedFuel(autoMissedFuel-1); break;
      case 'autoShuttledFuel': setAutoShuttledFuel(autoShuttledFuel-1); break;
      default: if (autoActions.length != 0) console.log('Wrong autoAction has been undone');
    }

    let temp = autoActions;
    temp.splice(autoActions.length-1, 1)
    setAutoActions(temp);
  }

  const addAction = (action) => {
    let temp = autoActions;
    temp.push(action);

    switch(action) {
      case 'autoFuel': setAutoFuel(autoFuel+1); break;
      case 'autoMissedFuel': setAutoMissedFuel(autoMissedFuel+1); break;
      case 'autoShuttledFuel': setAutoShuttledFuel(autoShuttledFuel+1); break;
      default: console.log('Invalid action added in auto');
    }

    setAutoActions(temp);
  }

  return (
    <View style={autoStyles.mainContainer}>


<ImageBackground
      style={{
        flex: 0.7,
        justifyContent: 'center',
        alignSelf: fieldOrientation === 1 ? "flex-start" : "flex-end"
      }}
      source={field[fieldOrientation][alliance]}
    >
    </ImageBackground>


      {/* empty column */}
      <View style={{ flex: 0.3 }}>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <View style={{ flex: 1, margin: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: '#753da1' }}>Scored: {autoFuel}</Text>
            <Text style={{ fontSize: 20, color: '#753da1' }}>Missed: {autoMissedFuel}</Text>
            <Text style={{ fontSize: 20, color: '#753da1' }}>Shuttled: {autoShuttledFuel}</Text>

          </View>


        </View>

        <View
          style={{
            flex: 0.65,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 10,

          }}
        >

          
            <View style={{flex: 0.7, flexDirection: "row", alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
              <TouchableOpacity style={[autoStyles.UndoButton, { width: 300, height: 80, marginBottom: 10, marginRight: 5, marginLeft: 5}]} onPress={() => undo()}>
                <Text style={[autoStyles.PrematchFont, autoStyles.PrematchButtonFont]}>Undo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[autoStyles.NextButton, { width: 300, height: 80, marginBottom: 10, marginLeft: 5, marginRight: 5}]} onPress={() => navigate()}>
                <Blink text='Continue to Teleop' />
              </TouchableOpacity>
        </View>
        </View>
      </View>
    </View>
  );
}


const autoStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  square: {
    width: '33%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'black',
    flex: 1,
    justifyContent: 'center'
  },
  gamePieceIcon: {
    height: '60%',
    width: '60%',
    alignSelf: 'center'
  },
  NextButton: {
    flex: 1,
    backgroundColor: '#2E8B57',
    borderRadius: 7,
    borderBottomWidth: 5,
    borderColor: '#006400',
    alignItems: 'center',
    justifyContent: 'center',
  },
  UndoButton: {
    flex: 1,
    backgroundColor: '#ffae19',
    borderRadius: 7,
    borderBottomWidth: 5,
    borderColor: '#c98302',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SpeakerButton: {
    flex: 1,
    borderRadius: 7,
    borderBottomWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AmpButton: {
    flex: 1,
    borderRadius: 7,
    borderBottomWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PrematchFont: {
    fontFamily: 'Helvetica-Light',
    fontSize: 20
  },
  PrematchButtonFont: {
    color: 'white',
    fontSize: 25
  },
});

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  setCurrentMatchData: (newMatchData) =>
    dispatch({
      type: Types.SET_CURRENT_MATCH_DATA,
      payload: {
        newMatchData,
      },
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Auto);

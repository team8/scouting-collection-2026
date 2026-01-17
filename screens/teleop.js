import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import * as Types from '../store/types';
import { useNavigation } from '@react-navigation/native';
import outtakeImages from '../outtake-images';

function Teleop(props) {
    const matchData = JSON.parse(JSON.stringify(props.eventReducer.currentMatchData));

    const [teleopFuel, setTeleopFuel] = useState(0);
    const [teleopMissedFuel, setTeleopMissedFuel] = useState(0);
    const [teleopShuttledFuel, setTeleopShuttledFuel] = useState(0)

    const alliance = props.eventReducer.alliance;
    const allianceBorderColor = (alliance === 'red') ? '#d10000' : '#0000d1';

    const themeColor1 = (alliance === 'red') ? '#DA4A19' : '#34BFA1';
    const themeBorderColor1 = (alliance === 'red') ? '#C03D25' : '#289E85';

  const fieldOrientation = props.eventReducer.fieldOrientation;

  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      title: `Teleop | ${matchData.team}`
    })
  }, [])



  const navigate = () => {
    matchData.teleopFuel = teleopFuel;
    matchData.teleopMissedFuel = teleopMissedFuel;
    matchData.teleopShuttledFuel = teleopShuttledFuel;

    props.setCurrentMatchData(matchData);
    navigation.navigate('postmatch');
  }

  const undo = () => {
    if(teleopActions.length == 0) return;

    switch (teleopActions[teleopActions.length - 1]) {
      case 'teleopFuel': setTeleopFuel(teleopFuel-1); break;
      case 'teleopMissedFuel': setTeleopMissedFuel(teleopMissedFuel-1); break;
      case 'teleopShuttledFuel': setTeleopShuttledFuel(teleopShuttledFuel-1); break;
      default: if (teleopActions.length != 0) console.log('Wrong teleopAction has been undone');
    }
    
    let temp = teleopActions;
    temp.splice(teleopActions.length-1, 1)
    setTeleopActions(temp);
  }

  const addAction = (action) => {
    let temp = teleopActions;
    temp.push(action);

    switch (action) {
      case 'teleopFuel': setTeleopFuel(teleopFuel+1); break;
      case 'teleopMissedFuel': setTeleopMissedFuel(teleopMissedFuel+1); break;
      case 'teleopShuttledFuel': setTeleopShuttledFuel(teleopShuttledFuel+1); break;
      default: console.log('Invalid action added in teleop');
    }

    setTeleopActions(temp);
  }

  return (
    <View style={teleopStyles.mainContainer}>


      <ImageBackground
        style={{ flex: 0.7, justifyContent: 'center', alignSelf: fieldOrientation == 1 ? "flex-start" : "flex-end" }}
        source={outtakeImages[fieldOrientation][alliance]}
      >
      </ImageBackground>



        {/* empty column */}
        <View style={{ flex: 1 }}>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >

            <View style={{ flex: 1, alignItems: 'center', marginTop: 10}}>
              <Text style={{ fontSize: 20, color: '#753da1' }}>Scored: {teleopFuel}</Text>
              <Text style={{ fontSize: 20, color: '#753da1' }}>Missed: {teleopMissedFuel}</Text>
              <Text style={{ fontSize: 20, color: '#753da1' }}>Shuttled: {teleopShuttledFuel}</Text>
            </View>

          </View>

          <View
            style={{
              flex: 0.8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 10,
              paddingHorizontal: 19
            }}
          >

            <View style={{flex: 1.1, flexDirection: "row"}}>
              <TouchableOpacity style={[teleopStyles.UndoButton, { width: 300, marginBottom: 10, marginRight:5 }]} onPress={() => undo()}>
                <Text style={[teleopStyles.PrematchFont, teleopStyles.PrematchButtonFont]}>Undo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[teleopStyles.NextButton, { width: 300, marginBottom: 10, marginLeft: 5, justifyContent: 'center', alignItems: 'center' }]} onPress={() => navigate()}>
                <Text style={[teleopStyles.PrematchFont, teleopStyles.PrematchButtonFont, {textAlign: 'center'}]}>Continue to Postmatch</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
</View>
  );}



  const teleopStyles = StyleSheet.create({
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
      marginHorizontal: 10
  },
    IntakeButton: {
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
    fontSize: 23
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
export default connectComponent(Teleop);
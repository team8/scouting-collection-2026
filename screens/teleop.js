import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import * as Types from '../store/types';
import { useNavigation } from '@react-navigation/native';

function Teleop(props) {
  const matchData = JSON.parse(JSON.stringify(props.eventReducer.currentMatchData));

  const [fuelScored, setFuelScored] = useState(0);
  const [fuelMissed, setFuelMissed] = useState(0);
  const [fuelShuttled, setFuelShuttled] = useState(0);
  const [fuelClusters, setFuelClusters] = useState(0);

  const [teleopActions, setTeleopActions] = useState([]);
  

  const alliance = props.eventReducer.alliance;

  const fieldOrientation = props.eventReducer.fieldOrientation;

  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      title: `Teleop | ${matchData.team}`
    })
  }, [])



  const navigate = () => {
    matchData.teleopFuel = fuelScored;
    matchData.teleopMissedFuel = fuelMissed;
    matchData.teleopShuttledFuel = fuelShuttled;
    matchData.teleopFuelClusters = fuelClusters;
    props.setCurrentMatchData(matchData);

    navigation.navigate('postmatch');
  }

  const undo = () => {
    if(teleopActions.length == 0) return;

    switch (teleopActions[teleopActions.length - 1]) {
      case 'score-10': setFuelScored(fuelScored + 10); break;
      case 'score-1': setFuelScored(fuelScored + 1); break;
      case 'score+1': setFuelScored(fuelScored - 1); break;
      case 'score+10': setFuelScored(fuelScored - 10); break;
      case 'missed-10': setFuelMissed(fuelMissed + 10); break;
      case 'missed-1': setFuelMissed(fuelMissed + 1); break;
      case 'missed+1': setFuelMissed(fuelMissed - 1); break;
      case 'missed+10': setFuelMissed(fuelMissed - 10); break;
      case 'shuttled-10': setFuelShuttled(fuelShuttled + 10); break;
      case 'shuttled-1': setFuelShuttled(fuelShuttled + 1); break;
      case 'shuttled+1': setFuelShuttled(fuelShuttled - 1); break;
      case 'shuttled+10': setFuelShuttled(fuelShuttled - 10); break;
      case 'clusters-1': setFuelClusters(fuelClusters + 1); break;
      case 'clusters+1': setFuelClusters(fuelClusters - 1); break;
      default: if (teleopActions.length != 0) console.log('Wrong teleopAction has been undone');
    }
    
    let temp = teleopActions;
    temp.splice(teleopActions.length-1, 1)
    setTeleopActions(temp);
  }

  const addAction = (action) => {
    let temp = teleopActions;
    var push = true;

    switch(action) {
      case 'score-10': setFuelScored(Math.max(0, fuelScored - 10)); break;
      case 'score-1': setFuelScored(Math.max(0, fuelScored - 1)); break;
      case 'score+1': setFuelScored(fuelScored + 1); break;
      case 'score+10': setFuelScored(fuelScored + 10); break;
      case 'missed-10': setFuelMissed(Math.max(0, fuelMissed - 10)); break;
      case 'missed-1': setFuelMissed(Math.max(0, fuelMissed - 1)); break;
      case 'missed+1': setFuelMissed(fuelMissed + 1); break;
      case 'missed+10': setFuelMissed(fuelMissed + 10); break;
      case 'shuttled-10': setFuelShuttled(Math.max(0, fuelShuttled - 10)); break;
      case 'shuttled-1': setFuelShuttled(Math.max(0, fuelShuttled - 1)); break;
      case 'shuttled+1': setFuelShuttled(fuelShuttled + 1); break;
      case 'shuttled+10': setFuelShuttled(fuelShuttled + 10); break;
      case 'clusters-1': setFuelClusters(Math.max(0, fuelClusters - 1)); break;
      case 'clusters+1': setFuelClusters(fuelClusters + 1); break;
      default: console.log('Invalid action added in auto');
    }
    if (push) temp.push(action);

    setTeleopActions(temp);
  }

  return (
    <View style={teleopStyles.mainContainer}>
      {/* Column 1 - Fuel Scored, Missed, and Shuttled Buttons */}
      <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{flex: 1}}>
          <Image source={require('../assets/game_pieces/fuel.png')} style={{flex: 1, resizeMode: 'contain', marginTop: 20}} />
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={teleopStyles.ScoreHeader}>Fuel Scored</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              margin: 10
            }}
          >
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginLeft: 100}]} onPress={() => addAction('score-10')}>
              <Text style={{fontSize: 20}}>-10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('score-1')}>
              <Text style={{fontSize: 20}}>-1</Text>
            </TouchableOpacity>
            <Text style={teleopStyles.Counter}>{fuelScored}</Text>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('score+1')}>
              <Text style={{fontSize: 20}}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginRight: 100}]} onPress={() => addAction('score+10')}>
              <Text style={{fontSize: 20}}>+10</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={teleopStyles.ScoreHeader}>Fuel Missed</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              margin: 10
            }}
          >
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginLeft: 100}]} onPress={() => addAction('missed-10')}>
              <Text style={{fontSize: 20}}>-10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('missed-1')}>
              <Text style={{fontSize: 20}}>-1</Text>
            </TouchableOpacity>
            <Text style={teleopStyles.Counter}>{fuelMissed}</Text>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('missed+1')}>
              <Text style={{fontSize: 20}}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginRight: 100}]} onPress={() => addAction('missed+10')}>
              <Text style={{fontSize: 20}}>+10</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={teleopStyles.ScoreHeader}>Fuel Shuttled</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              margin: 10
            }}
          >
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginLeft: 100}]} onPress={() => addAction('shuttled-10')}>
              <Text style={{fontSize: 20}}>-10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('shuttled-1')}>
              <Text style={{fontSize: 20}}>-1</Text>
            </TouchableOpacity>
            <Text style={teleopStyles.Counter}>{fuelShuttled}</Text>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('shuttled+1')}>
              <Text style={{fontSize: 20}}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginRight: 100}]} onPress={() => addAction('shuttled+10')}>
              <Text style={{fontSize: 20}}>+10</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>

      <View
        style={{flex: 0.5}}
      >
        <View style={{flex: 0.75, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={teleopStyles.ScoreHeader}>Fuel Clusters</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginLeft: 160}]} onPress={() => addAction('clusters-1')}>
              <Text style={{fontSize: 20}}>-1</Text>
            </TouchableOpacity>
            <Text style={teleopStyles.Counter}>{fuelClusters}</Text>
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginRight: 160}]} onPress={() => addAction('clusters+1')}>
              <Text style={{fontSize: 20}}>+1</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 0.25, flexDirection: "row", marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
          
          {/*<TouchableOpacity style={[teleopStyles.UndoButton, { width: 300, height: 80, marginBottom: 10, marginRight: 5, marginLeft: 5 }]} onPress={() => undo()}>
            <Text style={[teleopStyles.PrematchFont, teleopStyles.PrematchButtonFont]}>Undo</Text>
          </TouchableOpacity>*/}

          <TouchableOpacity style={[teleopStyles.NextButton, { width: 300, height: 80, marginBottom: 10, marginRight: 5, marginLeft: 5, justifyContent: 'center', alignItems: 'center' }]} onPress={() => navigate()}>
            <Text style={[teleopStyles.PrematchFont, teleopStyles.PrematchButtonFont, {textAlign: 'center'}]}>Continue to Postmatch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


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
    Button: {
      flex: 1,
      borderRadius: 7,
      borderBottomWidth: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    IncrementButton: {
      flex: 1,
      backgroundColor: '#89dcc1',
      borderRadius: 7,
      borderBottomWidth: 5,
      borderBottomColor: '#31a896',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 50,
      margin: 5,
    },
    Counter: {
      flex: 1, 
      fontSize: 20, 
      marginLeft: 10, 
      marginRight: 10, 
      textAlign: 'center'
    },
    ScoreHeader: {
      fontWeight: 'bold',
      fontSize: 30,
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
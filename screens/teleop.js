import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Types from '../store/types';
import { useNavigation } from '@react-navigation/native';

function Teleop(props) {
  const matchData = JSON.parse(JSON.stringify(props.eventReducer.currentMatchData));

  const [fuelScored, setFuelScored] = useState(0);
  const [fuelMissed, setFuelMissed] = useState(0);
  const [fuelShuttled, setFuelShuttled] = useState(0);
  const [fuelClusters, setFuelClusters] = useState(0);
  //const [shootRating, setShootRating] = useState(0);

  const [teleopActions, setTeleopActions] = useState([]);
  
  //const shootRange = ['N/A', '0-2 fuel/sec', '2-5 fuel/sec', '5-10 fuel/sec', '10-15 fuel/sec', '15+ fuel/sec'];

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
      case 'score-5': setFuelScored(fuelScored + 5); break;
      case 'score-3': setFuelScored(fuelScored + 3); break;
      case 'score-1': setFuelScored(fuelScored + 1); break;
      case 'score+1': setFuelScored(fuelScored - 1); break;
      case 'score+3': setFuelScored(fuelScored - 3); break;
      case 'score+5': setFuelScored(fuelScored - 5); break;
      case 'missed-5': setFuelMissed(fuelMissed + 5); break;
      case 'missed-3': setFuelMissed(fuelMissed + 3); break;
      case 'missed-1': setFuelMissed(fuelMissed + 1); break;
      case 'missed+1': setFuelMissed(fuelMissed - 1); break;
      case 'missed+3': setFuelMissed(fuelMissed - 3); break;
      case 'missed+5': setFuelMissed(fuelMissed - 5); break;
      case 'shuttled-5': setFuelShuttled(fuelShuttled + 5); break;
      case 'shuttled-3': setFuelShuttled(fuelShuttled + 3); break;
      case 'shuttled-1': setFuelShuttled(fuelShuttled + 1); break;
      case 'shuttled+1': setFuelShuttled(fuelShuttled - 1); break;
      case 'shuttled+3': setFuelShuttled(fuelShuttled - 3); break;
      case 'shuttled+5': setFuelShuttled(fuelShuttled - 5); break;
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
      case 'score-5': setFuelScored(Math.max(0, fuelScored - 5)); break;
      case 'score-3': setFuelScored(Math.max(0, fuelScored - 3)); break;
      case 'score-1': setFuelScored(Math.max(0, fuelScored - 1)); break;
      case 'score+1': setFuelScored(fuelScored + 1); break;
      case 'score+3': setFuelScored(fuelScored + 3); break;
      case 'score+5': setFuelScored(fuelScored + 5); break;
      case 'missed-5': setFuelMissed(Math.max(0, fuelMissed - 5)); break;
      case 'missed-3': setFuelMissed(Math.max(0, fuelMissed - 3)); break;
      case 'missed-1': setFuelMissed(Math.max(0, fuelMissed - 1)); break;
      case 'missed+1': setFuelMissed(fuelMissed + 1); break;
      case 'missed+3': setFuelMissed(fuelMissed + 3); break;
      case 'missed+5': setFuelMissed(fuelMissed + 5); break;
      case 'shuttled-5': setFuelShuttled(Math.max(0, fuelShuttled - 5)); break;
      case 'shuttled-3': setFuelShuttled(Math.max(0, fuelShuttled - 3)); break;
      case 'shuttled-1': setFuelShuttled(Math.max(0, fuelShuttled - 1)); break;
      case 'shuttled+1': setFuelShuttled(fuelShuttled + 1); break;
      case 'shuttled+3': setFuelShuttled(fuelShuttled + 3); break;
      case 'shuttled+5': setFuelShuttled(fuelShuttled + 5); break;
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
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginLeft: 20}]} onPress={() => addAction('score-5')}>
              <Text style={{fontSize: 20}}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('score-3')}>
              <Text style={{fontSize: 20}}>-3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('score-1')}>
              <Text style={{fontSize: 20}}>-1</Text>
            </TouchableOpacity>
            <Text style={teleopStyles.Counter}>{fuelScored}</Text>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('score+1')}>
              <Text style={{fontSize: 20}}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('score+3')}>
              <Text style={{fontSize: 20}}>+3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginRight: 20}]} onPress={() => addAction('score+5')}>
              <Text style={{fontSize: 20}}>+5</Text>
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
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginLeft: 20}]} onPress={() => addAction('missed-5')}>
              <Text style={{fontSize: 20}}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('missed-3')}>
              <Text style={{fontSize: 20}}>-3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('missed-1')}>
              <Text style={{fontSize: 20}}>-1</Text>
            </TouchableOpacity>
            <Text style={teleopStyles.Counter}>{fuelMissed}</Text>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('missed+1')}>
              <Text style={{fontSize: 20}}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('missed+3')}>
              <Text style={{fontSize: 20}}>+3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginRight: 20}]} onPress={() => addAction('missed+5')}>
              <Text style={{fontSize: 20}}>+5</Text>
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
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginLeft: 20}]} onPress={() => addAction('shuttled-5')}>
              <Text style={{fontSize: 20}}>-5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('shuttled-3')}>
              <Text style={{fontSize: 20}}>-3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('shuttled-1')}>
              <Text style={{fontSize: 20}}>-1</Text>
            </TouchableOpacity>
            <Text style={teleopStyles.Counter}>{fuelShuttled}</Text>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('shuttled+1')}>
              <Text style={{fontSize: 20}}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton]} onPress={() => addAction('shuttled+3')}>
              <Text style={{fontSize: 20}}>+3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[teleopStyles.IncrementButton, {marginRight: 20}]} onPress={() => addAction('shuttled+5')}>
              <Text style={{fontSize: 20}}>+5</Text>
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
        {/*<View style={{alignItems: 'stretch'}}>
          <Text style={[teleopStyles.ScoreHeader, {textAlign: 'center', marginBottom: 10}]}>Shooting Rating (approximate)</Text>
          <Slider
              thumbTintColor='#24a2b6'
              value={shootRating}
              minimumValue={0}
              maximumValue={5}
              step={1}
              onValueChange={(i) => setShootRating(i)} />
          <Text>{shootRange[shootRating]}</Text>
        </View>*/}
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
      height: 60,
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
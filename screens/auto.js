import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux';
import * as Types from '../store/types';
import Blink from '../components/blink';
import { useNavigation } from '@react-navigation/native';
import { match } from 'assert';


function Auto(props) {

  const [scored, setScored] = useState(0);
  const [missed, setMissed] = useState(0);
  const [shuttled, setShuttled] = useState(0);

  const [climbStatus, setClimbStatus] = useState(0);

  const [autoActions, setAutoActions] = useState([]);

  const climbOptions = ['N/A', 'Level 1'];

  const alliance = props.eventReducer.alliance;

  const fieldOrientation = props.eventReducer.fieldOrientation;

  const matchData = JSON.parse(JSON.stringify(props.eventReducer.currentMatchData));

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `Auto | ${matchData.team}`
    })
  }, [])

  const navigate = () => {
    matchData.autoScoredAttempts = scored;
    matchData.autoMissedAttempts = missed;
    matchData.autoShuttledAttempts = shuttled;
    matchData.autoClimbStatus = climbStatus;
    props.setCurrentMatchData(matchData);
    navigation.navigate('teleop');
  }

  const undo = () => {
    if(autoActions.length == 0) return;

    switch (autoActions[autoActions.length - 1]) {
      case 'scored+1': setScored(Math.max(0, scored - 1)); break;
      case 'missed+1': setMissed(Math.max(0, missed - 1)); break;
      case 'shuttled+1': setShuttled(Math.max(0, shuttled - 1)); break;
      case 'scored-1': setScored(scored + 1); break;
      case 'missed-1': setMissed(missed + 1); break;
      case 'shuttled-1': setShuttled(shuttled + 1); break;
      default: if (autoActions.length != 0) console.log('Wrong autoAction has been undone');
    }

    let temp = autoActions;
    temp.splice(autoActions.length-1, 1)
    setAutoActions(temp);
  }

  const addAction = (action) => {
    let temp = autoActions;
    var push = true;

    switch(action) {
      case 'scored+1': setScored(scored + 1); break;
      case 'missed+1': setMissed(missed + 1); break;
      case 'shuttled+1': setShuttled(shuttled + 1); break;
      case 'scored-1': setScored(Math.max(0, scored - 1)); break;
      case 'missed-1': setMissed(Math.max(0, missed - 1)); break;
      case 'shuttled-1': setShuttled(Math.max(0, shuttled - 1)); break;
      default: console.log('Invalid action added in auto');
    }
    if (push) temp.push(action);
    setAutoActions(temp);
  }

  return (
    <View style={autoStyles.mainContainer}>
      {/* Column 1 - Fuel Scored, Missed, and Shuttled Buttons */}
      <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{flex: 1}}>
          <Image source={require('../assets/game_pieces/fuel.png')} style={{flex: 1, resizeMode: 'contain', marginTop: 20}} />
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={autoStyles.ScoreHeader}>Clusters Scored</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              margin: 10
            }}
          >
            <TouchableOpacity style={[autoStyles.IncrementButton, {marginLeft: 20}]} onPress={() => addAction('scored-1')}>
              <Text style={{fontSize: 20}}>-1</Text>
            </TouchableOpacity>
            <Text style={autoStyles.Counter}>{scored}</Text>
            <TouchableOpacity style={[autoStyles.IncrementButton, {marginRight: 20}]} onPress={() => addAction('scored+1')}>
              <Text style={{fontSize: 20}}>+1</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={autoStyles.ScoreHeader}>Clusters Missed</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              margin: 10
            }}
          >
            <TouchableOpacity style={[autoStyles.IncrementButton, {marginLeft: 20}]} onPress={() => addAction('missed-1')}>
              <Text style={{fontSize: 20}}>-1</Text>
            </TouchableOpacity>
            <Text style={autoStyles.Counter}>{missed}</Text>
            <TouchableOpacity style={[autoStyles.IncrementButton, {marginRight: 20}]} onPress={() => addAction('missed+1')}>
              <Text style={{fontSize: 20}}>+1</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={autoStyles.ScoreHeader}>Clusters Shuttled</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              margin: 10
            }}
          >
            <TouchableOpacity style={[autoStyles.IncrementButton, {marginLeft: 20}]} onPress={() => addAction('shuttled-1')}>
              <Text style={{fontSize: 20}}>-1</Text>
            </TouchableOpacity>
            <Text style={autoStyles.Counter}>{shuttled}</Text>
            <TouchableOpacity style={[autoStyles.IncrementButton, {marginRight: 20}]} onPress={() => addAction('shuttled+1')}>
              <Text style={{fontSize: 20}}>+1</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
      {/* Column 2 - Climb Status and Navigation Buttons */}
      <View style={{ flex: 0.5 }}>
        <View style={{flex: 0.75, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={autoStyles.ScoreHeader}>Climb Level</Text>
          <ButtonGroup 
            onPress={setClimbStatus}
            selectedIndex={climbStatus}
            buttons={climbOptions}
            containerStyle={{height: 50}}
            selectedButtonStyle={{backgroundColor: '#89dcc1', borderBottomColor: '#31a896'}}
          />
        </View>
        <View style={{flex: 0.25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>

          {/*<TouchableOpacity style={[autoStyles.UndoButton, { height: 80, marginBottom: 10, marginRight: 5, marginLeft: 5}]} onPress={() => undo()}>
            <Text style={[autoStyles.PrematchFont, autoStyles.PrematchButtonFont]}>Undo</Text>
          </TouchableOpacity>*/}
          
          <TouchableOpacity style={[autoStyles.NextButton, { height: 80, marginBottom: 10, marginLeft: 5, marginRight: 5}]} onPress={() => navigate()}>
            <Blink text='Continue to Teleop' />
          </TouchableOpacity>
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

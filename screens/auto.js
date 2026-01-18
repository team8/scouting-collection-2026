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
import outtakeImages from '../outtake-images';
import AutoIntakeModal from "../components/autoIntakeModal";
import IntakeLocationModal from "../components/intakeLocationModal";
import ShotSuccessModal from "../components/shotSuccessModal";
import FuelShootModal from '../components/fuelShootModal';


function Auto(props) {
  const [coral1, setCoral1] = useState(0);
  const [coral2, setCoral2] = useState(0);
  const [coral3, setCoral3] = useState(0);
  const [coral4, setCoral4] = useState(0);

  const [highlightedCell, setHighlightedCell] = useState(null); 

  const [coralLevel, setCoralLevel] = useState(0);

  const [algaeProcessor, setAlgaeProcessor] = useState(0);
  const [algaeRobotNet, setAlgaeRobotNet] = useState(0);
  const [failedAlgaeRobotNet, setFailedAlgaeRobotNet] = useState(0);
  const [algaeRemovedHigh, setAlgaeRemovedHigh] = useState(0);
  const [algaeRemovedLow, setAlgaeRemovedLow] = useState(0);

  const [mobility, setMobility] = useState(false);

  const [groundIntakes, setGroundIntakes] = useState(0);
  const [substationIntakes, setSubstationIntakes] = useState(0);
  const [failedGroundIntakes, setFailedGroundIntakes] = useState(0);
  const [failedSubstationIntakes, setFailedSubstationIntakes] = useState(0);

  const [coralModalVisible, setCoralModalVisible] = useState(false);
  const [algaeAutoModalVisible, setAlgaeAutoModalVisible] = useState(false);
  const [intakeModalVisible, setIntakeModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const [autoActions, setAutoActions] = useState([]);

  const alliance = props.eventReducer.alliance;
  const ampColor = (alliance === 'red') ? '#DA4A19' : '#34BFA1';
  const ampBorderColor = (alliance === 'red') ? '#C03D25' : '#289E85';
  const intakeColor ="#9c60bf";
  const intakeBorderColor = "#734c8a";

  const fieldOrientation = props.eventReducer.fieldOrientation;

  const matchData = JSON.parse(JSON.stringify(props.eventReducer.currentMatchData));

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `Auto | ${matchData.team}`
    })
  }, [])

  const navigate = () => {
    matchData.autoCoral1 = coral1;
    matchData.autoCoral2 = coral2;
    matchData.autoCoral3 = coral3;
    matchData.autoCoral4 = coral4;
    matchData.autoAlgaeProcessor = algaeProcessor;
    matchData.autoAlgaeRobotNet = algaeRobotNet;
    matchData.autoFailedAlgaeRobotNet = failedAlgaeRobotNet;
    matchData.autoAlgaeRemovedHigh = algaeRemovedHigh;
    matchData.autoAlgaeRemovedLow = algaeRemovedLow;
    matchData.autoActions = autoActions;
    matchData.mobility = mobility;
    matchData.autoGroundIntakes = groundIntakes;
    matchData.autoSubstationIntakes = substationIntakes;
    matchData.failedAutoGroundIntakes = failedGroundIntakes;
    matchData.failedAutoSubstationIntakes = failedSubstationIntakes;
    props.setCurrentMatchData(matchData);
    navigation.navigate('teleop');
  }

  const undo = () => {
    if(autoActions.length == 0) return;

    switch (autoActions[autoActions.length - 1]) {
      case 'algaeProcessor': setAlgaeProcessor(algaeProcessor-1); break;
      case 'algaeRobotNet': setAlgaeRobotNet(algaeRobotNet-1); break;
      case 'failedAlgaeRobotNet': setFailedAlgaeRobotNet(failedAlgaeRobotNet-1); break;
      case 'coral1': setCoral1(coral1-1); break;
      case 'coral2': setCoral2(coral2-1); break;
      case 'coral3': setCoral3(coral3-1); break;
      case 'coral4': setCoral4(coral4-1); break;
      case 'algaeRemovedHigh': setAlgaeRemovedHigh(algaeRemovedHigh-1); break;
      case 'algaeRemovedLow': setAlgaeRemovedLow(algaeRemovedLow-1); break;
      case 'groundIntake': setGroundIntakes(groundIntakes-1); break;
      case 'substationIntake': setSubstationIntakes(substationIntakes-1); break;
      case 'failedGroundIntake': setFailedGroundIntakes(failedGroundIntakes-1); break;
      case 'failedSubstationIntake': setFailedSubstationIntakes(failedSubstationIntakes-1); break;
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
      case 'algaeProcessor': setAlgaeProcessor(algaeProcessor+1); break;
      case 'algaeRobotNet': setAlgaeRobotNet(algaeRobotNet+1); break;
      case 'failedAlgaeRobotNet': setFailedAlgaeRobotNet(failedAlgaeRobotNet+1); break;
      case 'coral1': setCoral1(coral1+1); break;
      case 'coral2': setCoral2(coral2+1); break;
      case 'coral3': setCoral3(coral3+1); break;
      case 'coral4': setCoral4(coral4+1); break;
      case 'algaeRemovedHigh': setAlgaeRemovedHigh(algaeRemovedHigh+1); break;
      case 'algaeRemovedLow': setAlgaeRemovedLow(algaeRemovedLow+1); break;
      case 'groundIntake': setGroundIntakes(groundIntakes+1); break;
      case 'substationIntake': setSubstationIntakes(substationIntakes+1); break;
      case 'failedGroundIntake': setFailedGroundIntakes(failedGroundIntakes+1); break;
      case 'failedSubstationIntake': setFailedSubstationIntakes(failedSubstationIntakes+1); break;
      default: console.log('Invalid action added in auto');
    }

    setAutoActions(temp);
  }

  return (
    <View style={autoStyles.mainContainer}>

  <AutoIntakeModal
        intakeModalVisible={intakeModalVisible}
        setIntakeModalVisible={setIntakeModalVisible}
        addAction={addAction}
      />

      <CoralModal
          coralModalVisible={coralModalVisible}
          setCoralModalVisible={setCoralModalVisible}
          matchPhase='auto'
          modalType={modalType}
          fieldOrientation={fieldOrientation}
          autoActions={autoActions}
          addAction={addAction}
          coralLevel={coralLevel}
      />

      <AlgaeAutoModal
          algaeAutoModalVisible={algaeAutoModalVisible}
          setAlgaeAutoModalVisible={setAlgaeAutoModalVisible}
          matchPhase='auto'
          modalType={modalType}
          fieldOrientation={fieldOrientation}
          autoActions={autoActions}
          addAction={addAction}
      />

<ImageBackground
      style={{
        flex: 0.7,
        justifyContent: 'center',
        alignSelf: fieldOrientation === 1 ? "flex-start" : "flex-end"
      }}
      source={outtakeImages[fieldOrientation][alliance]}
    >
      <View style={{ width: "100%", alignSelf: "center" }}>
        {[...Array(10).keys()].map((y) => (
          <View 
            style={{ flexDirection: 'row', width: "100%", height: "10%" }} 
            key={`row-${y}`}
          >
            {[...Array(10).keys()].map((x) => {
              const l1Selected = y > 6;
              const l4Selected = y < 3;
              const isHighlighted = (l1Selected && (highlightedCell===1) || (l4Selected && (highlightedCell === 4)));

              return (
                <TouchableOpacity
                  key={`cell-${x}-${y}`}
                  style={[
                    { 
                      borderColor: "black",
                      borderWidth: 0, 
                      width: "10%", 
                      justifyContent: 'center', 
                      alignItems: 'center' 
                    },
                    isHighlighted && { backgroundColor: "rgba(0, 255, 0, 0.5)" }
                  ]}
                  onPress={() => {
                    console.log(`Pressed cell: (${x}, ${y})`);
                    if (y < 3) {
                      setCoralLevel(4);
                      setHighlightedCell(4);
                      setTimeout(() => {
                        setHighlightedCell(0);
                      }, 500);                
                      console.log("L4 selected");
                      addAction('coral4');
                    } else if (y > 2 && y < 5) {
                      setCoralLevel(3);
                      setCoralModalVisible(true);
                    } else if (y > 4 && y < 7) {
                      setCoralLevel(2);
                      setCoralModalVisible(true);
                    } else {
                      setCoralLevel(1);
                      setHighlightedCell(1);
                      setTimeout(() => {
                        setHighlightedCell(0);
                      }, 500);                
                      console.log("L1 selected");
                      addAction('coral1');
                    }
                  }}
                >
                  <Text> </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
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

          <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' , marginTop: 10, flexDirection: 'row'}}>
            <Text style={[autoStyles.Font, { marginLeft: 50, fontSize: 18, marginRight: 5}]}>Mobility Bonus</Text>
            <Switch
              style={{marginLeft: 5}}
              onValueChange={(value) => setMobility(value)}
              value={mobility}
            />
          </View>

          <View style={{ flex: 1, margin: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: '#753da1' }}>Coral Level 1: {coral1}</Text>
            <Text style={{ fontSize: 20, color: '#753da1' }}>Coral Level 2: {coral2}</Text>
            <Text style={{ fontSize: 20, color: '#753da1' }}>Coral Level 3: {coral3}</Text>
            <Text style={{ fontSize: 20, color: '#753da1' }}>Coral Level 4: {coral4}{"\n"}</Text>
            <Text style={{ fontSize: 20, color: '#2d3696' }}>High Algae Removed: {algaeRemovedHigh}</Text>
            <Text style={{ fontSize: 20, color: '#2d3696' }}>Low Algae Removed: {algaeRemovedLow}</Text>
            <Text style={{ fontSize: 20, color: '#178044' }}>Algae Processor: {algaeProcessor}</Text>
            <Text style={{ fontSize: 20, color: '#178044' }}>Successful Algae Net: {algaeRobotNet}</Text>
            <Text style={{ fontSize: 20, color: '#f54747', fontWeight: 'bold' }}>Failed Algae Net: {failedAlgaeRobotNet}{"\n"}</Text>
            <Text style={{ fontSize: 20 }}>Ground Intakes: {groundIntakes}</Text>
            <Text style={{ fontSize: 20}}>Substation Intakes: {substationIntakes}</Text>
            <Text style={{ fontSize: 20, color: '#f54747', fontWeight: 'bold' }}>Failed Ground Intakes: {failedGroundIntakes}</Text>
            <Text style={{ fontSize: 20, color: '#f54747', fontWeight: 'bold' }}>Failed Substation Intakes: {failedSubstationIntakes}</Text>
          
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
          <TouchableOpacity style={[autoStyles.AmpButton, { width: 300, marginBottom: 5, backgroundColor: intakeColor, borderBottomColor: intakeBorderColor }]} onPress={() => { setIntakeModalVisible(true) }}>
            <Text style={[autoStyles.PrematchFont, autoStyles.PrematchButtonFont]}>Intake</Text>
          </TouchableOpacity>
          
          
          <TouchableOpacity style={[autoStyles.AmpButton, { width: 300, marginBottom: 10, backgroundColor: ampColor, borderBottomColor: ampBorderColor }]} onPress={() => {
            setModalType('Amp');
            setAlgaeAutoModalVisible(!algaeAutoModalVisible);
          }}>
            <Text style={[autoStyles.PrematchFont, autoStyles.PrematchButtonFont]}>Algae</Text>
          </TouchableOpacity>
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

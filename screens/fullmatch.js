import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  Touchable,
  KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux';
import * as Types from '../store/types';
import NotesModal from '../components/notesModal';
import Stopwatch from '../components/stopwatch';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';

function FullMatch(props) {
    const alliance = props.eventReducer.alliance;
    const fieldOrientation = props.eventReducer.fieldOrientation;
    const matchData = JSON.parse(JSON.stringify(props.eventReducer.currentMatchData));
    const navigation = useNavigation();

    const [died, setDied] = useState(false);
    const [stuck, setStuck] = useState(false);
    const [tipped, setTipped] = useState(false);

    const [autoDepot, setAutoDepot] = useState(false);
    const [autoSource, setAutoSource] = useState(false);
    const [autoMid, setAutoMid] = useState(false);
    const [autoTime, setAutoTime] = useState(0.0);

    const [groundIntake, setGroundIntake] = useState(false);
    const [sourceIntake, setSourceIntake] = useState(false);

    const [autoNotes, setAutoNotes] = useState("");
    const [driveNotes, setDriveNotes] = useState("");
    const [intakeNotes, setIntakeNotes] = useState("");
    const [defenseNotes, setDefenseNotes] = useState("");
    const [cycleNotes, setCycleNotes] = useState("");
    const [climbNotes, setClimbNotes] = useState("");
    const [shootNotes, setShootNotes] = useState("");

    // const [notesModalVisible, setNotesModalVisible] = useState(false);


    useEffect(() => {
        navigation.setOptions({
          title: `Match | ${matchData.team}`
        })
      }, [])

    const navigate = () => {
        if (autoNotes === "" || 
            driveNotes === "" || 
            intakeNotes === "" || 
            defenseNotes === "" || 
            cycleNotes === "" || 
            climbNotes === "" || 
            shootNotes === "") {
                alert("Please fill out all notes.");
                return;
        }
        matchData.autoDepot = autoDepot;
        matchData.autoSource = autoSource;
        matchData.autoMid = autoMid;
        matchData.timeToMid = autoTime;

        matchData.usedGroundIntake = groundIntake;
        matchData.usedSourceIntake = sourceIntake;

        matchData.died = died;
        matchData.stuck = stuck;
        matchData.tipped = tipped;

        matchData.autoNotes = autoNotes.replace(/ /g, '>').replace(/,/g, '<');
        matchData.driveNotes = driveNotes.replace(/ /g, '>').replace(/,/g, '<');
        matchData.intakeNotes = intakeNotes.replace(/ /g, '>').replace(/,/g, '<');
        matchData.defenseNotes = defenseNotes.replace(/ /g, '>').replace(/,/g, '<');
        matchData.cycleNotes = cycleNotes.replace(/ /g, '>').replace(/,/g, '<');
        matchData.climbNotes = climbNotes.replace(/ /g, '>').replace(/,/g, '<');
        matchData.shootNotes = shootNotes.replace(/ /g, '>').replace(/,/g, '<');
        props.setCurrentMatchData(matchData);
        navigation.navigate('qrcode');
    }

    return (
        <ScrollView 
            automaticallyAdjustKeyboardInsets={true} 
            contentContainerStyle={{flexGrow: 1}}
            style={{flex: 1}}
            keyboardShouldPersistTaps='handled'
            keyboardDismissMode='interactive'
        >
            <View style={matchStyles.mainContainer}>
                <View style={{flex: 0.7, justifyContent: 'center'}}>
                    <View style={matchStyles.NotesRow}>
                        <Text style={matchStyles.Label}>Auto Notes</Text>
                        <View style={matchStyles.InputContainer}>
                            <TextInput
                                value={autoNotes}
                                onChangeText={(text) => setAutoNotes(text)}
                                placeholder="Topics to Note: Actions done in auto, accuracy and volume of scoring, any mishaps, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={matchStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={matchStyles.NotesRow}>
                        <Text style={matchStyles.Label}>Drive Notes</Text>
                        <View style={matchStyles.InputContainer}>
                            <TextInput
                                value={driveNotes}
                                onChangeText={(text) => setDriveNotes(text)}
                                placeholder="Topics to Note: Smoothness of driving, decisions made, any mishaps/breaks, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={matchStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={matchStyles.NotesRow}>
                        <Text style={matchStyles.Label}>Intake Notes</Text>
                        <View style={matchStyles.InputContainer}>
                            <TextInput
                                value={intakeNotes}
                                onChangeText={(text) => setIntakeNotes(text)}
                                placeholder="Topics to Note: Efficiency of intake, any mishaps, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={matchStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={matchStyles.NotesRow}>
                        <Text style={matchStyles.Label}>Defense Notes</Text>
                        <View style={matchStyles.InputContainer}>
                            <TextInput
                                value={defenseNotes}
                                onChangeText={(text) => setDefenseNotes(text)}
                                placeholder="Topics to Note: Defense methods used (turning bot, stealing fuel, ...), effectiveness of defense, any mishaps, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={matchStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={matchStyles.NotesRow}>
                        <Text style={matchStyles.Label}>Cycle Notes</Text>
                        <View style={matchStyles.InputContainer}>
                            <TextInput
                                value={cycleNotes}
                                onChangeText={(text) => setCycleNotes(text)}
                                placeholder="Topics to Note: Speed of cycles, actions done during active and inactive time, any mishaps, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={matchStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={matchStyles.NotesRow}>
                        <Text style={matchStyles.Label}>Climb Notes</Text>
                        <View style={matchStyles.InputContainer}>
                            <TextInput
                                value={climbNotes}
                                onChangeText={(text) => setClimbNotes(text)}
                                placeholder="Topics to Note: Efficiency of climbing, any mishaps, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={matchStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={matchStyles.NotesRow}>
                        <Text style={matchStyles.Label}>Shooting Notes</Text>
                        <View style={matchStyles.InputContainer}>
                            <TextInput
                                value={shootNotes}
                                onChangeText={(text) => setShootNotes(text)}
                                placeholder="Topics to Note: Accuracy and speed of shooting, effectiveness of indexing, ability to react to defense, any mishaps, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={matchStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                </View>
                <View style={{flex: 0.3, justifyContent: 'center'}}>
                    <View style={matchStyles.SwitchContainer}>
                        <Stopwatch
                            time={autoTime}
                            setTime={setAutoTime} 
                        />
                    </View>
                    <View style={matchStyles.SwitchContainer}>
                        <Text style={matchStyles.ScoreHeader}>Robot Mishaps</Text>
                        <View style={matchStyles.Row}>
                            <Text style={matchStyles.SwitchLabel}>Died</Text>
                            <Switch value={died} onValueChange={setDied} />
                        </View>
                        <View style={matchStyles.Row}>
                            <Text style={matchStyles.SwitchLabel}>Stuck</Text>
                            <Switch value={stuck} onValueChange={setStuck} />
                        </View>
                        <View style={matchStyles.Row}>
                            <Text style={matchStyles.SwitchLabel}>Tipped</Text>
                            <Switch value={tipped} onValueChange={setTipped} />
                        </View>
                    </View>
                    <View style={matchStyles.SwitchContainer}>
                        <Text style={matchStyles.ScoreHeader}>Auto Locations Used</Text>
                        <View style={matchStyles.Row}>
                            <Text style={matchStyles.SwitchLabel}>Depot</Text>
                            <Switch value={autoDepot} onValueChange={setAutoDepot} />
                        </View>
                        <View style={matchStyles.Row}>
                            <Text style={matchStyles.SwitchLabel}>Source</Text>
                            <Switch value={autoSource} onValueChange={setAutoSource} />
                        </View>
                        <View style={matchStyles.Row}>
                            <Text style={matchStyles.SwitchLabel}>Neutral Zone</Text>
                            <Switch value={autoMid} onValueChange={setAutoMid} />
                        </View>
                    </View>
                    <View style={matchStyles.SwitchContainer}>
                        <Text style={matchStyles.ScoreHeader}>Intake Locations</Text>
                        <View style={matchStyles.Row}>
                            <Text style={matchStyles.SwitchLabel}>Ground Intake</Text>
                            <Switch value={groundIntake} onValueChange={setGroundIntake} />
                        </View>
                        <View style={matchStyles.Row}>
                            <Text style={matchStyles.SwitchLabel}>Source Intake</Text>
                            <Switch value={sourceIntake} onValueChange={setSourceIntake} />
                        </View>
                    </View>
                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={[matchStyles.NextButton, { width: '90%', height: 80, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }]} onPress={() => navigate()}>
                            <Text style={[matchStyles.ButtonFont, {textAlign: 'center'}]}>Continue to QR Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );

}


const matchStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    ScoreHeader: {
      fontWeight: 'bold',
      fontSize: 25,
    },
    SwitchContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    Row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 4,
    },
    SwitchLabel: {
        fontFamily: 'Helvetica-Light',
        fontSize: 20,
        flex: 1,
        paddingRight: 10,
    },
    NotesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 8,
    },
    InputContainer: {
        height: 110,
        borderWidth: 2,
        borderColor: '#d4d4d4',
        flex: 0.8,
        marginRight: 10,
    },
    TextInputContainer: {
        flex: 1,
        width: '100%',
        padding: 8,
        // 16px+ keeps iOS Safari from zooming in on focus
        fontSize: 16,
        textAlignVertical: 'top',
    },
    Label: {
        fontFamily: 'Helvetica-Light',
        fontSize: 20,
        paddingRight: 10,
        marginTop: 5,
        marginBottom: 5,
        flex: 0.2,
        textAlign: 'right',
    },
    ButtonFont: {
      color: 'white',
      fontFamily: 'Helvetica-Light',
      fontSize: 23
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
})

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setCurrentMatchData: newMatchData =>
    dispatch({
      type: Types.SET_CURRENT_MATCH_DATA,
      payload: {
        newMatchData,
      },
    }),
    setFieldOrientationRedux: fieldOrientation =>
    dispatch({
      type: Types.SET_FIELD_ORIENTATION,
      payload: {
        fieldOrientation,
      },
    }),
})
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(FullMatch);
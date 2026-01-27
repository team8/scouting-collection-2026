import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from "react-native";
import {ButtonGroup, Slider} from 'react-native-elements';
// import Slider from 'react-native-slider';
import { connect } from "react-redux";
import * as Types from "../store/types";
import { useNavigation } from '@react-navigation/native';


function Postmatch(props) {
    const [notes, setNotes] = useState("");
    const [cycleNotes, setCycleNotes] = useState("");
    const [climbNotes, setClimbNotes] = useState("");
    const [robotDied, setRobotDied] = useState(false);
    const [robotTipped, setRobotTipped] = useState(false);
    const [driverRating, setDriverRating] = useState(0.0);
    const [defenseRating, setDefenseRating] = useState(-1.0);
    const [intakeRating, setIntakeRating] = useState(-1.0);
    const [climbRating, setClimbRating] = useState(-1.0);

    const [groundIntake, setGroundIntake] = useState(false);
    const [sourceIntake, setSourceIntake] = useState(false);

    const [climbStatus, setClimbStatus] = useState(0);
    const endgameText = ['N/A', 'Level 1', 'Level 2', 'Level 3'];

    const matchData = JSON.parse(JSON.stringify(props.eventReducer.currentMatchData));

    const navigation = useNavigation(); 

    useEffect(() => {
        navigation.setOptions({
            title: `Postmatch | ${matchData.team}`
        })
    })

    const compile_data = () => {
        if (notes == "" || climbNotes == "" || cycleNotes == "") {
            alert("Please fill in all the notes.");
            return;
        }
        matchData.notes = notes.replace(/ /g, '>').replace(/,/g, '<');
        matchData.cycleNotes = cycleNotes.replace(/ /g, '>').replace(/,/g, '<');
        matchData.climbNotes = climbNotes.replace(/ /g, '>').replace(/,/g, '<');
        matchData.died = robotDied;
        matchData.tipped = robotTipped;

        matchData.climbStatus = climbStatus;
        matchData.driverRating = driverRating;
        matchData.defenseRating = defenseRating;
        matchData.intakeRating = intakeRating;
        matchData.climbRating = climbRating;
        props.setCurrentMatchData(matchData);
        navigation.navigate("qrcode");
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 40 }}>
            <View style={postmatchStyles.Row}>
                <Text style={[postmatchStyles.Font, {fontSize: 22, flex: 0.2}]}>Notes</Text>
                <View style={[postmatchStyles.InputContainer, {flex: 0.9}]}>
                    <TextInput
                        style={postmatchStyles.TextInputContainer}
                        placeholder="Topics to Note: Ease of intaking game pieces, unique aspects of robot (good or bad), where robot shot fuel from, etc.. Max Char: 300"
                        multiline={true}
                        maxLength = {300}
                        onChangeText={(text) => setNotes(text)}
                    />
                </View>
                <View
                    style={{
                        flex: 0.34,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: "red",
                        borderWidth: 0,
                        marginBottom: 20
                    }}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                            <Text style={[postmatchStyles.Font, {fontSize: 15, flex: 0.7, textAlign: 'right'}]}>Used Ground Intake:</Text>
                            <Switch style={{flex: 0.3, marginLeft: 5}}
                                onValueChange={(value) => setGroundIntake(value)}
                                value={groundIntake}
                            />
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <Text style={[postmatchStyles.Font, {fontSize: 15, flex: 0.7, textAlign: 'right'}]}>Used Source Intake:</Text>
                            <Switch style={{flex: 0.3, marginLeft: 5}}
                                onValueChange={(value) => setSourceIntake(value)} 
                                value={sourceIntake} 
                            />
                        </View>
                </View>
            </View>
            <View style={postmatchStyles.Row}>
                <Text style={[postmatchStyles.Font, {fontSize: 21, flex: 0.143}]}>Climb Notes</Text> 
                <View style={[postmatchStyles.InputContainer, {flex: 0.642}]}>
                    <TextInput
                        style={postmatchStyles.TextInputContainer}
                        placeholder="Topics to Note: Time at which robot began climbing, ease of assisted climb, why robot failed, etc.. Max Char: 150"
                        multiline={true}
                        maxLength = {150}
                        onChangeText={(text) => setClimbNotes(text)}
                    />
                </View>
                <View style={{flex: 0.2, marginLeft: 25, alignItems: "center", flexDirection: "column"}}>
                    <View style={{flex: 0.7, alignItems: "center", flexDirection: "row"}}>
                        <Text style={[postmatchStyles.Font, {fontSize: 15, flex: 0.3, marginRight: 1}]}>Died</Text>
                        <Text style={[postmatchStyles.Font, {fontSize: 15, flex: 0.3, marginLeft: 15}]}>Tipped</Text>
                    </View>
                    <View style={{flex: 0.7, alignItems: "center", flexDirection: "row"}}>
                        <Switch
                            style={{flex: 0.7, marginLeft: 25, marginRight: 5}}
                            onValueChange={(value) => setRobotDied(value)}
                            value={robotDied}
                        />
                        <Switch
                            style={{flex: 0.7}}
                            onValueChange={(value) => setRobotTipped(value)}
                            value={robotTipped}
                        />
                    </View>
                </View>
                
            </View>
            <View style={postmatchStyles.Row}>
                <Text style={[postmatchStyles.Font, {fontSize: 22, flex: 0.2}]}>Cycle Notes</Text>
                <View style={[postmatchStyles.InputContainer, {flex: 0.9}]}>
                    <TextInput 
                        style={postmatchStyles.TextInputContainer} 
                        placeholder="Topics to Note: speed of cycles, average size of fuel clusters, shooting speed, etc... Max Char: 300"
                        multiline={true}
                        maxLength={300}
                        onChangeText={(text) => setCycleNotes(text)}/>
                </View>
            </View>
            <View style={postmatchStyles.Row}>
                <Text style={[postmatchStyles.Font, {fontSize: 22, flex: 0.2, marginTop: 10}]}>Endgame Climb</Text>
                <ButtonGroup
                    onPress={setClimbStatus}
                    selectedIndex={climbStatus}
                    buttons={endgameText}
                    buttonStyle={postmatchStyles.ButtonGroup}
                    containerStyle={{height: 50, flex: 0.8, marginHorizontal: 10, marginTop: 10}}
                    selectedButtonStyle={{ backgroundColor: '#24a2b6', borderBottomColor: '#188191' }}
                />
            </View>
            <View style={postmatchStyles.Row}>
                <Text style={[postmatchStyles.LabelText, postmatchStyles.Font, {fontSize: 22, marginTop: 10, flex: 0.1, textAlign: "center"}]}>Driving</Text>
                <View style={{flex: 0.4, alignItems: 'stretch'}}>
                    <Slider
                        thumbTintColor='#24a2b6'
                        value={driverRating}
                        minimumValue={0}
                        maximumValue={5}
                        step={1}
                        onValueChange={(dr) => setDriverRating(dr)} 
                    />
                    <Text>{driverRating.toString()}</Text>
                </View>
                <Text style={[postmatchStyles.LabelText, postmatchStyles.Font, {fontSize: 22, marginTop: 10, flex: 0.1, marginLeft: 5, textAlign: "center"}]}>Defense</Text>
                <View style={{flex: 0.4, alignItems: 'stretch'}}>
                    <Slider
                        thumbTintColor='#24a2b6'
                        value={defenseRating}
                        minimumValue={-1}
                        maximumValue={5}
                        step={1}
                        onValueChange={(d) => setDefenseRating(d)} 
                    />
                    <Text>{defenseRating == -1 ? 'N/A' : defenseRating.toString()}</Text>
                </View>
            </View>
            <View style={postmatchStyles.Row}>
                <Text style={[postmatchStyles.LabelText, postmatchStyles.Font, {fontSize: 22, marginTop: 10, flex: 0.1, textAlign: "center"}]}>Intake</Text>
                <View style={{flex: 0.4, alignItems: 'stretch'}}>
                    <Slider
                        thumbTintColor='#24a2b6'
                        value={intakeRating}
                        minimumValue={-1}
                        maximumValue={5}
                        step={1}
                        onValueChange={(i) => setIntakeRating(i)} />
                    <Text>{intakeRating == -1 ? 'N/A' : intakeRating.toString()}</Text>
                </View>
                <Text style={[postmatchStyles.LabelText, postmatchStyles.Font, {fontSize: 22, marginTop: 10, flex: 0.1, marginLeft: 5, textAlign: "center"}]} textAlign = "center">Climb</Text>
                <View style={{flex: 0.4, alignItems: 'stretch'}}>
                    <Slider
                        thumbTintColor='#24a2b6'
                        value={climbRating}
                        minimumValue={-1}
                        maximumValue={5}
                        step={1}
                        onValueChange={(c) => setClimbRating(c)} />
                    <Text>{climbRating == -1 ? 'N/A' : climbRating.toString()}</Text>
                </View>
            </View>
            <View style={[postmatchStyles.Row]}>
                <TouchableOpacity style={[postmatchStyles.NextButton, {marginHorizontal: 60, marginBottom:25}]} onPress={() => compile_data()}>
                    <View style={postmatchStyles.Center}>
                        <Text style={[postmatchStyles.Font, postmatchStyles.ButtonFont]}>Continue to QRCode</Text>
                    </View> 
                </TouchableOpacity>
            </View>
        </View>
    )
}

const postmatchStyles = StyleSheet.create({
    Row: {
        flexDirection: 'row',
        margin: "7 0",
        padding: 10,
        flex: 1
    },
    Font: {
        fontFamily: 'Helvetica-Light',
        fontSize: 25,
    },
    InputContainer: {
        height: 100,
        paddingLeft: 20,
        borderWidth: 2,
        borderColor: '#d4d4d4',
    },
    LabelText: {
        marginLeft: 5
    },
    NextButton: {
        flex: 1,
        backgroundColor: '#2E8B57',
        borderRadius: 7,
        borderBottomWidth: 5,
        borderColor: '#006400'
    },
    Center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonFont: {
        color: 'white',
        fontSize: 25
    },
    ButtonGroup: {
    }
})

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
export default connectComponent(Postmatch);
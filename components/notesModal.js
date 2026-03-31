import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import Modal from 'react-native-modal';

function NotesModal(props) {
    return (
        <Modal animationInTiming={50} animationIn='fadeIn' animationOutTiming={50} animationOut='fadeOut'
        style={{ alignItems: 'center', justifyContent: 'center', height: '50%', flex: 1}}
        visible = {props.notesModalVisible} isVisible={props.notesModalVisible} onRequestClose={() => {
            props.setNotesModalVisible(!props.notesModalVisible)
        }}>
            <View style={{flex: 1, width: 750, height: 300, backgroundColor: 'white', borderRadius: 15, padding: 20}}>
                <View style={[notesModalStyles.Center]}>
                    <View style={{ flex: 1}}>
                        <Text style={[notesModalStyles.Font, { textAlign: 'center' }]}>Notes</Text>
                    </View>
                    <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={notesModalStyles.Label}>Auto Notes</Text>
                        <View style={notesModalStyles.InputContainer}>
                            <TextInput
                                value={props.autoNotes}
                                onChangeText={(text) => props.setAutoNotes(text)}
                                placeholder="Topics to Note: Actions done in auto, accuracy and volume of scoring, any mishaps, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={notesModalStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={notesModalStyles.Label}>Drive Notes</Text>
                        <View style={notesModalStyles.InputContainer}>
                            <TextInput
                                value={props.driveNotes}
                                onChangeText={(text) => props.setDriveNotes(text)}
                                placeholder="Topics to Note: Smoothness of driving, decisions made, any mishaps/breaks, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={notesModalStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={notesModalStyles.Label}>Intake Notes</Text>
                        <View style={notesModalStyles.InputContainer}>
                            <TextInput
                                value={props.intakeNotes}
                                onChangeText={(text) => props.setIntakeNotes(text)}
                                placeholder="Topics to Note: Efficiency of intake, any mishaps, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={notesModalStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={notesModalStyles.Label}>Defense Notes</Text>
                        <View style={notesModalStyles.InputContainer}>
                            <TextInput
                                value={props.defenseNotes}
                                onChangeText={(text) => props.setDefenseNotes(text)}
                                placeholder="Topics to Note: Defense methods used (turning bot, stealing fuel, ...), effectiveness of defense, any mishaps, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={notesModalStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={notesModalStyles.Label}>Cycle Notes</Text>
                        <View style={notesModalStyles.InputContainer}>
                            <TextInput
                                value={props.cycleNotes}
                                onChangeText={(text) => props.setCycleNotes(text)}
                                placeholder="Topics to Note: Speed of cycles, actions done during active and inactive time, any mishaps, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={notesModalStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={notesModalStyles.Label}>Climb Notes</Text>
                        <View style={notesModalStyles.InputContainer}>
                            <TextInput
                                value={props.climbNotes}
                                onChangeText={(text) => props.setClimbNotes(text)}
                                placeholder="Topics to Note: Efficiency of climbing, any mishaps, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={notesModalStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={notesModalStyles.Label}>Shooting Notes</Text>
                        <View style={notesModalStyles.InputContainer}>
                            <TextInput
                                value={props.shootNotes}
                                onChangeText={(text) => props.setShootNotes(text)}
                                placeholder="Topics to Note: Accuracy and speed of shooting, effectiveness of indexing, ability to react to defense, any mishaps, etc... Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={notesModalStyles.TextInputContainer}
                            />
                        </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={notesModalStyles.CancelButton} onPress={() => props.setNotesModalVisible(false)}>
                            <Text style={notesModalStyles.ButtonFont}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const notesModalStyles = StyleSheet.create({
    ButtonFont: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
    Font: {
        fontFamily: 'Helvetica-Light',
        fontSize: 30
    },
    InputContainer: {
        height: 70,
        paddingLeft: 20,
        borderWidth: 2,
        borderColor: '#d4d4d4',
        flex: 0.8
    },
    TextInputContainer: {
        flex: 1
    },
    Label: {
        fontFamily: 'Helvetica-Light', 
        fontSize: 20,
        paddingRight: 20,
        fontSize: 20, 
        flex: 0.2, 
        textAlign: 'right'
    },
    Center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Left: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    CancelButton: {
        flex: 1,
        backgroundColor: '#f74c4c',
        borderRadius: 15,
        borderBottomWidth: 5,
        borderColor: '#d63e3e',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '100%'
    },
})

export default NotesModal;
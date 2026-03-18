import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import Modal from 'react-native-modal';

function NotesModal(props) {
    return (
        <Modal animationInTiming={50} animationIn='fadeIn' animationOutTiming={50} animationOut='fadeOut'
        style={{ alignItems: 'center', justifyContent: 'center', height: '50%', flex: 0.6}}
        visible = {props.notesModalVisible} isVisible={props.notesModalVisible} onRequestClose={() => {
            props.setNotesModalVisible(!props.notesModalVisible)
        }}>
            <View style={{flex: 1, width: 750, height: 300, backgroundColor: 'white', borderRadius: 15, padding: 20}}>
                <View style={[notesModalStyles.Center]}>
                    <View style={{ flex: 1}}>
                        <Text style={[notesModalStyles.Font, { textAlign: 'center' }]}>Notes</Text>
                    </View>
                    <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[notesModalStyles.Label, { fontSize: 20, flex: 0.2, textAlign: 'right' }]}>Notes</Text>
                        <View style={[notesModalStyles.InputContainer, { flex: 0.8 }]}>
                            <TextInput
                                value={props.notes}
                                onChangeText={(text) => props.setNotes(text)}
                                placeholder="Topics to Note: Ease of intaking game pieces, unique aspects of robot (good or bad), where robot shot fuel from, etc.. Max Char: 300"
                                multiline={true}
                                maxLength={300}
                                style={notesModalStyles.TextInputContainer}
                            />
                        </View>

                    </View>
                    <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[notesModalStyles.Label, { fontSize: 20, flex: 0.2, textAlign: 'right' }]}>Climb Notes</Text>
                        <View style={[notesModalStyles.InputContainer, { flex: 0.8 }]}>
                            <TextInput
                                value={props.climbNotes}
                                onChangeText={(text) => props.setClimbNotes(text)}
                                placeholder="Topics to Note: Time at which robot began climbing, ease of assisted climb, why robot failed, etc.. Max Char: 150"
                                multiline={true}
                                maxLength={150}
                                style={notesModalStyles.TextInputContainer}
                            />
                        </View>

                    </View>
                    <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[notesModalStyles.Label, { fontSize: 20, flex: 0.2, textAlign: 'right' }]}>Cycle/Auto Notes</Text>
                        <View style={[notesModalStyles.InputContainer, { flex: 0.8 }]}>
                            <TextInput
                                value={props.cycleNotes}
                                onChangeText={(text) => props.setCycleNotes(text)}
                                placeholder="Topics to Note: speed of cycles, approximate length of auto, etc... Max Char: 300"
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
        height: 80,
        paddingLeft: 20,
        borderWidth: 2,
        borderColor: '#d4d4d4',
    },
    TextInputContainer: {
        flex: 1
    },
    Label: {
        fontFamily: 'Helvetica-Light', 
        fontSize: 20,
        paddingRight: 20
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
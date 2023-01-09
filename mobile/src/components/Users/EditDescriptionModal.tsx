import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button, Input, Modal } from '@ui-kitten/components';
import Colors from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';

interface EditDescriptionModalModalProps {
    onClose: (value: React.SetStateAction<boolean>) => void;
}

export const EditDescriptionModal: React.FC<EditDescriptionModalModalProps> = ({ onClose }) => {
    const textLimit = 500;
    const [label, setLabel] = useState(`Review 0/${textLimit}`);
    const [text, setText] = useState('');

    return (
        <Modal
            visible={true}
            style={styles.container}
            onBackdropPress={() => onClose(false)}
            backdropStyle={styles.backdrop}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <TouchableOpacity style={styles.close} onPress={() => onClose(false)}>
                        <AntDesign name='close' size={30} color='black' />
                    </TouchableOpacity>
                </View>
                <Input
                    multiline={true}
                    textStyle={{ height: Dimensions.get('window').height * 0.20 }}
                    placeholder='Description'
                    label={label}
                    scrollEnabled={true}
                    onChangeText={(text) => {
                        if (text.length <= textLimit) {
                            setText(text);
                            setLabel(`Description ${text.length}/${textLimit}`);
                        }
                    }}
                    value={text}
                />
                <Button onPress={() => onClose(false)} style={styles.button}>
                    Edit description
                </Button>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.9,
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 1,
        },
        borderRadius: 10,
        padding: 20,
        flex: 1,
    },
    button: {
        backgroundColor: Colors.background,
        borderColor: Colors.background,
        borderRadius: 10,
        marginTop: 20,
    },
    close: {
        flex: 1,
        marginBottom: 10,
        marginLeft: 'auto',
    },
    ratingContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.2,
        marginVertical: '5 %',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

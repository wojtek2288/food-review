import React from 'react';
import {
    Dimensions,
    Keyboard,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import { Button, Modal, Spinner } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';

interface DeleteAccountConfirmationProps {
    onClose: (value: React.SetStateAction<boolean>) => void;
    onAccountDelete: () => void;
    isLoading: boolean;
}

export const DeleteAccountConfirmation: React.FC<DeleteAccountConfirmationProps> = ({ onClose, onAccountDelete, isLoading }) => {
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
                <View style={styles.textContainer}>
                    <Text style={styles.textConfirmation}>Are you sure you want to delete your account ?</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    {isLoading
                        ? <Spinner status='warning' />
                        :
                        <>
                            <Button onPress={() => onAccountDelete()} style={styles.deleteButton}>
                                Delete
                            </Button>
                            <Button onPress={() => onClose(false)} style={styles.cancelButton}>Cancel</Button>
                        </>}
                </View>
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
    spinnerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        borderRadius: 10,
        marginTop: 20,
    },
    deleteButton: {
        backgroundColor: 'red',
        borderColor: 'red',
        borderRadius: 10,
        marginTop: 20,
        marginRight: 20,
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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textConfirmation: {
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center'
    },
    textContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '80 %',
        marginBottom: '5 %',
    }
});

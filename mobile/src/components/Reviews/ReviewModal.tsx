import React, { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Button, Input, Modal, Spinner } from '@ui-kitten/components';
import Colors from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import Slider from '@react-native-community/slider';
import { Rating } from '../Common/Rating';

interface ReviewModalProps {
  onClose: (value: React.SetStateAction<boolean>) => void;
  onReviewAdd: (description: string, rating: number) => void;
  isLoading: boolean;
  description: string | null;
  rating: number | null;
  displayError?: boolean;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ onClose, onReviewAdd, isLoading, description, rating, displayError }) => {
  const textLimit = 500;
  const textCount = description !== null ? description.length : '0';
  const initRating = rating !== null ? rating : 5.5;
  const [label, setLabel] = useState(`Review ${textCount}/${textLimit}`);
  const [text, setText] = useState(description !== null ? description : '');
  const [sliderValue, setSliderValie] = useState(initRating);

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
          textStyle={{ height: Dimensions.get('window').height * 0.15 }}
          placeholder='Review'
          label={label}
          onChangeText={(text) => {
            if (text.length <= textLimit) {
              setText(text);
              setLabel(`Review ${text.length}/${textLimit}`);
            }
          }}
          value={text}
        />
        <View style={styles.ratingContainer}>
          <Rating rating={sliderValue} />
        </View>
        <Slider
          style={{
            width: '100 %',
            height: Dimensions.get('window').height * 0.05,
          }}
          minimumValue={1}
          maximumValue={10}
          minimumTrackTintColor='green'
          maximumTrackTintColor='red'
          value={sliderValue}
          onValueChange={(value) => setSliderValie(value)}
        />
        {isLoading
          ? <View style={styles.spinnerContainer}><Spinner status='warning' /></View>
          :
          <>
            {displayError ? <Text style={styles.errorText}>You already rated this item.</Text> : null}
            <Button onPress={() => onReviewAdd(text, sliderValue)} style={styles.button}>
              Rate
            </Button>
          </>
        }
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
  errorText: {
    color: 'red',
    marginTop: '5 %',
  }
});

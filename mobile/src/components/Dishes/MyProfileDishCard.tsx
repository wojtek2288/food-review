import React, { useEffect, useState } from 'react';
import { Card } from '@ui-kitten/components';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Rating } from '../Common/Rating';
import { AntDesign } from '@expo/vector-icons';
import { DeleteReviewConfirmation } from '../Reviews/DeleteReviewConfirmation';
import { DishReview } from '../../responseTypes/MyReviewResponse';
import { useDeleteReviewCommand, useEditReviewCommand } from '../../api/services';
import * as SecureStore from 'expo-secure-store';
import { ReviewModal } from '../Reviews/ReviewModal';

export interface MyProfileDishCardProps {
    dish: DishReview;
    navigation: any;
    setRefreshReviews: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyProfileDishCard: React.FC<MyProfileDishCardProps> = ({ dish, navigation, setRefreshReviews }) => {
    const onDishCardClicked = () => {
        navigation.navigate('DishDetailsScreen', { dishId: dish.dishId });
    };
    const deleteReviewReq = {
        reviewId: dish.reviewId
    };
    const editReviewReq = {
        reviewId: dish.reviewId,
        description: '',
        rating: 0,
    }
    const [deleteReviewModalVisible, setDeleteReviewModalVisible] = useState(false);
    const [editReviewModalVisible, setEditReviewModalVisible] = useState(false);
    const {
        run: deleteReviewRun,
        isLoading: deleteReviewLoading,
        requestSuccessful: deleteReviewRequestSuccessful
    } = useDeleteReviewCommand(deleteReviewReq);
    const {
        run: editReviewRun,
        isLoading: editReviewLoading,
        requestSuccessful: editReviewRequestSuccessful
    } = useEditReviewCommand(editReviewReq);

    const onReviewDelete = async () => {
        const token = await SecureStore.getItemAsync('accessToken');
        if (token !== null) {
            deleteReviewRun(deleteReviewReq, token);
        }
    }

    const onReviewEdit = async (description: string, rating: number) => {
        const token = await SecureStore.getItemAsync('accessToken');
        if (token !== null) {
            editReviewRun(
                {
                    reviewId: dish.reviewId,
                    description: description,
                    rating: rating
                },
                token);
        }
    }

    useEffect(() => {
        if (deleteReviewRequestSuccessful) {
            setRefreshReviews(true);
            setDeleteReviewModalVisible(false);
        }
    }, [deleteReviewRequestSuccessful])

    useEffect(() => {
        if (editReviewRequestSuccessful) {
            setRefreshReviews(true);
            setDeleteReviewModalVisible(false);
        }
    }, [editReviewRequestSuccessful])

    return (
        <View style={styles.dishContainer}>
            {deleteReviewModalVisible
                ? <DeleteReviewConfirmation
                    onClose={setDeleteReviewModalVisible}
                    onReviewDelete={onReviewDelete}
                    isLoading={deleteReviewLoading} />
                : null}
            {editReviewModalVisible
                ? <ReviewModal
                    onClose={setEditReviewModalVisible}
                    onReviewAdd={onReviewEdit}
                    isLoading={editReviewLoading}
                    description={dish.description}
                    rating={dish.rating} />
                : null}
            <Card style={styles.card} onPress={onDishCardClicked}>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={() => setEditReviewModalVisible(true)}>
                        <AntDesign name="edit" size={35} color="black" style={{ marginRight: '10 %' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDeleteReviewModalVisible(true)}>
                        <AntDesign name="delete" size={35} color="red" />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardImage}>
                        <Image style={styles.dishImage} source={{ uri: dish.imageUrl }} />
                    </View>
                    <View style={styles.cardDescription}>
                        <Text style={styles.dishName}>{dish.name}</Text>
                        <Text style={styles.restaurantName}>{dish.restaurantName}</Text>
                    </View>
                    <View style={styles.cardRating}>
                        <Rating rating={dish.rating} />
                    </View>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    dishContainer: {
        marginTop: '5 %',
        flexDirection: 'row',
    },
    card: {
        borderRadius: 10,
        width: '100 %',
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardDescription: {
        flex: 4,
        paddingLeft: '5 %',
    },
    cardImage: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardRating: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dishName: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    restaurantName: {
        marginTop: '10 %',
        fontSize: 18,
    },
    dishImage: {
        width: '100 %',
        aspectRatio: 1,
        borderRadius: 10,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});

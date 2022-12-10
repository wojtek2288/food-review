import React, { useState } from 'react';
import { ScrollView, StyleSheet, FlatList, NativeSyntheticEvent, NativeScrollEvent, Animated, Dimensions } from 'react-native';
import { Text, View, Image, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { RootTabScreenProps } from '../types';
import { users } from '../data/users';
import { Button } from '@ui-kitten/components';
import { dishes } from '../data/dishes';
import { DishCard } from '../components/Dishes/DishCard';

export default function Profile({ navigation }: RootTabScreenProps<'Profile'>) {
    var user = users[0];
    const [flex, setFlex] = useState(new Animated.Value(2));
    var [flexValue, setFlexValue] = useState(2);
    flex.addListener(({ value }) => setFlexValue(value));

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        let yOffset = event.nativeEvent.contentOffset.y;
        let contentHeight = event.nativeEvent.contentSize.height;
        let value = yOffset / contentHeight;

        if (contentHeight > 0.6 * Dimensions.get('window').height) {
            if (value > 0.1) {
                if (flexValue === 2) {
                    Animated.timing(
                        flex,
                        {
                            toValue: 4.3,
                            duration: 170,
                            useNativeDriver: true
                        })
                        .start()
                }
            }
            else {
                if (flexValue !== 2) {
                    Animated.timing(
                        flex,
                        {
                            toValue: 2,
                            duration: 170,
                            useNativeDriver: true
                        })
                        .start()
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.upperContainer}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.profileAvatar} source={{ uri: user.avatarUrl }} />
                    </View>
                    <View style={styles.settingsContainer}>
                        <Pressable
                            onPress={() => navigation.navigate('Modal')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <AntDesign name="setting" size={40} color={Colors.darkText} />
                        </Pressable>
                    </View>
                </View>
                <Text style={styles.username}>{user.username}</Text>
                <ScrollView style={styles.desciptionContainer}>
                    <Text style={styles.description}>
                        {user.description}
                    </Text>
                </ScrollView>
                <Button onPress={() => navigation.navigate('Modal')} style={styles.button}>Edit</Button>
            </View>
            <View style={ratingStyles(flexValue).review}>
                <FlatList
                    ListHeaderComponent={() => <Text style={styles.headerText}>My Reviews:</Text>}
                    data={dishes}
                    renderItem={(dish) => {
                        return (
                            <DishCard dish={dish.item} />
                        );
                    }}
                    keyExtractor={(item, index) => {
                        return item.id.toString();
                    }}
                    showsVerticalScrollIndicator={false}
                    onScroll={(event) => handleScroll(event)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        flex: 2.2,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightBackground,
        width: '100 %',
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        paddingTop: '10 %',
        paddingBottom: '3 %',
    },
    upperContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3 %',
        flexDirection: 'row',
        width: '100 %',
        height: '30 %'
    },
    avatarContainer: {
        flex: 1,
        marginLeft: 55,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100 %',
    },
    settingsContainer: {
        alignSelf: 'flex-start',
        marginLeft: 'auto',
        marginRight: 15,
    },
    profileAvatar: {
        flex: 1,
        width: '100 %',
        aspectRatio: 1,
        borderRadius: 1000,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '3 %',
    },
    desciptionContainer: {
        marginBottom: '3 %',
    },
    description: {
        marginHorizontal: '10 %',
        textAlign: 'center'
    },
    button: {
        backgroundColor: Colors.background,
        width: '50 %',
        borderColor: Colors.background,
        borderRadius: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: '5 %',
    }
});

const ratingStyles = (flexNumber: number) => StyleSheet.create({
    review: {
        flex: flexNumber,
        alignItems: 'center',
        justifyContent: 'center',
        width: '85 %',
    }
});

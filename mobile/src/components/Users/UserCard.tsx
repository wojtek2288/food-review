import { Card } from '@ui-kitten/components';
import { StyleSheet, View, Text, Image } from 'react-native';
import User from '../../types/User';

interface UserCardProps {
    user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <View style={styles.userContainer}>
            <Card style={styles.card}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardImage}>
                        <Image style={styles.avatar} source={{ uri: user.avatarUrl }} />
                    </View>
                    <View style={styles.cardDescription}>
                        <Text style={styles.username}>
                            {user.username}
                        </Text>
                        <Text style={styles.description}>
                            {user.description.length > 100
                                ? user.description.substring(0, 100) + "..."
                                : user.description.substring(0, 100)}
                        </Text>
                    </View>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    userContainer: {
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
        paddingLeft: '5 %'
    },
    cardImage: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    username: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    description: {
        marginTop: '10 %',
        fontSize: 12,
    },
    avatar: {
        width: '80 %',
        aspectRatio: 1,
        borderRadius: 1000,
    }
});
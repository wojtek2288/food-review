import { StyleSheet, View, Image } from 'react-native';

export const DishesEmptyState: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/dishesEmptyState.png')} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '50%',
        aspectRatio: 1,
    }
});
import React, { Dispatch, SetStateAction } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { Input } from '@ui-kitten/components';
import Colors from '../../constants/Colors';

interface SearchBarProps {
    searchPhrase: string;
    setSearchPhrase: Dispatch<SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchPhrase, setSearchPhrase }) => {
    const renderCloseIcon = () => (
        searchPhrase === ''
            ? <View />
            :
            <TouchableOpacity onPress={() => setSearchPhrase('')}>
                <FontAwesome
                    name="close"
                    size={20}
                    color={Colors.darkText}
                />
            </TouchableOpacity>
    );

    const renderSearchIcon = () => (
        <FontAwesome
            name="search"
            size={20}
            color={Colors.inActive}
        />
    );

    return (
        <Input
            placeholder='Search'
            value={searchPhrase}
            onChangeText={nextValue => setSearchPhrase(nextValue)}
            accessoryRight={renderCloseIcon}
            accessoryLeft={renderSearchIcon}
            size="large"
        />
    );
}

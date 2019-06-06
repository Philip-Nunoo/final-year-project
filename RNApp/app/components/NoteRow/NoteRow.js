import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const NoteRow = ({ description }) => (
    <View>
        <Text>{description}</Text>
    </View>
);

NoteRow.propTypes = {
    description: PropTypes.string,
};

NoteRow.defaultProps = {
    description: null
}

export default NoteRow;

import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.cardBackgroundText = this.cardBackgroundText.bind(this);
  }

  cardBackgroundText(text) {
    if (text === 'A') {
      return 'A';
    }
    if (text === 'B') {
      return 'B';
    }
    if (text === 'C') {
      return 'C';
    }
    if (text === 'D') {
      return 'D';
    }
    if (text === 'E') {
      return 'E';
    }
    if (text === 'F') {
      return 'F';
    }
    if (text === 'G') {
      return 'G';
    }
    if (text === 'H') {
      return 'H';
    } else {
      return 'A';
    }
  }

  render() {
    let text = '';

    if (this.props.isOpen) {
      text = this.cardBackgroundText(this.props.text);
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.props.clickCard}
        style={styles.view}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
    elevation: 10,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  card: {
    width: 50,
    height: 50,
  },
};

export default Button;

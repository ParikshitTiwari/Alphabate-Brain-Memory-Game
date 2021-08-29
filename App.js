/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

import Card from './src/components/Button';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.renderCards = this.renderCards.bind(this);
    this.resetCards = this.resetCards.bind(this);

    let cards = [
      {
        text: 'A',
      },
      {
        text: 'B',
      },
      {
        text: 'C',
      },
      {
        text: 'D',
      },
      {
        text: 'E',
      },
      {
        text: 'F',
      },
      {
        text: 'G',
      },
      {
        text: 'H',
      },
    ];

    let clone = JSON.parse(JSON.stringify(cards));
    this.cards = cards.concat(clone);

    this.cards.map(obj => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.text = obj.text;
      obj.isOpen = false;
    });

    this.shuffleArray(this.cards);

    this.state = {
      cards: this.cards,
      current_selection_text: [],
      selected_pairs_text: [],
      score: 0,
      mistake: 0,
    };
  }

  // Function that shuffles the array
  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  renderCards(cards) {
    return cards.map((card, index) => {
      //console.log("card isOpen --> "+cards[index].isOpen);
      //console.log("index --> "+index);
      //console.log('card Text --> ' + card.text);
      //console.log("-------------------------");
      return (
        <Card
          key={index}
          text={card.text}
          isOpen={card.isOpen}
          clickCard={this.clickCard.bind(this, card.id)}
        />
      );
    });
  }

  renderRows() {
    let contents = this.getRowContents(this.state.cards);
    return contents.map((cards, index) => {
      return (
        <View key={index} style={styles.row}>
          {this.renderCards(cards)}
        </View>
      );
    });
  }

  getRowContents(cards) {
    let contents_r = [];
    let contents = [];
    let count = 0;
    cards.forEach(item => {
      count += 1;
      contents.push(item);
      if (count === 4) {
        contents_r.push(contents);
        count = 0;
        contents = [];
      }
    });

    return contents_r;
  }

  clickCard(id) {
    //console.log("Button id --> "+id);
    let selected_pairs_text = this.state.selected_pairs_text;
    let current_selection_text = this.state.current_selection_text;
    let score = this.state.score;
    let mistake = this.state.mistake;

    //We got an index according to the id of the clicked button
    let index = this.state.cards.findIndex(card => {
      return card.id === id;
    });

    let cards = this.state.cards;

    if (
      cards[index].isOpen === false &&
      selected_pairs_text.indexOf(cards[index].text) === -1
    ) {
      // We marked the selected card as open
      cards[index].isOpen = true;

      // of the cards selected in the current selection array
      // we kept its id and text
      current_selection_text.push({
        index: index,
        text: cards[index].text,
      });

      //selected cards id and text current_selection
      // It is kept in the array. When the size of this array is 2
      // Get the text of the cards with index 0 and index 1
      // we compare
      if (current_selection_text.length === 2) {
        if (current_selection_text[0].text === current_selection_text[1].text) {
          //console.log("Matched!")
          score++;
          selected_pairs_text.push(cards[index].text);
        } else {
          mistake++;
          this.cevir(
            cards,
            cards[current_selection_text[0].index],
            cards[current_selection_text[1].index],
          );
        }
        current_selection_text = [];
      }

      if (score === 8) {
        alert(
          'You win after ' +
            (mistake + score) +
            ' steps with ' +
            mistake +
            ' mistakes.',
        );
      }

      this.setState({
        score: score,
        mistake: mistake,
        cards: cards,
        current_selection_text: current_selection_text,
      });
    }
    //console.log("Score-->"+score);
  }

  // It will return when there is an error!!
  cevir(cards, k1, k2) {
    setTimeout(() => {
      k1.isOpen = false;
      k2.isOpen = false;

      this.setState({
        cards: cards,
        // mistake: mistake
      });
    }, 300);
  }

  resetCards() {
    let cards = this.cards.map(obj => {
      obj.isOpen = false;
      return obj;
    });

    cards = this.shuffleArray(cards);

    this.setState({
      current_selection_text: [],
      selected_pairs_text: [],
      cards: cards,
      score: 0,
      mistake: 0,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#008CFA',
              width: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text style={styles.subText}>Score : {this.state.score}</Text>
            <Text style={styles.subText}>Mistake : {this.state.mistake}</Text>
          </View>
        </View>
        <View style={styles.gameArea}>{this.renderRows.call(this)}</View>
        <Button onPress={this.resetCards} title="Reset" color="#008CFA" />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  subText: {
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 50,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  gameArea: {
    flex: 9,
    padding: 4,
    marginBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
};

import React, { Component } from 'react'
import { connect } from "react-redux"
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { black, gray, white } from '../utils/colors'

class DeckView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title
        }
    }

    render() {
        const { deck, deckId } = this.props
        const { title } = deck
        const count = deck.questions ? deck.questions.length : '0'

        return (
            <View style={styles.deck}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.count}>
                    {count} {count > 1 ? 'cards' : 'card'}
                </Text>
                <TouchableOpacity
                    style={[styles.btn, { marginTop: 100 }]}
                    onPress={() => this.props.navigation.navigate('NewCardView', { deckId: deckId, title: title })}
                >
                    <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: black }]}
                    onPress={() => count > 0 ? this.props.navigation.navigate('QuizView', { deckId: deckId }) : alert('Add questions, to start the quiz!')}
                >
                    <Text style={[styles.buttonText, { color: white }]}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 50,
        color: black,
    },
    count: {
        fontSize: 30,
        color: gray
    },
    btn: {
        width: 220,
        height: 80,
        backgroundColor: white,
        borderRadius: 10,
        borderColor: black,
        borderWidth: 1,
        padding: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 24,
        color: black
    }
})


function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params
    return {
        deckId,
        deck: state[navigation.getParam("deckId")],
    }
}

export default connect(mapStateToProps)(DeckView)
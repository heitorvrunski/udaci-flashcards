import React, { Component } from 'react';
import { connect } from "react-redux"
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { black, gray, white } from '../utils/colors'
import CardView from '../components/CardView'

class QuizView extends Component {
    state = {
        questionID: 0,
        correctCount: 0,
        incorrectCount: 0,
        isQuestion: true
    }
    static navigationOptions = () => {
        return {
            title: 'Quiz'
        }
    }
    answerHandler = (result) => {
        this.setState((prevState) => ({
            questionID: prevState.questionID + 1,
            correctCount: result === 'correct' ? prevState.correctCount + 1 : prevState.correctCount,
            incorrectCount: result === 'incorrect' ? prevState.incorrectCount + 1 : prevState.incorrectCount,
            isQuestion: true
        }))
    }
    flipHandler = (isQuestion) => {
        this.setState(() => ({
            isQuestion: !isQuestion
        }))
    }
    reset = () => {
        this.setState((prevState) => ({
            questionID: 0,
            incorrectCount: 0,
            correctCount: 0,
            isQuestion: true
        }))
    }
    render() {
        const { questionID, correctCount, isQuestion } = this.state
        const { deckId, deck } = this.props
        const showCard = questionID < deck.questions.length ? true : false

        return (
            <View style={styles.deck}>
                {(questionID < deck.questions.length) && <Text style={styles.enum}> {questionID} / {deck.questions.length}</Text>}
                {showCard ?
                    <CardView
                        deck={deck}
                        questionID={questionID}
                        answerHandler={this.answerHandler}
                        isQuestion={isQuestion}
                        flipHandler={this.flipHandler}
                    />
                    :
                    <View style={styles.deck}>
                        <Text style={styles.title}>Score:{((correctCount * 100) / deck.questions.length).toFixed(2)}%</Text>
                        <Text style={styles.subtitle}>{correctCount} answer{correctCount > 1 ? 's' : ''} out of {deck.questions.length} question{deck.questions.length > 1 ? 's' : ''} were correct ! </Text>
                        <TouchableOpacity
                            style={[styles.btn, { marginTop: 100 }]}
                            onPress={() => this.reset()}
                        >
                            <Text style={styles.buttonText}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btn, { backgroundColor: black }]}
                            onPress={() => this.props.navigation.navigate('DeckView', { deckId: deckId })}
                        >
                            <Text style={[styles.buttonText, { color: white }]}>Back To Deck</Text>
                        </TouchableOpacity>
                    </View>
                }
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
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 25,
        color: black,
        textAlign: 'center'
    },
    count: {
        fontSize: 30,
        color: gray
    },
    btn: {
        width: 220,
        height: 80,
        backgroundColor: white,
        color: black,
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
    },
    enum: {
        alignSelf: 'flex-start',
        marginTop: 10,
        marginLeft: 10,
        color: black,
        fontSize: 22
    }
})


function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params
    return {
        deckId,
        deck: state[deckId],
    }
}

export default connect(mapStateToProps)(QuizView)
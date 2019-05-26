import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { green, red, black, white } from '../utils/colors'

class CardView extends Component {
    render() {
        const { questionID, deck, answerHandler, isQuestion, flipHandler } = this.props
        const card = deck.questions[questionID]
        return (
            <View style={styles.card}>
                <Text style={styles.title}>{isQuestion ? card.question : card.answer}</Text>
                <TouchableOpacity
                    onPress={() => flipHandler(isQuestion)}
                >
                    <Text style={[styles.buttonText, { color: red }]}>
                        {isQuestion ? 'Answer' : 'Question'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, { marginTop: 100, backgroundColor: green }]}
                    onPress={() => answerHandler('correct')

                    }
                >
                    <Text style={styles.buttonText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: red }]}
                    onPress={() => answerHandler('incorrect')

                    }
                >
                    <Text style={[styles.buttonText]}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        marginLeft: 25,
        marginRight: 25,
        color: black,
        textAlign: 'center'
    },
    btn: {
        width: 220,
        height: 80,
        borderRadius: 10,
        borderColor: white,
        borderWidth: 1,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 24,
        color: white
    }
})


export default CardView;

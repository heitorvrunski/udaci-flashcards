import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { addCard2Deck } from '../utils/api'
import { addCard } from '../actions'
import { black, white } from '../utils/colors'
import { connect } from 'react-redux'

class NewCardView extends Component {
    state = {
        question: '',
        answer: ''
    }
    static navigationOptions = () => {
        return {
            title: 'Add Card'
        }
    }
    handleInput = (type, text) => {
        this.setState(() => ({
            [type]: text
        }))
    }
    handleSubmit = () => {
        const { question, answer } = this.state
        const { deckId, dispatch, title } = this.props
        if (question === '' || answer === '') return alert('Question and Answer cannot be empty !')

        dispatch(addCard(deckId, question, answer))
        this.setState({
            question: '',
            answer: ''
        })
        addCard2Deck(deckId, question, answer)
        this.props.navigation.navigate('DeckView', { deckId: deckId, title: title })
    }
    render() {
        const { answer, question } = this.state
        const { title } = this.props
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.title}>{title} deck</Text>
                <Text style={styles.label}>Question</Text>
                <TextInput
                    value={question}
                    style={styles.input}
                    onChangeText={(question) => this.handleInput('question', question)}
                    autoFocus={true}
                />
                <Text style={styles.label}>Answer</Text>
                <TextInput
                    value={answer}
                    style={styles.input}
                    onChangeText={(answer) => this.handleInput('answer', answer)}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.handleSubmit}>
                    <Text style={styles.submitBtnText}>Add Card</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    title: {
        fontSize: 30,
        color: black,
        marginBottom: 20
    },
    label: {
        fontSize: 22,
    },
    input: {
        width: 250,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: black,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    btn: {
        width: 220,
        height: 80,
        backgroundColor: black,
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
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },

})


function mapStateToProps(state, { navigation }) {
    const { deckId, title } = navigation.state.params
    return {
        deckId,
        title
    }
}

export default connect(mapStateToProps)(NewCardView)
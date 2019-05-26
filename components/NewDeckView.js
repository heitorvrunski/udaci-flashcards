import React, { Component } from "react"
import { connect } from "react-redux"
import {
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native"
import { addDeck } from "../actions"
import { saveDeck, generateUID } from "../utils/api"
import { white, black } from "../utils/colors"


class NewDeckView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uuid: "",
            input: ""
        };

        this.generateUUID = this.generateUUID.bind(this);
    }
    componentWillMount() {
        this.generateUUID();
    }

    generateUUID() {
        this.setState({ uuid: generateUID() });
    }

    createDeck = () => ({
        title: this.state.input,
        questions: []
    })

    handleInputChange = input => {
        this.setState(() => ({
            input
        }))
    }

    handleSubmit = () => {
        const { uuid, input } = this.state
        const deck = this.createDeck()
        this.props.createDeck(uuid, deck)
        saveDeck(uuid, deck)
        this.props.navigation.navigate('DeckView', { deckId: uuid, title: input })
        this.setState(() => ({
            input: ""
        }))

    }

    render() {
        const { input } = this.state
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.label}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={(input) => this.handleInputChange(input)}
                />
                <TouchableOpacity style={styles.btn} onPress={this.handleSubmit}>
                    <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        fontSize: 50,
        textAlign: "center"
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

const mapDispatchToProps = dispatch => ({
    createDeck: (deckId, deck) => dispatch(addDeck(deckId, deck))
})

export default connect(null, mapDispatchToProps)(NewDeckView)
import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import { black, gray } from '../utils/colors'
import { withNavigation } from 'react-navigation'

class DeckListItem extends Component {
    render() {
        const { id, title, count, navigation } = this.props
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('DeckView', { deckId: id, title: title })}
            >
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.count}>
                    {count} {count > 1 ? 'cards' : 'card'}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: black
    },
    count: {
        fontSize: 20,
        color: gray
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginLeft: 15,
        marginRight: 15,
        padding: 25

    }
})

function mapStateToProps(decks, props) {
    const { id } = props
    return {
        id,
        title: decks[id].title,
        count: decks[id].questions.length
    }
}

export default withNavigation(connect(mapStateToProps)(DeckListItem))
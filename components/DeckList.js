import React, { Component } from 'react'
import { FlatList, View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions'
import DeckListItem from './DeckListItem'

class DeckList extends Component {
    state = {
        loading: false
    }
    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
            .then(decks => {
                dispatch(receiveDecks(decks))
                this.setState(() => ({
                    loading: true
                }))
            })
    }
    render() {
        const { decks } = this.props
        const { loading } = this.state
        return (
            <View style={styles.list}>
                {loading && loading === true ?
                    <FlatList
                        data={Object.keys(decks).map((id) => { return { key: id } })}
                        renderItem={({ item }) => (
                            <DeckListItem key={item.key} id={item.key} />
                        )}
                    />
                    :
                    <Text>Loading...</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        alignSelf: 'stretch'
    }
})

function mapStateToProps(decks) {
    return {
        decks
    }
}


export default connect(mapStateToProps)(DeckList)
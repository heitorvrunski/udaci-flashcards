export const GET_DECKS = 'GET_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'

export function receiveDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

export function addCard(deckId, question, answer) {
    return {
        type: ADD_CARD,
        deckId,
        question,
        answer
    }
}

export function addDeck(deckId, deck) {
    return {
        type: ADD_DECK,
        deckId,
        deck
    }
}
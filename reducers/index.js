import { GET_DECKS, ADD_CARD, ADD_DECK } from '../actions'


function decks(state = {}, action) {
    switch (action.type) {
        case GET_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_CARD:
            return {
                ...state,
                [action.deckId]: {
                    title: state[action.deckId].title,
                    questions: state[action.deckId].questions.concat({
                        question: action.question,
                        answer: action.answer
                    })
                }
            }
        case ADD_DECK: {
            return {
                ...state,
                [action.deckId]: action.deck
            }
        }
        default:
            return state
    }
}

export default decks
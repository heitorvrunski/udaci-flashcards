import { AsyncStorage } from "react-native";
import { DECK_STORAGE_KEY, formatDeckResults, parseJSON } from './deck';

export function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


export function getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(formatDeckResults)
}

export function saveDeck(key, deck) {
    return AsyncStorage.mergeItem(
        DECK_STORAGE_KEY,
        JSON.stringify({ [key]: deck })
    )
}

export function addCard2Deck(key, question, answer) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(decks => {
        decks = parseJSON(decks)
        decks[key] = {
            ...decks[key],
            questions: [
                ...decks[key].questions,
                { question: question, answer: answer }
            ]
        }

        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
    })
}
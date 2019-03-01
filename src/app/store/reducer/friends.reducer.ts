import {FriendsAction, friendsActionTypes} from '../../type/store/action';

const initialState = {
    friends : [],
    configs: {
        typeSort: 0,
        searchValue: '',
        showBookmark: false,
        startView: 0,
        limitView: 4
    }
};

export function friendsReducer(state = initialState, action: FriendsAction) {
    switch (action.type) {
        case friendsActionTypes.LOAD_FRIENDS:
            console.log('action LOAD_FRIENDS', action);
            return {...state, friends : [...action.payload]};

        case friendsActionTypes.BOOKMARK_FRIENDS:
            console.log('action BOOKMARK_FRIENDS', action);

            const idb = state.friends.findIndex(friend => friend.id === action.payload.id);

            const updateBookmark = [];
            updateBookmark[idb] = {...state.friends[idb], bookmark: action.payload.bookmark};

            return {...state, friends : [...state.friends, updateBookmark]};

        case friendsActionTypes.RATING_FRIENDS:
            console.log('action RATING_FRIENDS', action);

            const idr = state.friends.findIndex(friend => friend.id === action.payload.id);

            const updateRating = [];
            updateRating[idr] = {...state.friends[idr], bookmark: action.payload.bookmark};

            return {...state, friends : [...state.friends, updateRating]};

        case friendsActionTypes.SORT_FRIENDS:
            console.log('action SORT_FRIENDS', action);
            return {...state, configs: {typeSort : action.payload}};

        case friendsActionTypes.SEARCH_FRIENDS:
            console.log('action SEARCH_FRIENDS', action);
            return {...state, configs: {searchValue : action.payload}};

        default:
            return state;
    }
}

import {FriendsAction, friendsActionTypes} from '../type/index';

const initialState = {
    friends : [],
    configsFriends: {
        typeSort: 0,
        searchValue: '',
        showBookmark: false,
        startView: 0,
        limitView: 4
    },
    bookmarks : {
        count : 0
    }
};

export function friendsReducer(state = initialState, action: FriendsAction) {
    switch (action.type) {
        case friendsActionTypes.LOAD_FRIENDS:
            return {...state, friends : [...action.payload]};

        case friendsActionTypes.RATING_FRIENDS:

            const idr = state.friends.findIndex(friend => friend.id === action.payload.id);

            const updateRating = [];
            updateRating[idr] = {...state.friends[idr], rating: action.payload.rating};

            return {...state, friends : [...state.friends, updateRating]};

        case friendsActionTypes.SORT_FRIENDS:

            return {...state,
                configsFriends : {
                    ...state.configsFriends,
                    ...{typeSort : action.payload, startView: 0}
                }
            };

        case friendsActionTypes.SEARCH_FRIENDS:

            return {...state,
                configsFriends : {
                    ...state.configsFriends,
                    ...{searchValue : action.payload, startView: 0}
                }
            };

        // todo сделать отдельный редьюсер для закладок
        case friendsActionTypes.SHOW_BOOKMARKS_FRIENDS:

            return {...state,
                configsFriends : {
                    ...state.configsFriends,
                    ...{showBookmark : action.payload, startView: 0}
                }
            };

        case friendsActionTypes.SET_BOOKMARK_FRIENDS:

            const idb = state.friends.findIndex(friend => friend.id === action.payload.id);

            const updateBookmark = [];
            updateBookmark[idb] = {...state.friends[idb], bookmark: action.payload.bookmark};

            return {...state, friends : [...state.friends, updateBookmark]};

        case friendsActionTypes.SET_COUNT_BOOKMARKS_FRIENDS:
            return {
                ...state,
                ...{bookmarks : {count : action.payload}}
            };
        default:
            return state;
    }
}

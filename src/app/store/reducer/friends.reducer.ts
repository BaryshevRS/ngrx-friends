import {FriendsAction, friendsActionTypes} from '../type/index';
import {Friends} from '../../interface/friends';

const initialState: Friends = {
    friends : [],
    friendDescription: null,
    configsFriends: {
        typeSort: 0,
        searchValue: '',
        showBookmark: false,
        startView: 0,
        limitView: 20
    },
    bookmarks: {
        count: 0
    },
    loading: false,
    errors: null
};

export function friendsReducer(state = initialState, action: FriendsAction) {
    switch (action.type) {

        case friendsActionTypes.LOAD_FRIENDS:

            return {
                ...state,
                friends : [...action.payload.friends],
                configsFriends : {...action.payload.configsFriends},
                loading: false,
                errors: {...action.payload.errors}
            };


        case friendsActionTypes.GET_FRIENDS:

            return {...state, loading: true};

        case friendsActionTypes.GET_FRIEND:

            return {...state, loading: true, friendDescription: null};


        case friendsActionTypes.SET_FRIEND_DESCRIPTION:

            return {
                ...state,
                friendDescription: {...action.payload},
                loading: false
            };

        case friendsActionTypes.SORT_FRIENDS:

            return {...state,
                configsFriends : {
                    ...state.configsFriends,
                    ...{typeSort : action.payload, startView: 0}
                },
                loading: true
            };

        case friendsActionTypes.SEARCH_FRIENDS:

            return {...state,
                friends: [],
                configsFriends : {
                    ...state.configsFriends,
                    ...{searchValue : action.payload, startView: 0}
                },
                loading: true
            };

        case friendsActionTypes.SHOW_BOOKMARKS_FRIENDS:

            return {...state,
                friends: [],
                configsFriends : {
                    ...state.configsFriends,
                    ...{showBookmark : action.payload, startView: 0}
                },
                loading: true
            };

        case friendsActionTypes.BOOKMARKS_FRIENDS:
        case friendsActionTypes.RATING_FRIENDS:

            return {
                ...state,
                friends : state.friends.map(friend => {
                    return friend.id === action.payload.id ? action.payload : friend;
                })
            };

        case friendsActionTypes.SET_COUNT_BOOKMARKS_FRIENDS:

            return {
                ...state,
                ...{bookmarks : {count : action.payload}}
            };

        case friendsActionTypes.ERRORS_FRIENDS:

            return {...state, errors : {...action.payload}};

        default:
            return state;
    }
}

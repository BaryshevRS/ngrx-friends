import {FriendsAction, friendsActionTypes} from '../type/index';
import {Friends} from '../../interface/friends';

const initialState: Friends = {
    friends : [],
    configsFriends: {
        typeSort: 0,
        searchValue: '',
        showBookmark: false,
        startView: 0,
        limitView: 4
    },
    bookmarks: {
        count: 0
    }
};

export function friendsReducer(state = initialState, action: FriendsAction) {
    switch (action.type) {
        case friendsActionTypes.LOAD_FRIENDS:

            const store =  {
                ...state,
                friends : [...action.payload.friends],
                configsFriends : {...action.payload.configsFriends}
            };

            console.log('xxx', store);
            return store;

        case friendsActionTypes.RATING_FRIENDS:

            return {
                ...state,
                friends : state.friends.map(friend => {
                    return friend.id === action.payload.id ? action.payload : friend;
                })
            };

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

        case friendsActionTypes.SHOW_BOOKMARKS_FRIENDS:

            return {...state,
                configsFriends : {
                    ...state.configsFriends,
                    ...{showBookmark : action.payload, startView: 0}
                }
            };

        case friendsActionTypes.SET_BOOKMARK_FRIENDS:

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
        default:
            return state;
    }
}

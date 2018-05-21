import * as types from './actionTypes';
import authorAPI from '../api/mockAuthorAPI';

export function loadAuthorsSuccess(authors) {
    return {
        type : types.LOAD_AUTHORS_SUCCESS,
        authors
    };
}

export function loadAuthors() {
    return function(dispatch) {
        return authorAPI.getAllAuthors().then(authors  => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(err => {
            throw(err);
        });
    };
}
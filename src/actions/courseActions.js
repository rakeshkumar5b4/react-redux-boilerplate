import * as types from './actionTypes';
import courseAPI from '../api/mockCourseAPI';

export function loadCoursesSuccess(courses) {
    return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function updateCourseSuccess(course) {
    return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function createCourseSuccess(course) {
    return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function loadCourses() {
    return function (dispatch) {
        return courseAPI
            .getAllCourses()
            .then(courses => {
                dispatch(loadCoursesSuccess(courses));
            })
            .catch(err => {
                throw(err);
            });
    };
}

export function saveCourse(course) {
    let isUpdateMode = course.id != '' && course.id != '';
    return function (dispatch, getState) {
        return courseAPI
            .saveCourse(course)
            .then(course => {
                isUpdateMode
                    ? dispatch(updateCourseSuccess(course))
                    : dispatch(createCourseSuccess(course));
            })
            .catch(error => {
                throw(error);
            });
    };
}
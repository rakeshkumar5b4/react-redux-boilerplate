import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseForm from './CourseForm';
import {browserHistory} from 'react-router';

class ManageCoursePage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.course),
            errors: {}
        };
        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.course.id != nextProps.course.id) {
            this.setState({
                course : Object.assign({}, nextProps.course)
            });
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        this.setState({course});
    }

    saveCourse(event) {
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        browserHistory.push('/courses');
    }

    render() {
        return (
            <div>
                <CourseForm
                    course={this.state.course}
                    errors={this.state.errors}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                    allAuthors={this.props.authors}/>
            </div>
        );
    }

}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function getCourse(courses, id) {
    let filteredValues = courses.filter(course => course.id == id);
    if(filteredValues) {
        return filteredValues[0];
    }
    return null;
}

function mapStateToProps(state, ownProps) {
    let courseID = ownProps.params.id;
    let course = {
        id: '',
        watchHref: '',
        title: '',
        authorId: '',
        length: '',
        category: ''
    };
    if(courseID && state.courses.length > 0) {
        course = getCourse(state.courses, courseID);
    }
    const authorsFormattedForDropdown = state
        .authors
        .map(author => {
            return {
                value: author.id,
                text: author.firstName + ' ' + author.lastName
            };
        });

    return {course: course, authors: authorsFormattedForDropdown};
}

function mapDispatcherToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatcherToProps)(ManageCoursePage);
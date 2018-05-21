import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';

class ManageCoursePage extends React.Component {

    render() {
        return (
            <h1>Manage Course</h1>
        );
    }

}

ManageCoursePage.PropTypes = {
    //myProp : PropTypes.string.isRequired;
};

function mapStateToProps(state, ownProps) {
    return {
        state : state
    };
}

function mapDispatcherToProps(dispatch) {
    return {
        actions : bindActionCreators(courseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(ManageCoursePage);
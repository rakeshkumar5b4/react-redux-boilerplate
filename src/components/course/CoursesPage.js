import React from 'react';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course : {
                title : ''
            }
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({course : course});
    }

    onSaveClick(event) {
        alert(`Saving the title: ${this.state.course.title}`);
    }

    render() {
        return (
            <div>
                <h1>Courses</h1>
                <h2>Add Course</h2>
                <input type="text" onChange={this.onTitleChange} value={this.state.course.title}/>
                <input type="button" onClick={this.onSaveClick} value="Save"/>
            </div>
        );
    }
}

export default CoursesPage;
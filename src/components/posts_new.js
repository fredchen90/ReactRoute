import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
	renderField(field) {
		console.log(field);
		// {...field.input} equal
		// onChange={field.input.onChange} / onFocus={field.input.onFocus} / onBlur={field.input.onBlur}
		return (
			<div className="form-group">
				<label>{field.label}</label>
				<input className="form-control"
					type="text"
					{...field.input}
				/>
				{field.meta.touched && field.meta.error && <span>{field.meta.error}</span>}
			</div>
		);
	}

	render() {
		return (
			<form>
				<Field
					label="Title"
					name="title"
					component={this.renderField}
				/>
				<Field
					label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field
					label="Post Content"
					name="content"
					component={this.renderField}
				/>
			</form>
		);
	}
}

function validate(values) {
	const error = {};
	// Validate the input from values.*name*
	if (!values.title) {
		error.title = 'Required';
	}

	if (!values.categories) {
		error.categories = 'Required';
	}

	if (!values.content) {
		error.content = 'Required';
	}

	// If error is not empty, redux form assumes is valid
	return error;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm' // a unique identifier for this form
})(PostsNew);
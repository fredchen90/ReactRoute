import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	renderField(field) {
		const { touched, error } = field.meta;
		const className = `form-group ${touched && error ? 'has-danger' : '' }`;
		// {...field.input} equal
		// onChange={field.input.onChange} / onFocus={field.input.onFocus} / onBlur={field.input.onBlur}
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
				<button type="submit" className="btn btn-primary">
					Save
				</button>
				<Link className="btn btn-danger" to="/posts">
					Cancel
				</Link>
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

// add additional properties that are passed to our component PostsNew
export default reduxForm({
	validate,
	form: 'PostsNewForm' // a unique identifier for this form
})(
	connect(null, { createPost })(PostsNew)
);

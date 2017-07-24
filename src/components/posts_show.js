import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostsShow extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchPost(id);
	}
	render() {
		console.log('111: ',this);
		const { post } = this.props;
		if (!post) {
			return (
				<div>
					<h1>Loading....</h1>
				</div>
			);
		}
		return (
			<div>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}

// this.props === ownProps
function mapStateToProps(state, ownProps) {
	return {
		post: state.posts[ownProps.match.params.id],};
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);
import React, { Component } from 'react';
import BookmarksContext from '../BookmarksContext';
import PropTypes from 'prop-types';
import config from '../config';

export default class EditBookmark extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object
        }),
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    }

    static contextType = BookmarksContext;
    
    state = {
        id: '',
        title: '',
        url: '',
        description: '',
        rating: 1,
        error: null
    }
    componentDidMount() {
        const bookmarkId = this.props.match.params.bookmark_id
        console.log(bookmarkId)
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'GET'
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(responseData => {
                this.setState({
                    id: responseData.id,
                    title: responseData.title,
                    url: responseData.url,
                    description: responseData.description,
                    rating: responseData.rating
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleTitleChange = e => {
        this.setState({ title: e.target.value })
    }

    handleUrlChange = e => {
        this.setState({ url: e.target.value })
    }

    handleDescriptionChange = e => {
        this.setState({ description: e.target.value })
    }

    handleRatingChange = e => {
        this.setState({ rating: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        //get form fields from the event
        const bookmarkId = this.props.match.params.bookmark_id
        const { id, title, url, description, rating } = this.state
        const newBookmark = { id, title, url, description, rating }

        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'PATCH',
            body: JSON.stringify(newBookmark),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
            })
            .then(() => {
                this.resetFields(newBookmark)
                this.context.updateBookmark(newBookmark)
                this.props.history.push('/')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || '',
            title: newFields.title || '',
            url: newFields.url || '',
            description: newFields || '',
            rating: newFields.rating || 1
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    render () {
        //const { title, style, content } = this.state
        return (
            <section className='EditBookmarkForm'>
                <h2>Edit bookmark</h2>
                <form
                    className='AddBookmark__form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='AddBookmark__error' role='alert'>
                        {this.state.error && <p>{this.state.error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='title'>
                        Title
                        {' '}
                        </label>
                        <input
                        type='text'
                        name='title'
                        id='title'
                        placeholder={this.state.title}
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor='url'>
                        URL
                        {' '}
                        </label>
                        <input
                        type='url'
                        name='url'
                        id='url'
                        placeholder={this.state.url}
                        value={this.state.url}
                        onChange={this.handleUrlChange}
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>
                        Description
                        </label>
                        <textarea
                        name='description'
                        id='description'
                        placeholder={this.state.description}
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='rating'>
                        Rating
                        {' '}
                        </label>
                        <input
                        type='number'
                        name='rating'
                        id='rating'
                        value={this.state.rating}
                        min='1'
                        max='5'
                        required
                        onChange={this.handleRatingChange}
                        />
                    </div>
                    <div className='AddBookmark__buttons'>
                        <button type='button' onClick={this.handleClickCancel}>
                        Cancel
                        </button>
                        {' '}
                        <button type='submit'>
                        Save
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}
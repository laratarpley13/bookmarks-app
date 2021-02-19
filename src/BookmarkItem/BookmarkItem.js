import React from 'react';
import Rating from '../Rating/Rating';
import BookmarksContext from '../BookmarksContext';
//import config from '../config';
import './BookmarkItem.css';
import { Link } from 'react-router-dom';

function deleteBookmarkRequest(bookmarkId, callback) {
  fetch(`http://localhost:8000/api/bookmark/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
      //'authorization': `bearer ${config.API_KEY}`
    } 
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => Promise.reject(error))
      }
      return res
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      callback(bookmarkId)
    })
    .catch(error => {
      console.error(error)
    })
}

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
      {(context) => (
        <li className='BookmarkItem'>
          <div className='BookmarkItem__row'>
            <h3 className='BookmarkItem__title'>
              <a
                href={props.url}
                target='_blank'
                rel='noopener noreferrer'>
                {props.title}
              </a>
            </h3>
            <Rating value={props.rating} />
          </div>
          <p className='BookmarkItem__description'>
            {props.description}
          </p>
          <div className='BookmarkItem__buttons'>
            <button
              className='BookmarkItem__description'
              onClick={() => {
                console.log(props.id)
                deleteBookmarkRequest(
                  props.id,
                  context.deleteBookmark
                )
              }}
            >
              Delete
            </button>
            <Link to={`/edit/${props.id}`}>Edit Bookmark</Link>
          </div>
        </li>
      )}
    </BookmarksContext.Consumer>
    
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}

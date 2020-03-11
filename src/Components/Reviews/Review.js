import React, { Component } from 'react';

class Review extends Component{
    render(){
        return(
            <div className='wrap singleReview'>
                <span className='block mrg-btm-10 bold secondary'>
                    {this.props.review.rating}/5
                </span>
                <p>{ this.props.review.comment }</p>
            </div>
        );
    }
}

export default Review;
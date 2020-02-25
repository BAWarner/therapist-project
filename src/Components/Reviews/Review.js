import React, { Component } from 'react';

class Review extends Component{
    render(){
        return(
            <div className='wrap singleReview'>
                <p>{ this.props.review.comment }</p>
            </div>
        );
    }
}

export default Review;
import React, { Component } from 'react'

export class Newsitem extends Component {    
    render() {
        let {title , description, imageUrl, newsUrl} = this.props;
        return (
        <div className='container'>
            <div className="card my-2">
                <img src={imageUrl?imageUrl:"https://www.reuters.com/resizer/BK8ydp07zSc-LAvKZX8lCYi6tnw=/1920x1005/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/4FBBHLVHMNKK7KYE7VPNTAHWW4.jpg"} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <a href={newsUrl} target='blank' className="btn btn-outline-dark text-center">Read More</a>
                </div>
            </div>
        </div>
        )
    }
}

export default Newsitem

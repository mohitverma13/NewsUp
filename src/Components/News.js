import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Newsitem from './Newsitem'
import Spinner from './Spinner';

export class News extends Component {        
    async componentDidMount()
    {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b1a82108ba5644a1bed5fa4e1c790371&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading : true}); 
        let  data = await fetch(url);
        let parsedata = await data.json()
        console.log(parsedata);
        this.setState({
            articles: parsedata.articles, 
            totalResults: parsedata.totalResults,
            loading : false
        });
    }

    static defaultProps ={
        country: 'in',
        pageSize : 8,
        category: 'Sports'
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category: PropTypes.string
    }

    constructor()
    {
        super();
        this.state ={
            articles : [], 
            loading : false,
            page: 1            
        }
    }

    handleprev = async ()=>{
        console.log("previous clicked");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b1a82108ba5644a1bed5fa4e1c790371&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let  data = await fetch(url);
        let parsedata = await data.json()
        console.log(parsedata);

        this.setState({
            page: this.state.page - 1,  
            articles: parsedata.articles,
            loading : false         
        })
    }

    handlenext = async ()=>{
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))
        {

        }
        else{
            console.log("next clicked");
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b1a82108ba5644a1bed5fa4e1c790371&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading : true});
            let  data = await fetch(url);
            let parsedata = await data.json()
            console.log(parsedata);

            this.setState({
                page: this.state.page +1 ,
                articles: parsedata.articles,
                loading : false
            })
        }        
    }

    render() {
        return (
        <div className='container news_box my-3'>        
            <h2 className='text-center'>!! Top News Headlines !!</h2>
            {this.state.loading && <Spinner/>}
            <div className="row d-flex justify-content-start flex-wrap">
            {!this.state.loading && this.state.articles.map((Element)=>{
                return <div className="col-md-3" key={Element.url}>
                    <Newsitem title ={Element.title?Element.title.slice(0,40):""} description={Element.description?Element.description.slice(0,80):""} imageUrl={Element.urlToImage} newsUrl={Element.url}/>
                </div>
            })}                               
            </div>

            <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-danger mx-2" onClick={this.handleprev}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-success" onClick={this.handlenext}>Next &rarr;</button>
            </div>            
        </div>
        )
    }
}

export default News

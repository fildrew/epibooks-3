import { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

class CommentArea extends Component {
    state = {
        comments: [],
        isLoading: true,
        isError: false,
    };

    componentDidMount = () => {
      console.log("CommentArea with asin:",this.props.asin)
      if (this.props.asin) {
        this.fetchComments();
      }
    };

    componentDidUpdate = (prevProps) => {
      console.log("CommentArea Updated with asin:",this.props.asin);

      if (this.props.asin !== prevProps.asin) {
        this.setState({comments:[], isLoading: true, isError : false});
        this.fetchComments();
      }
    };

    fetchComments = async () => {
      try {
        let response = await fetch(
          'https://striveschool-api.herokuapp.com/api/comments/' +
            this.props.asin,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYyZmVkNDcxYWZhZjAwMTkxNTY2YmQiLCJpYXQiOjE3MTA3NzA0MzQsImV4cCI6MTcxMTk4MDAzNH0.LcqS5fglt4Q-c91rnt-HfKnqlbQsHlEeU3fcrZZgXjo',
            },
          }
        )
      
        if (response.ok) {
          let comments = await response.json()
          this.setState({ comments: comments, isLoading: false, isError: false });
        } else {
          this.setState({ isLoading: false, isError: true });
        }
        } catch (error) {
          console.log(error)
        this.setState({ isLoading: false, isError: true });
        }
    };
    
    render() {
      return (
        <div className="text-center">
          {this.state.isLoading && <Loading />}
          {this.state.isError && <Error />}
          <AddComment asin={this.props.asin} />
          <CommentList commentsToShow={this.state.comments} />
        </div>
      )
    }

}

export default CommentArea;

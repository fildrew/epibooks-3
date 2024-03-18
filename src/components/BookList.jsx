import { Component } from 'react'
import SingleBook from './SingleBook'
import { Col, Form, Row } from 'react-bootstrap'

class BookList extends Component {
  state = {
    searchQuery: '',
    bookId:null,
  };

  currentBook= (bookId) => {
    this.setState({bookId:bookId});
  };


  render() {
    return (
      <>
        <Form.group>
            <Form.Control
              type="search"
              placeholder="Search for a book"
              value={this.state.searchQuery}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
            />
        </Form.group>

        <Row className="justify-content-center mt-5">
          <Col className= "col-8 text-center">
              <Row className="justify-content-center">
                  {this.props.books
                    .filter((b) =>
                      b.title.toLowerCase().includes(this.state.searchQuery)
                    )
                    .map((b) => (
                      <Col xs={12} md={4} key={b.asin}>
                        <SingleBook book={b} />
                      </Col>
                    ))}
              </Row>
          </Col>
          <Col className="col-4 text-center sticky-top mt-5 h-50">
            <CommentArea asin={this.state.bookId}/>
          </Col>
        </Row>
      </>
    );
  }
}

export default BookList

import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookshelfBook from './BookshelfBook'
import { Grid, Message, Button, Header } from 'semantic-ui-react'
import { setShelvedBooks, clearSelectedCover, clearSelectedBook } from '../actions'

class BookshelfList extends Component {

  componentDidMount() {
    let { setShelvedBooks, shelvedBooks, clearSelectedBook, selectedBook, clearSelectedCover, selectedCover } = this.props
    setShelvedBooks(shelvedBooks)
    clearSelectedBook(selectedBook)
    clearSelectedCover(selectedCover)
  }

  render() {
    // console.log("BookshelfList props:", this.props)
    let { shelvedBooks, bookCovers, selectedBook, clearSelectedCover, selectedCover } = this.props
    // debugger
    return (
      <div>
        <div>
          {bookCovers.length > 0 ? (
            <div>
              <Message size='small' floating floated='middle' content="Please note: The covers displayed here may not all match your book exactly; they are Google Books's best guess at covers for this work." />
              <Header as='h2' textAlign='center'>Select a New Cover for {selectedCover.title}</Header>
              <Button fluid onClick={clearSelectedCover}>Cancel Book Cover Change</Button>
              <br />
            </div>
          ) : null}
        </div>
        <div>
          {shelvedBooks.length === 0 ? (
            <div>
              <Header as='h2' textAlign='center'>My Bookshelf</Header>
              <Header sub textAlign='center'>Welcome to Ex Libris, your virtual bookshelf!</Header>
              <Header sub textAlign='center'>Begin by exploring books to add to your shelf.</Header>
              <br />
            </div>
          ) : null}
        </div>
        <div>
          {shelvedBooks.length > 0 && bookCovers.length === 0 ? (
            <div>
              <Header as='h2' textAlign='center'>My Bookshelf</Header>
              <Header sub textAlign='center'>Select a Book to View Its Details, Change the Display Cover, or Remove It From Your Shelf</Header>
              <br />
            </div>
          ) : null}
          <Grid relaxed columns={4}>
            {shelvedBooks.length > 0 && bookCovers.length === 0 ? shelvedBooks.map(book => <BookshelfBook book={book} key={book.goodreads_book_id} />) : null}
            {shelvedBooks.length > 0 && bookCovers.length > 0 ? bookCovers.map(cover => <BookshelfBook book={selectedBook} cover={cover} key={cover.thumbnail} />) : null}
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  shelvedBooks: state.user.user.books,
  bookCovers: state.book.bookCovers,
  selectedBook: state.book.selectedBook,
  selectedCover: state.book.selectedCover
})

export default connect(mapStateToProps, { setShelvedBooks, clearSelectedCover, clearSelectedBook })(BookshelfList)

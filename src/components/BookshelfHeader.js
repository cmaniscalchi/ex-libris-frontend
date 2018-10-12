import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Header, Segment, Image } from 'semantic-ui-react'
import { clearSelectedCover } from '../actions'

class BookshelfHeader extends Component {

  newUserHeader = () => {
    const newUserImage = require('../assets/img/Alexander-Deineka.jpg')
    return (
      <div>
        <Segment style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: 800 }}>
          <Header as='h2' textAlign='center'>My Bookshelf</Header>
          <Header sub textAlign='center'>Welcome to Ex Libris, your virtual bookshelf!<br />
          Begin by exploring books to add to your shelf.</Header>
          <br />
          <Image src={newUserImage} alt='Ex Libris' style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '80%' }}/>
          <br />
          <Link to="/search"><Button fluid>Go To Search</Button></Link>
        </Segment>
        <br />
      </div>
    )
  }

  changeCoverHeader = () => {
    let { clearSelectedCover, selectedCover } = this.props
    return (
      <div>
        <Segment>
          <Header as='h2' textAlign='center'>Select a New Cover for {selectedCover.title}</Header>
          <Header sub textAlign='center'>Please note: The covers displayed here may not all match your book exactly;<br />
          they are Google Books's best guess at covers for this work.</Header>
          <br />
          <Button fluid onClick={clearSelectedCover}>Cancel Book Cover Change</Button>
        </Segment>
        <br />
      </div>
    )
  }

  switchBookshelf = () => {
    return (
      <div></div>
    )
  }

  renameBookshelf = () => {
    return (
      <div></div>
    )
  }

  createBookshelf = () => {
    return (
      <div></div>
    )
  }

  bookshelfHeader = () => {
    let { bookshelves } = this.props
    return (
      <div>
        <Segment>
          <Header as='h2' textAlign='center'>My Bookshelf</Header>
          <Header sub textAlign='center'>Select a Book to View Its Details, Change the Display Cover, or Remove It From Your Shelf</Header>
          <br />
          <div style={{display:'flex', justifyContent:'space-around'}}>
            <Button onClick={this.renameBookshelf}>Rename This Bookshelf</Button>
            {bookshelves.length > 1 ? <Button onClick={this.switchBookshelf}>Switch To Another Shelf</Button> : null}
            <Button onClick={this.createBookshelf}>Create a New Shelf</Button>
          </div>
        </Segment>
        <br />
      </div>
    )
  }


  render() {
    console.log("BookshelfHeader props:", this.props)
    let { shelvedBooks, bookCovers } = this.props
    return (
        <div>
          {bookCovers.length > 0 ? this.changeCoverHeader() : null}
          {shelvedBooks.length === 0 ? this.newUserHeader() : null}
          {shelvedBooks.length > 0 && bookCovers.length === 0 ? this.bookshelfHeader() : null}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  bookshelves: state.user.user.bookshelves,
  selectedCover: state.book.selectedCover,
  shelvedBooks: state.user.user.books,
  bookCovers: state.book.bookCovers,
})

export default connect(mapStateToProps, { clearSelectedCover })(BookshelfHeader)

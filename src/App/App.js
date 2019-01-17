import React, { Component } from 'react';
import { capitalizeFirstLetter, dateFormater } from '../utils/format';
import ApiClient from '../helpers/ApiClient';
import Modal from '../Modal/Modal';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      title: '',
      content: '',
      isOpen: false,
    };

    ['title', 'content'].forEach(value => {
      this[`handleChange${capitalizeFirstLetter(value)}`] = this.handleChange(value);
    });
  }

  componentDidMount() {
    this.getArticleList();
  }

  sort(data) {
    return data.sort((a, b) => {
      const keyA1 = a.like - a.dislike;
      const keyB1 = b.like - b.dislike;
      const keyA2 = a.date;
      const keyB2 = b.date;

      if (keyA1 > keyB1) return -1;
      if (keyA1 < keyB1) return 1;
      if (keyA2 > keyB2) return -1;
      if (keyA2 < keyB2) return 1;
      return 0;
    });
  };

  getArticleList = () => {
    ApiClient.GET('/article/list').then(
      (data) => {
        this.setState({
          articles: this.sort(data)
        });
      }, (error) => {
        console.error(error);
      }
    );
  }

  openForm = () => {
    this.setState({
      isOpen: true,
    });
  }

  closeForm = () => {
    this.setState({
      isOpen: false,
      title: '',
      content: '',
    });
  }

  handleSave = () => {
    const { title, content } = this.state;
    const data = {
      title,
      content
    };

    ApiClient.POST('/article', {
      data
    }).then(
      (result) => {
        console.log('handleSave', result);
        this.closeForm();
        this.getArticleList();
      }, (error) => {
        console.error(error);
      }
    );
  }

  handleChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value,
    });
  }

  handleLike = (e) => {
    const { id, value } = e.target.dataset;
    const newValue = parseInt(value, 10) + 1;
    const data = {
      like: newValue
    };

    ApiClient.PATCH(`/article/${id}`, {
      data
    }).then(
      () => {
        const newArticles = this.state.articles.slice();
        const article = newArticles.find(value => value._id === id);
        article.like = newValue;

        this.setState({
          articles: this.sort(newArticles)
        });
      }, (error) => {
        console.error(error);
      }
    );
  }

  renderList() {
    const { articles } = this.state;

    return articles.map(value => {
      const { _id, title, date, content, like } = value;
      return (
        <div key={_id} className="article">
          <div className="title">
            {title}
            <span className="date">{dateFormater(date)}</span>
          </div>
          <div className="content">{content}</div>
          <span
            className="btn like-btn"
            data-id={_id}
            data-value={like}
            onClick={this.handleLike}
          >
            Like {like}
          </span>
        </div>
      )
    });
  }

  render() {
    const { title, content, isOpen } = this.state;

    return (
      <div className="App">
        <header className="header">
          <div className="container">
            <span className="title">Board</span>
            <span className="btn add-btn" onClick={this.openForm}>Add Post</span>
          </div>
        </header>
        <div className="body">
          <div className="container">
            <div className="article-list-container">
              <div className="list-header">
                <span className="title">Article List</span>
                <span className="sort">
                  Sort by
                  <span className="value">Like</span>
                </span>
              </div>
              <div className="article-list">
                {this.renderList()}
              </div>
            </div>

            <Modal isOpen={isOpen}>
              <div className="form">
                <div className="form-title">New Post</div>
                <div className="form-field">
                  <label className="form-label">Title</label>
                  <input className="form-input" value={title} onChange={this.handleChangeTitle} />
                </div>
                <div className="form-field">
                  <label className="form-label">Content</label>
                  <textarea className="form-textarea" value={content} onChange={this.handleChangeContent} />
                </div>
                <div className="btn-container">
                  <span className="btn cancel-btn" onClick={this.closeForm}>Cancel</span>
                  <span className="btn" onClick={this.handleSave}>Save</span>
                </div>
              </div>
            </Modal>
          </div>
        </div>

      </div>
    );
  }
}

export default App;

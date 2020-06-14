import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchField from './components/SearchField';
import RepoList from './components/RepoList';
import Paginator from './components/Paginator';

class App extends Component {
  constructor() {
    super();
    this.state = {
      card: '',
      cardName: '',
      contributors: [],
      heading: [<h2 key='mostpop'>Top 10 GitHub repositories:</h2>],
      languages: [],      
      input: '',
      items: [],
      loading: true,
      page: 1,
      pagesAmount: 1,
      route: 'home'   
    }
    this.itemsPerPage = 10;
    this.options = {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }    
    }
    this.pagesAmountMax = 10;
  }

  buildSearchQuiery = (q) => {
    let url = 'https://api.github.com/search/repositories?q=';
    url += (q === '') ? 'stars%3A%3E100' : q;
    url += `&sort=stars&order=desc&per_page=${this.itemsPerPage}&page=${this.state.page}`;
    return url;
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    this.setState({ page: 1 });
    localStorage.setItem("state", JSON.stringify(this.state));
    this.setState({ loading: true });

    let delayChecker = '';
    setTimeout(() => { delayChecker = this.state.input }, 0);
    
    setTimeout(() => { 
      if (delayChecker === this.state.input) setTimeout(() => this.setItems(), 0); // waiting for the user to stop typing before fetching data
    }, 600)
  }

  onPageChange = (i) => {
    this.setState({ page: Number(i.target.innerHTML) });
    localStorage.setItem("state", JSON.stringify(this.state));
    setTimeout(() => this.setItems(), 0);
  }

  openCard = (link) => {
    this.setState({ loading: true });    
    let repoResponse = '';
    let languagesDiv = [];
    let contributorsDiv = [];    

    setTimeout(() => {
      fetch(link, this.options)
      .then(response => response.json())
      .then(response => {
        repoResponse = response;
        if (repoResponse.size === 0) {
          repoResponse.description = "This repo is empty.";
          let cardDiv = [
              <div key="cardDiv" className="cardDiv">
                <div className="ownerDiv">
                  <img src={repoResponse.owner.avatar_url} alt="avatar" className="userpic"/><br/>
                  <a href={repoResponse.owner.html_url} className="fatName">{repoResponse.owner.login}</a>
                </div>
                <div className="repoDiv">
                  <h3 className="repoName"><a href={repoResponse.html_url} className="fatLink">{repoResponse.name}</a></h3>
                  <span className="repoStars"><span role="img" aria-label="star">⭐</span>{repoResponse.stargazers_count}</span>
                  <br/>Last commit: {repoResponse.updated_at.slice(0,-10)} at {repoResponse.updated_at.slice(11,-4)}<br/><br/>
                  {repoResponse.description}<br/><br/>
                </div>
              </div>
            ];
            this.setState({ loading: false });
            this.setState({ card: cardDiv });
            this.setState({ route: 'card' });
            localStorage.setItem("state", JSON.stringify(this.state)); 
          return;
        }

        // aggregating language list
        fetch(repoResponse.languages_url, this.options)
        .then(langResponse => langResponse.json())
        .then(langResponse => {
          let keys = [];
          for (let k in langResponse) keys.push(k);
          let listAggregator = [];
          if (keys.length !== 0) {
            for (let i = 0; i < keys.length; i++) {
              let newLi = [<li key={"lang li #" + i}>{keys[i]}</li>];
              listAggregator = listAggregator.concat(newLi);
            }
            languagesDiv = <div key="languages list"><div className="listTitle">Languages used:</div><ul key="languages list">{listAggregator}</ul></div>;
          }
        })
        .then(() => {
          // aggregating contributors list
          fetch(response.contributors_url, this.options)
          .then(contributorsResponse => contributorsResponse.json())
          .then(contributorsResponse => {
            let listAggregator = [];

            if (Array.isArray(contributorsResponse)) {
              let count = 10;
              if (contributorsResponse.length < 10) count = contributorsResponse.length;
              for (let i = 0; i < count; i++) {
                let newLi = [<li key={"contr li #" + i}>{contributorsResponse[i].login}</li>];
                listAggregator = listAggregator.concat(newLi);
              }
              if (contributorsResponse.length === 1) contributorsDiv = <div key="contributors list">{contributorsResponse[0].login} is the only contributor.</div>;
              else contributorsDiv = <div key="contributors list"><div className="listTitle">Top 10 contributors:</div><ul>{listAggregator}</ul></div>;
            } else contributorsDiv = <div key="contributors list">The history or contributor list is too large to list contributors for this repository via the API.</div>;
          })
          .then(() => {
            let cardDiv = [
              <div key="cardDiv" className="cardDiv">
                <div className="ownerDiv">
                  <img src={repoResponse.owner.avatar_url} alt="avatar" className="userpic"/><br/>
                  <a href={repoResponse.owner.html_url} className="fatName">{repoResponse.owner.login}</a>
                </div>
                <div className="repoDiv">
                  <h3 className="repoName"><a href={repoResponse.html_url} className="fatLink">{repoResponse.name}</a></h3>
                  <span className="repoStars"><span role="img" aria-label="star">⭐</span>{repoResponse.stargazers_count}</span>
                  <br/>Last commit: {repoResponse.updated_at.slice(0,-10)} at {repoResponse.updated_at.slice(11,-4)}<br/><br/>
                  {repoResponse.description}<br/><br/>             
                  {languagesDiv}
                  {contributorsDiv}<br/>
                </div>
              </div>
            ];
            this.setState({ loading: false });
            this.setState({ card: cardDiv });
            this.setState({ route: 'card' });
            localStorage.setItem("state", JSON.stringify(this.state));   
          })     
        })
      })
    }, 0);
  }

  setItems = () => {
    let url = this.buildSearchQuiery(this.state.input);
    this.setState({ loading: true });

    fetch(url, this.options)
      .then(response => response.json())
      .then(response => {
        this.setState({ loading: false });

        // setting up repo list
        if (response.total_count > 0) {
          let count = this.itemsPerPage;
          if (response.total_count < 10) count = response.total_count;

          if (this.state.input === '') this.setState({ heading: [<h2 key='top10'>Top 10 GitHub repositories:</h2>] });
          else this.setState({ heading: [<h2 key='mostpop'>Most starred “{this.state.input}” repositories on GitHub:</h2>] });

          let tableHead = [<thead key='thead'><tr><th>Rank</th><th>Name</th><th>Rating</th><th>Updated</th><th>URL</th></tr></thead>];
          let aggregator = [];

          for (let i = 0; i < count; i++) {
            let newDiv = [
                <tr key={'key'+i}><td>#{this.itemsPerPage * (this.state.page-1) + i+1}</td>
                <td><span className="fatName" onClick={()=>this.openCard(response.items[i].url)}>{response.items[i].name}</span></td>
                <td><span role="img" aria-label="star">⭐</span>{response.items[i].stargazers_count}</td>
                <td>{response.items[i].updated_at.slice(0,-10)}</td>
                <td><a href={response.items[i].html_url} className="fatLink">{response.items[i].html_url.substr(8)}</a></td></tr>
            ];
            aggregator = aggregator.concat(newDiv);
          }
          let tableBody = [<tbody key='tbody'>{aggregator}</tbody>]
          let table = [<table key='table'>{tableHead}{tableBody}</table>]

          this.setState({ items: table });
          localStorage.setItem("state", JSON.stringify(this.state));

          // setting up Paginator
          if (this.state.input !== '') {
            if (response.total_count >= this.itemsPerPage * this.pagesAmountMax) this.setState({ pagesAmount: this.pagesAmountMax });
            else {
              let tempPagesAmount = Math.floor(response.total_count / this.itemsPerPage);
              if (response.total_count % this.itemsPerPage !== 0) tempPagesAmount++;
              this.setState({ pagesAmount: tempPagesAmount });
              localStorage.setItem("state", JSON.stringify(this.state));
            }
          }
          else {
            this.setState({ pagesAmount: 1 });
            localStorage.setItem("state", JSON.stringify(this.state));
          }
        } else {
          this.setState({ heading: [<h2 key='notfound'>No “{this.state.input}” repositories found on GitHub!</h2>] , items: [], pagesAmount: 1, page: 1} );
        }
      })

      .catch(err => {
        this.setState({ loading: false });
        this.setState({ items: [<div key="err">We are limited to 10 requests per minute :(</div>] , heading: [<h2 key='mostpop'>Oops!</h2>] });
        localStorage.setItem("state", JSON.stringify(this.state));
      });    
  }

  componentDidMount() {
    let data = localStorage.getItem("state");
    if (data) {
      data = JSON.parse(data);
      this.setState({
        input: data.input,
        page: data.page
      });
    }
    setTimeout(() => this.setItems(), 0);
  }

  render() {
    let itemsDynamic = [<div key='spinner' className='spinnerWrap'><img src={require('./img/spinner.png')} alt ="..." className='spinner'/></div>], headingDynamic = [<h2 key='mostpop'>Loading...</h2>];
    if (!this.state.loading) {
      itemsDynamic = this.state.items;
      headingDynamic = this.state.heading;
    }

    return (
      <div className="App">
        <h1><span id="gh">GitHub</span> <span id="db">Dashboard</span></h1>
        { this.state.route === 'home'
          ? 
          <div>
            <SearchField
              onInputChange = {this.onInputChange}
              input = {this.state.input}
            />
            {headingDynamic}
            <RepoList
              items={itemsDynamic}
            />
            <Paginator pagesAmount = {this.state.pagesAmount} page = {this.state.page} onPageChange = {this.onPageChange}/>
          </div>
          :
          <div>
            <span className="fatName" onClick={() => this.setState({ route: 'home' })}>← Back to Dashboard</span><br/><br/>
            {this.state.card}
          </div>
        }
        <footer>©2020 <a href="https://github.com/sanyavanya">@sanyavanya</a></footer>  
      </div>
    ); 
  }
}

export default App;
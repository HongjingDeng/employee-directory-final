import React, { Component } from 'react';
//import logo from './logo.svg';
import axios from "axios";
import './App.css';

class App extends Component {
  state = {
    people: [],
    gender: [],
    search: ""
  };

  componentDidMount() {
    // get random user data
    axios.get(`https://randomuser.me/api/?results=250&nat=us`).then((res) => {
      this.setState({
        people: res.data.results,
        gender: res.data.results[0].gender
      });
    })
  }

  changeSearch = (e) => {
    // update state when input changes
    this.setState({
      search: e.target.value
    });
  }

  cancelSubmit = (e) => {
    // don't accidentally reload page
    e.preventDefault();
  }

  sortAZ = () => {
    let copyPeople1 = [...this.state.people];
    copyPeople1.sort((a, b) => {
      if (a.name.last > b.name.last) { return 1; }
      else { return -1; }

    })
    this.setState({
      people: copyPeople1
    })
  }

  sortZA = () => {
    let copyPeople1 = [...this.state.people];
    copyPeople1.sort((a, b) => {
      if (a.name.last < b.name.last) { return 1; }
      else { return -1; }

    })
    this.setState({
      people: copyPeople1
    })
  }

  render() {
    // render two forms, one based on react state and one that's hard-coded for jQuery to populate
    return (
      <div className="container">
        <form id="test1" onSubmit={this.cancelSubmit}>
          <input
            className="input"
            type="text"
            value={this.state.search}
            onChange={this.changeSearch}
            placeholder="Search By Name"
          />
          <input
            className="input"
            type="text"
            value={this.state.search}
            onChange={this.changeSearch}
            placeholder="Search By Gender"
          />
          <button className="btn btn-primary" onClick={this.sortAZ}>
            Sort Last Name A to Z
          </button>
          <button className="btn btn-danger" onClick={this.sortZA}>
            Sort Last Name Z to A

          </button>

          <div className="people">
            {
              this.state.people.filter((p) => {
                // filter down based on search state
                return (p.name.first + " " + p.name.last).toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
              }).map((p) => {
                let name = `${p.name.first} ${p.name.last}`;

                // convert into jsx
                return (<>
                  <p className="centered" key={p.id.value}>
                    <img src={p.picture.thumbnail} alt={name} />
                    <strong>{p.name.first}</strong><span>  </span>
                    <strong>{p.name.last}</strong>
                  </p>
                <hr></hr>
                </>
                );
              })
            }
          </div>
        </form>


      </div >
    );
  }
}

export default App;

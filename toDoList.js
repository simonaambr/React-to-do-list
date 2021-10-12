import React, { Component } from "react";
import "./toDoList.css"
class toDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: "",
      list: []
    }
  }
    componentDidMount() {
        this.hydrateStateWithLocalStorage();
        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }
    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }
    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key);
                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            }
        }
    }
    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }


    updateInput(key,value){
    this.setState({ [key]: value })

  }

  addItem() {
  const newItem = {
    id: 1 + Math.random(),
    value: this.state.newItem.slice()
  };

  const list = [this.state.list]

    list.push(newItem)

    this.setState( { list, newItem: ""})
  }


 deleteItem(id) {
  const list =[this.state.list]

  const updateList = list.filter(item => item.id !== id)

  this.setState({ list: updateList })
}
  render() {
    return (
        <div className="App">
         <div>
             <h1 className="app-title">My To Do List</h1>
         </div>
          <div className="container">
              <div className="add-item">
            Add an Item
            <br/>
                <input type="text" placeholder="Type task here" value={this.state.newItem} onChange={e => this.updateInput("newItem", e.target.value)}/>
                <button className="add-btn btn-floating" onClick={() => this.addItem()} disabled={!this.state.newItem.length}>
                  Add
                </button>
              <br/>
              <ul>
                {this.state.list.map(item => {
                return (
                    <li key={item.id}>
                      {item.value}
                      <button className="btn btn-floating" onClick={() => this.deleteItem(item.id)}>
                        <i>x</i>
                      </button>
                    </li>
                )
                })}
              </ul>
          </div>
        </div>
      </div>
    )
  }
 }

export default toDoList;

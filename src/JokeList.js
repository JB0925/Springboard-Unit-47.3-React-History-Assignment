// import React, { useState, useEffect } from "react";
// import React, { Component } from "react";
// import axios from "axios";
// import Joke from "./Joke";
// import "./JokeList.css";

// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(function() {
//     async function getJokes() {
//       let j = [...jokes];
//       let seenJokes = new Set();
//       try {
//         while (j.length < numJokesToGet) {
//           let res = await axios.get("https://icanhazdadjoke.com", {
//             headers: { Accept: "application/json" }
//           });
//           let { status, ...jokeObj } = res.data;
  
//           if (!seenJokes.has(jokeObj.id)) {
//             seenJokes.add(jokeObj.id);
//             j.push({ ...jokeObj, votes: 0 });
//           } else {
//             console.error("duplicate found!");
//           }
//         }
//         setJokes(j);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     if (jokes.length === 0) getJokes();
//   }, [jokes, numJokesToGet]);

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  
//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>
  
//         {sortedJokes.map(j => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;

// }

// export default JokeList;

import React, { Component } from 'react';
import './JokeList.css'
import Joke from './Joke';
import axios from 'axios';
import Header from './Header';

class JokeList extends Component {
    static defaultProps = {
        NUMJOKES: 10
    }
    constructor(props) {
        super(props)
        this.state = {jokes: [{joke: "Hahaha", numVotes: 0, key: 11}], isLoaded: false}
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
        this.addJoke = this.addJoke.bind(this);
    }

    componentDidMount() {
        let jokeArray = []
        for (let i = 0; i < this.props.NUMJOKES; i++) {
            axios.get('https://icanhazdadjoke.com/', {
            headers: {Accept: "application/json"}
        }).then(res => {
            setTimeout(() => {
                jokeArray.push({joke: res.data.joke, numVotes: 0, key: i})
                this.setState(st => ({jokes: [...jokeArray], isLoaded: true}))
            })
        })
        }
        
    }

    upVote(oldJoke) {
        this.setState(st => ({
            jokes: st.jokes.map(j => {
               if (j.joke === oldJoke) {
                   j.numVotes ++
               }
               return j
            })
        }))
    }

    downVote(oldJoke) {
        this.setState(st => ({
            jokes: st.jokes.map(j => {
               if (j.joke === oldJoke) {
                   j.numVotes --
               }
               return j
            })
        }))
    }

    addJoke() {
        axios.get('https://icanhazdadjoke.com/', {
            headers: {Accept: "application/json"}
        }).then(res => {
            let oldJokes = this.state.jokes.sort((a,b) => b.numVotes - a.numVotes)
            this.setState(st => ({
                jokes: [...st.jokes.slice(0, -1), {joke: res.data.joke, numVotes: 0}]
            }))
        })
    }
    
    render() {
        let jokes = this.state.jokes.sort((a,b) => b.numVotes - a.numVotes)
        if (!this.state.isLoaded) {
            return <div className="dummy"><i className="fas fa-spinner fa-spin"></i></div>
        }
        return (
            <div className="container">
                    <Header clickButton={this.addJoke}/>
                    <div className="JokeContainer">
                            {jokes.map(j => <Joke joke={j.joke} 
                                                    value={j.numVotes}
                                                    upVote={this.upVote}
                                                    downVote={this.downVote}/>)}
                    </div>
            </div>
            
        )
    }
}

export default JokeList;

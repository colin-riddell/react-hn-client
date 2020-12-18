import './App.css';

import {useState, useEffect} from "react";

import StoryList from "./components/StoryList";

function App() { // Container for the articleIds and stories state

  const [articleIds, setArticleIds] = useState([]);
  const [stories, setStories] = useState([]);

  const fetchStoryData = (storyIds, numStories) => {
    // take off the first numStories id's
    const topStories = storyIds.slice(0, numStories);

    // map every url to the promise of the fetch
    let promises = topStories.map(storyId => fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`));
    console.log(promises);
    // Promise.all to waits until all promises are resolved
    Promise.all(promises) //accepts an array of promises
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(stories => setStories(stories));
  }

  useEffect(()=>{
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then((res)=>res.json())
    .then((data)=>{
      setArticleIds(data);
    });

  },[]);

  useEffect(()=>{ // watches a part of your state (a single state variable)
    fetchStoryData(articleIds, 10);
  },[articleIds])

  return (
    <div stlye={{backgroundColor: "#ff6600"}}>
      <h5 >Hacker News Client</h5>
      <StoryList stories={stories}/>
    </div>
  );
}

export default App;

import './App.css';

import {useState, useEffect} from "react";

import StoryList from "./components/StoryList";

function App() {

  const [articleIds, setArticleIds] = useState([]);
  const [stories, setStories] = useState([]);

  const fetchStoryData = (storyIds, numStories) => {
    // take off the first 4 id's
    const topFour = storyIds.slice(0, numStories);
    // with the 4 id's loop over them

    // map every url to the promise of the fetch
    let promises = topFour.map(url => fetch(`https://hacker-news.firebaseio.com/v0/item/${url}.json`));
    
    // Promise.all to waits until all promises are resolved
    Promise.all(promises)
      .then(responses =>  responses)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(stories => setStories(stories))
    
  }

  useEffect(()=>{
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then((res)=>res.json())
    .then((data)=>{
      setArticleIds(data);
    });
  },[]);

  useEffect(()=>{
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

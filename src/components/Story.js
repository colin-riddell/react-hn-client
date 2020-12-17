const Story = ({story, index}) => {

    return (
        <span>  
            <h5>{index}.</h5>
            <a href={story.url}>{story.title}</a>
        </span>
    );
}

export default Story;
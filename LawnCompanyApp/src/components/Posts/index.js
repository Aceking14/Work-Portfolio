import Post from "./Post";
import './styles.scss'
import { useSelector } from "react-redux";


export default function Services({showOnlyPromoted}) {

  let posts = useSelector((state) => state.post.posts)

  if(showOnlyPromoted) {
    posts = posts.filter((post) => post.promote);
  }

  // Validate if there are posts to display.
  if (posts.length === 0) {
    return (
      <div>No Service Found.</div>
    )
  }


    return (
        <div className="post-list full-width">
          {posts.map((post, index) => (
              <Post 
              key={index} {...post} />
            ))}


          
        </div>
    )
}
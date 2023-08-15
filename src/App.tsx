import Comment, {CommentInput} from "./components/Comment";
import useComment from "./hooks/useComment.ts";
import profile from "./assets/profile.jpg";

import "./App.css";


const CommentSection = () => {
    const {
        comments, handleCommentUpdate,
        handleCommentDelete, OnAddComment,
        handleCommentReply, handleCommentLiking, handleCommentDislike
    } = useComment();
    return (
        <section className={"comments-section"}>
            <CommentInput profile={profile} onSubmit={(message: string) => OnAddComment(message)}/>
            {
                comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment}
                                    OnCommentUpdate={handleCommentUpdate}
                                    OnDeleteComment={handleCommentDelete}
                                    OnPostReply={handleCommentReply}
                                    OnPostLiked={handleCommentLiking}
                                    OnPostDisliked={handleCommentDislike}/>
                })
            }
        </section>
    )
}

function App() {
    return (<div className="app">
        <CommentSection/>
    </div>)
}

export default App;
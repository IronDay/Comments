import CommentInput from "../CommentInput";
import profile from "../../assets/profile.jpg";
import styles from "./CommentSection.module.css";
import Comment from "../Comment";
import Comments from "../../data/Comments.json";
import {useState} from "react";

export interface comment {
    id: number,
    text: string,
    likeCount: number,
    dislikeCount: number,
    retweetCount: number,
    author: string,
    replies?: comment[]
}

const CommentSection = () => {

    const [comments, setComments] = useState(Comments);
    const OnAddComment = (comnt: string) => {
        setComments([{id: 54, author: "Margaret Symonians", text: comnt}, ...comments]);
    }

    return (
        <section className={styles["comments-section"]}>
            <CommentInput image={profile} onSubmit={(message: string) => OnAddComment(message)}/>
            {
                comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment}/>
                })
            }
        </section>
    )
}

export default CommentSection;
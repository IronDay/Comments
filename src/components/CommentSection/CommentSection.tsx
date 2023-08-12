import CommentInput from "../CommentInput";
import profile from "../../assets/profile.jpg";
import styles from "./CommentSection.module.css";
import Comment from "../Comment";
import Comments from "../../data/Comments.json";
import {useState} from "react";
import {v4 as uuid} from "uuid"

export interface comment {
    id: number | string,
    text: string,
    author: string,
    time: string,
    likeCount?: number,
    dislikeCount?: number,
    retweetCount?: number,
    replies?: comment[]
}

const CommentSection = () => {

    const [comments, setComments] = useState<comment>(Comments);
    const OnAddComment = (comnt: string) => {
        const date = Date.now();
        setComments([{id: uuid(), time: date, author: "Margaret Symonians", text: comnt}, ...comments]);
    }

    const handleCommentLiking = () => {
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
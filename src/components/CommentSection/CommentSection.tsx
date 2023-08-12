import CommentInput from "../CommentInput";
import profile from "../../assets/profile.jpg";
import styles from "./CommentSection.module.css";
import Comment from "../Comment";
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
    const [comments, setComments] = useState<comment[]>([] as comment[]);
    const OnAddComment = (comnt: string) => {
        setComments([{id: uuid(), time: new Date().toISOString(), author: "Margaret Symonians", text: comnt}, ...comments]);
    }

    const handleCommentLiking = (id: string | number) => {
        const comment = comments.find((comment) => comment.id === id);
        if (comment) {
            comment.likeCount ? comment.likeCount += 1 : comment.likeCount = (comment.likeCount = 0) + 1;
            console.log(comments);
        }
        setComments([...comments]);
    }


    return (
        <section className={styles["comments-section"]}>
            <CommentInput image={profile} onSubmit={(message: string) => OnAddComment(message)}/>
            {
                comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment} OnPostLiked={handleCommentLiking}
                                   />
                })
            }
        </section>
    )
}

export default CommentSection;
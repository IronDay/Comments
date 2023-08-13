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
    const OnAddComment = (comment_text: string) => {
        setComments([{
            id: uuid(),
            time: new Date().toISOString(), author: "@Simonians",
            text: comment_text
        }, ...comments]);
    }

    const handleCommentLiking = (id: string | number, idRootComment?: string | number) => {
        let comment = comments.find((comment) => comment.id === id);
        if (comment) {
            comment.likeCount ?
                comment.likeCount += 1 : comment.likeCount = (comment.likeCount = 0) + 1;
        } else {
            comment = comments.find((comment) => comment.id === idRootComment)
                ?.replies?.find((reply: comment) => reply.id == id);
            if (comment)
                comment?.likeCount ? comment.likeCount += 1 : comment.likeCount = (comment.likeCount = 0) + 1;
        }
        setComments([...comments]);
    }

    const handleCommentDislike = (id: string | number, idRootComment?: string | number) => {
        let comment = comments.find((comment) => comment.id === id);
        if (comment) {
            comment.dislikeCount ? comment.dislikeCount += 1 : comment.dislikeCount = (comment.dislikeCount = 0) + 1;
        } else {
            comment = comments.find((comment) => comment.id === idRootComment)
                ?.replies?.find((reply: comment) => reply.id == id);
            if (comment)
                comment?.dislikeCount ? comment.dislikeCount += 1 : comment.dislikeCount = (comment.dislikeCount = 0) + 1;
        }
        setComments([...comments]);
    }

    const handleCommentReply = (id: number | string, reply: string | null) => {
        
        const comment = comments.find((comment) => comment.id === id);
        if (comment && reply) {
            setComments(comments.map((comment: comment) => (
                comment.id === id ?
                    {
                        ...comment,
                        replies: comment.replies ? [{
                                id: uuid(), author: "@Jake",
                                text: reply, time: new Date().toISOString()
                            },
                                ...comment.replies,
                            ] :
                            [{
                                id: uuid(), author: "@Jake",
                                text: reply, time: new Date().toISOString()
                            }]
                    }
                    : comment)));
        }
    }

    return (
        <section className={styles["comments-section"]}>
            <CommentInput image={profile} onSubmit={(message: string) => OnAddComment(message)}/>
            {
                comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment}
                                    OnPostReply={handleCommentReply}
                                    OnPostLiked={handleCommentLiking}
                                    OnPostDisliked={handleCommentDislike}/>
                })
            }
        </section>
    )
}

export default CommentSection;
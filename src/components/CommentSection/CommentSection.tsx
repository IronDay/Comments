import Comment,{CommentInput} from "../Comment";
import useComment from "../../hooks/useComment.ts";
import styles from "./CommentSection.module.css";

import profile from "../../assets/profile.jpg";

const CommentSection = () => {
    const {
        comments, handleCommentUpdate,
        handleCommentDelete, OnAddComment,
        handleCommentReply, handleCommentLiking, handleCommentDislike
    } = useComment();
    return (
        <section className={styles["comments-section"]}>
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

export default CommentSection;
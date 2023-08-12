import profile from "../../assets/react.svg"
import styles from "./Comment.module.css";
import {AiOutlineDislike, AiOutlineEllipsis, AiOutlineLike, AiOutlineRetweet} from "react-icons/ai";
import {BsReplyFill} from "react-icons/bs";
import {useEffect, useRef, useState} from "react";
import {comment} from "../CommentSection/CommentSection.tsx";

interface Props {
    comment: comment,
    OnCommentPost?: (post: comment) => void,
    OnPostLiked?: () => void,
    OnPostDisliked?: () => void,
    OnPostRetweet?: () => void,
}

const Comment = ({comment: {text, likeCount, dislikeCount, retweetCount, author, replies}}: Props) => {
    const [showReply, setShowReply] = useState<boolean>(false);
    /*const [post, setPost] = useState(false);*/
    const replyRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        console.log("Show Reply: ", showReply);
    }, [showReply]);

    return (
        <div className={styles["comments-container"]}>
            <div
                className={[styles["grid"], styles["grid--1x2"], styles["comment"], styles["comment--root"]].join(" ")}>
                <div className={styles["before-comment"]}>
                    <div className={styles["comments__profile"]}><img src={profile} alt=""/></div>
                    <div className={styles["bar"]}></div>
                </div>
                <div className={styles["comment__body"]}>
                    <header className={styles["comment__header"]}>
                            <span>
                                <h4 className={styles["comment__user"]}>{author}</h4>
                                <span className={styles["comment__duration"]}>3h ago</span>
                            </span>
                        <button className={[styles["btn"], styles["comment__option"]].join(" ")}>
                            <AiOutlineEllipsis/>
                        </button>
                    </header>
                    <p className={styles["comment__text"]}>
                        {text}
                    </p>
                    <footer className={styles["comment__footer"]}>
                            <span>
                                <button
                                    className={[styles["btn"], styles["btn--comment"]].join(" ")}><AiOutlineLike/><span
                                    className={styles["like-count"]}>{likeCount}</span></button>
                                <button
                                    className={[styles["btn"], styles["btn--comment"]].join(" ")}><AiOutlineDislike/> <span
                                    className={styles["dislike-count"]}>{dislikeCount}</span></button>
                                <button
                                    className={[styles["btn"], styles["btn--comment"]].join(" ")}><AiOutlineRetweet/><span
                                    className={styles["retweet-count"]}>{retweetCount}</span></button>
                            </span>
                        <button className={[styles["btn"], styles["btn--reply"]].join(" ")}
                                onClick={() => setShowReply(!showReply)}><BsReplyFill/>Reply
                        </button>
                    </footer>
                    <div className={styles["replies"]}>
                        <div
                            className={[styles["comments__input"], styles["reply--input"],
                                showReply ? "" : styles["reply-input--hidden"], styles["grid"], styles["grid--1x2"]].join(" ")}>
                            <div className={styles["comments__profile"]}><img src={profile} alt=""/></div>
                            <div className={styles["reply-block"]}>
                                <input ref={replyRef} className={styles["input"]} type="text"
                                       placeholder="Start the discussion"/>
                                <button onClick={() => {
                                    replies?.push({
                                        id: 1,
                                        text: replyRef.current.value,
                                        author: "Mark Weller",
                                        likeCount: 2,
                                        dislikeCount: 8,
                                        retweetCount: 8
                                    });
                                    setShowReply(!showReply);
                                }}>Post
                                </button>
                            </div>
                        </div>
                        {
                            replies?.map((reply, id) => (
                                <Comment key={id} comment={reply}/>))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;
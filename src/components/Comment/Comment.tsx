import profile from "../../assets/react.svg"
import styles from "./Comment.module.css";
import {AiOutlineDislike, AiOutlineEllipsis, AiOutlineLike, AiOutlineRetweet} from "react-icons/ai";
import {BsReplyFill} from "react-icons/bs";
import {useEffect, useRef, useState} from "react";
import {comment} from "../CommentSection/CommentSection.tsx";
import moment from "moment";

interface Props {
    comment: comment,
    OnDeleteComment?: (id: string | number, idRootComment?: string | number) => void,
    OnCommentPost?: (post: comment) => void,
    OnPostLiked?: (id: string | number, idRootComment?: string | number) => void,
    OnPostDisliked?: (id: string | number, idRootComment?: string | number) => void,
    OnPostRetweet?: () => void,
    OnPostReply?: (id: string | number, reply: string | null) => void
}

const Comment = ({
                     comment: {
                         id,
                         text,
                         likeCount,
                         dislikeCount,
                         retweetCount,
                         author,
                         time,
                         replies
                     }, OnPostLiked, OnPostDisliked, OnPostReply, OnDeleteComment
                 }: Props) => {

    const [showReply, setShowReply] = useState<boolean>(false);
    const [showOptionDropdown, setShowOptionDropdown] = useState<boolean>(false);

    const replyRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    /*useEffect(() => {
        //const target = document.getElementById("#comment__option");
        document.querySelector("*:not(:is(#comment__option-list,#comment__option))")?.addEventListener("click", () => {
            console.log('focus loosed');
        });
    })*/

    useEffect(() => {
        if (text.includes("@")) {
            const start = text.indexOf("@");
            const end = text.indexOf(" ", start);
            const temp = text.substring(start, end);

            textRef.current && (textRef.current.innerHTML =
                text.replace(temp, `<span style="color: #2573ff">${temp}</span>`));
        }
    }, [text]);


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
                                <span className={styles["comment__duration"]}>{moment(time).fromNow()}</span>
                            </span>
                        <div className={styles["comment__option-container"]}>
                            <button id="comment__option" onClick={() => setShowOptionDropdown(!showOptionDropdown)}
                                    className={[styles["btn"], styles["comment__option"]].join(" ")}>
                                <AiOutlineEllipsis/>
                            </button>

                            <div
                                id="#comment__option-list"
                                className={[styles["comment__option-list"],
                                    showOptionDropdown ? styles["option__element-show"] :
                                        styles["option__element-hidden"]].join(" ")}>
                                <button onClick={() => {
                                    OnDeleteComment && OnDeleteComment(id);
                                    setShowOptionDropdown(!showOptionDropdown)
                                }}
                                        className={styles["option__element"]}>Delete
                                </button>
                                <button className={styles["option__element"]}>Edit</button>
                            </div>
                        </div>

                    </header>
                    <p ref={textRef} className={styles["comment__text"]}>
                        {text}
                    </p>
                    <footer className={styles["comment__footer"]}>
                            <span>
                                <button
                                    onClick={() => OnPostLiked && OnPostLiked(id)}
                                    className={[styles["btn"], styles["btn--comment"]].join(" ")}><AiOutlineLike/><span
                                    className={styles["like-count"]}>{(likeCount && likeCount > 0) ? likeCount : ""}</span></button>
                                <button
                                    onClick={() => OnPostDisliked && OnPostDisliked(id)}
                                    className={[styles["btn"], styles["btn--comment"]].join(" ")}><AiOutlineDislike/> <span
                                    className={styles["dislike-count"]}>{(dislikeCount && dislikeCount > 0) ? dislikeCount : ""}</span></button>
                                <button
                                    className={[styles["btn"], styles["btn--comment"]].join(" ")}><AiOutlineRetweet/><span
                                    className={styles["retweet-count"]}>{(retweetCount && retweetCount > 0) ? retweetCount : ""}</span></button>
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
                                       placeholder="Reply to this comment"/>
                                <button onClick={() => {
                                    OnPostReply && OnPostReply(id, replyRef.current && replyRef.current.value);
                                    replyRef.current && (replyRef.current.value = "");
                                    setShowReply(false);
                                }}>Post
                                </button>
                            </div>
                        </div>
                        {
                            replies?.map((reply, index) => {
                                return <Comment key={index} comment={reply}
                                                OnDeleteComment={() => OnDeleteComment && OnDeleteComment(reply.id, id)}
                                                OnPostDisliked={() => OnPostDisliked && OnPostDisliked(reply.id, id)}
                                                OnPostLiked={() => OnPostLiked && OnPostLiked(reply.id, id)}
                                                OnPostReply={(_, rep) =>
                                                    OnPostReply && OnPostReply(id, `${reply.author} ${rep}`)}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;
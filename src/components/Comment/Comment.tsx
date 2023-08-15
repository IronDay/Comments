import styles from "./Comment.module.css";
import {AiOutlineDislike, AiOutlineEllipsis, AiOutlineLike, AiOutlineRetweet} from "react-icons/ai";
import {BsReplyFill} from "react-icons/bs";
import {KeyboardEvent} from "react";
import {Comments} from "../../data/common.types.ts";
import moment from "moment";
import commentUtility from "../../utility/CommentUtility.ts";

interface CommentInputProps {
    profile: string,
    onSubmit: (message: string) => void
}

const CommentInput = ({onSubmit, profile}: CommentInputProps) => {
    const handleCommentSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
        const target = e.currentTarget
        if (e.key === "Enter" && target?.value.length !== 0) {
            onSubmit(target?.value)
        }
    }
    return (
        <div className={[styles["comments__input"], styles["grid"], styles["grid--1x2"]].join(" ")}>
            <div className={styles["comments__profile"]}><img src={profile} alt=""/></div>
            <input className={styles.input} onKeyDown={handleCommentSubmit} type="text"
                   placeholder="Start the discussion"/>
        </div>
    )
}

interface CommentProps {
    comment: Comments,
    OnCommentUpdate?: (id: string | number, newText: string, idRootComment?: string | number) => void,
    OnDeleteComment?: (id: string | number, idRootComment?: string | number) => void,
    OnCommentPost?: (post: Comments) => void,
    OnPostLiked?: (id: string | number, idRootComment?: string | number) => void,
    OnPostDisliked?: (id: string | number, idRootComment?: string | number) => void,
    OnPostRetweet?: () => void,
    OnPostReply?: (id: string | number, idRoot: number | string, reply: string | null) => void
}

const Comment = ({
                     comment: {idRoot, id, text, likeCount, dislikeCount, retweetCount, author, time, hasBeenEdited, replies},
                     OnPostLiked, OnPostDisliked, OnPostReply, OnDeleteComment, OnCommentUpdate
                 }: CommentProps) => {


    //TODO:make sure that the option list is hide when it loses the focus
    /*useEffect(() => {
        //const target = document.getElementById("#comment__option");
        document.querySelector("*:not(:is(#comment__option-list,#comment__option))")?.addEventListener("click", () => {
            console.log('focus loosed');
        });
    })*/

    const {
        setShowOptionDropdown,
        handleUpdate, showOptionDropdown,
        commentTextRef,
        showReply, replyRef, setShowReply,
    } = commentUtility(text, (id: string | number, updatedText: string, idCommentRoot?: string | number) => OnCommentUpdate && OnCommentUpdate(id, updatedText, idCommentRoot));

    return (
        <div className={styles["comments-container"]}>
            <div
                className={[styles["grid"], styles["grid--1x2"], styles["comment"], styles["comment--root"]].join(" ")}>
                <div className={styles["before-comment"]}>
                    <div className={styles["comments__profile"]}><img src={author.profile} alt=""/></div>
                    <div className={styles["bar"]}></div>
                </div>
                <div className={styles["comment__body"]}>
                    <header className={styles["comment__header"]}>
                            <span>
                                <h4 className={styles["comment__user"]}>{author.pseudo}</h4>
                                <span id="comment__duration"
                                      className={styles["comment__duration"]}>{moment(time).fromNow()}</span>
                                {hasBeenEdited && <span className={styles["comment__duration"]}> (edited)</span>}
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
                                <button className={styles["option__element"]}
                                        onClick={() => {
                                            OnDeleteComment && OnDeleteComment(id, idRoot);
                                            setShowOptionDropdown(!showOptionDropdown)
                                        }}>Delete
                                </button>
                                <button onClick={() => handleUpdate(id, idRoot)}
                                        className={styles["option__element"]}>Edit
                                </button>
                            </div>
                        </div>

                    </header>
                    <p ref={commentTextRef} className={styles["comment__text"]}>
                        {text}
                    </p>
                    <footer className={styles["comment__footer"]}>
                            <span className={styles["comment__appreciation"]}>
                                <button
                                    onClick={() => OnPostLiked && OnPostLiked(id, idRoot)}
                                    className={[styles["btn"], styles["btn--comment"]].join(" ")}><AiOutlineLike/><span
                                    className={styles["like-count"]}>{(likeCount && likeCount > 0) ? likeCount : ""}</span></button>
                                <button
                                    onClick={() => OnPostDisliked && OnPostDisliked(id, idRoot)}
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
                            <div className={styles["comments__profile"]}><img src={author.profile} alt=""/></div>
                            <div className={styles["reply-block"]}>
                                <input ref={replyRef} className={styles["input"]} type="text"
                                       placeholder="Reply to this comment"/>
                                <button onClick={() => {
                                    OnPostReply && OnPostReply(id, idRoot, replyRef.current && replyRef.current.value);
                                    replyRef.current && (replyRef.current.value = "");
                                    setShowReply(false);
                                }}>Post
                                </button>
                            </div>
                        </div>
                        {
                            /*The below modifications of the callbacks are necessary to avoid to call a double function reference inside the reply of comment's reply*/
                            replies?.map((reply, index) => {
                                return <Comment key={index} comment={reply}
                                                OnCommentUpdate={(id, newText, idRootComment) => OnCommentUpdate && OnCommentUpdate(id, newText, idRootComment)}
                                                OnDeleteComment={() => OnDeleteComment && OnDeleteComment(reply.id, reply.idRoot)}
                                                OnPostDisliked={(id, idRootComment) => OnPostDisliked && OnPostDisliked(id, idRootComment)}
                                                OnPostLiked={(id, idRootComment) => OnPostLiked && OnPostLiked(id, idRootComment)}
                                                OnPostReply={(id, idRoot, rep) => OnPostReply && OnPostReply(id, idRoot, `<span>${reply.author.pseudo}</span> ${rep}`)}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;
export {CommentInput};

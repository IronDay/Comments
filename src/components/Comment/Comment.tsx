import profile from "../../assets/react.svg"
import styles from "./Comment.module.css";
import {AiOutlineDislike, AiOutlineEllipsis, AiOutlineLike, AiOutlineRetweet} from "react-icons/ai";
import {BsReplyFill} from "react-icons/bs";

interface Props {
    comment: {
        id: number,
        body: string,
    }
}

const Comment = () => {
    return (
        <div className={styles["comments-container"]}>
            <div
                className={[styles["grid"], styles["grid--1x2"], styles["comment"], styles["comment--root"]].join(" ")}>
                <div className={styles["before-comment"]}>
                    <img className={styles["comments__profile"]} src={profile} alt=""/>
                    <div className={styles["bar"]}></div>
                </div>
                <div className={styles["comment__body"]}>
                    <header className={styles["comment__header"]}>
                            <span>
                                <h4 className={styles["comment__user"]}>Bessie Cooper</h4>
                                <span className={styles["comment__duration"]}>3h ago</span>
                            </span>
                        <button className={[styles["btn"], styles["comment__option"]].join(" ")}>
                            <AiOutlineEllipsis/>
                        </button>
                    </header>
                    <p className={styles["comment__text"]}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus suscipit libero dolorem
                        incidunt eligendi. Numquam explicabo sunt fuga quis a.
                    </p>
                    <footer className={styles["comment__footer"]}>
                            <span>
                                <button className={[styles["btn"], styles["btn--comment"]].join(" ")}><AiOutlineLike/><span
                                    className={styles["like-count"]}>5</span></button>
                                <button
                                    className={[styles["btn"], styles["btn--comment"]].join(" ")}><AiOutlineDislike/> <span
                                    className={styles["dislike-count"]}>9</span></button>
                                <button
                                    className={[styles["btn"], styles["btn--comment"]].join(" ")}><AiOutlineRetweet/><span
                                    className={styles["retweet-count"]}>6</span></button>
                            </span>
                        <button className={[styles["btn"], styles["btn--reply"]].join(" ")}><BsReplyFill/>Reply</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Comment;
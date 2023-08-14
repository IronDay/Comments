import styles from './CommentInput.module.css';
import profile from "../../assets/profile.jpg";
import React from "react";

interface Props {
    image: string,
    onSubmit: (message: string) => void
}

const CommentInput = ({onSubmit}: Props) => {
    const handleCommentSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.currentTarget
        if (e.key === "Enter" && target?.value.length !== 0) {
            onSubmit(target?.value)
        }
    }
    return (
        <div className={[styles["comments__input"], styles["grid"], styles["grid--1x2"]].join(" ")}>
            <div className={styles["comments__profile"]}><img src={profile} alt=""/></div>
            <input className={styles.input} onKeyPress={handleCommentSubmit} type="text"
                   placeholder="Start the discussion"/>
        </div>
    )
}

export default CommentInput;
import styles from './CommentInput.module.css';
import profile from "../../assets/profile.jpg";

interface Props {
    image: string,
    onSubmit: (message: string) => void
}

const CommentInput = ({image, onSubmit}: Props) => {
    return (
        <div className={[styles["comments__input"], styles["grid"], styles["grid--1x2"]].join(" ")}>
            <div className={styles["comments__profile"]}><img src={profile} alt=""/></div>
            <input className={styles.input} onKeyPress={(e) => {
                if (e.key === "Enter" && e.target.value.length !== 0) {
                    onSubmit(e.target.value)
                }
            }} type="text"
                   placeholder="Start the discussion"/>
        </div>
    )
}

export default CommentInput;
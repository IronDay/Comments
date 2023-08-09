import styles from './CommentInput.module.css';

interface Props {
    image: string,
    onSubmit: (message: string) => void
}

const CommentInput = ({image}: Props) => {
    return (
        <div className={[styles["comments__input"], styles["grid"], styles["grid--1x2"]].join(" ")}>
            <img className={styles["comments__profile"]} src={image} alt=""/>
            <input className={styles.input} type="text" placeholder="Start the discussion"/>
        </div>
    )
}

export default CommentInput;
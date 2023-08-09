import CommentInput from "../CommentInput";
import profile from "../../assets/profile.jpg";
import styles from "./CommentSection.module.css";

const CommentSection = () => {
    return (
        <section className={styles["comments-section"]}>
            <CommentInput image={profile} onSubmit={() => console.log('submitted')}/>
        </section>
    )
}

export default CommentSection;
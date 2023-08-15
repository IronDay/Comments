import {useEffect, useRef, useState} from "react";

const CommentUtility = (text: string, OnCommentUpdate?: (id: string | number, updatedText: string, idCommentRoot?: string | number) => void) => {
    const [showReply, setShowReply] = useState<boolean>(false);
    const [showOptionDropdown, setShowOptionDropdown] = useState<boolean>(false);

    const replyRef = useRef<HTMLInputElement>(null);
    const commentTextRef = useRef<HTMLParagraphElement>(null);

    /*This effect is used to add a color to the username(e.g @sully) in a comment*/
    useEffect(() => {
        if (text.includes("@")) {
            const start = text.indexOf("@");
            const end = text.indexOf(" ", start);
            let temp = text.substring(start, end);

            if (end === -1) {
                temp = text.substring(start, text.length);
            }
            commentTextRef.current && (commentTextRef.current.innerHTML =
                text.replace(temp, `<span style="color: #2573ff">${temp}</span>`));
        }
    }, [text]);


    /*this function is responsible to turn the <p> of comment text into a <textarea> to update the comment*/
    const handleUpdate = (id: string | number, idCommentRoot?: string | number) => {
        const textArea = document.createElement("textarea");
        textArea.style.width = "29.9rem";
        textArea.style.fontFamily = "Inter,sans-serif";

        const p = document.createElement("p");

        if (commentTextRef.current) {
            textArea.value = commentTextRef.current.innerText;
            commentTextRef.current.replaceChildren(textArea);
        }

        setShowOptionDropdown(!showOptionDropdown);

        textArea.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                OnCommentUpdate && OnCommentUpdate(id, textArea.value, idCommentRoot);
                p.innerText = textArea.value;
                commentTextRef.current && commentTextRef.current.replaceChildren(p);
            }
        });
    }

    return {
        replyRef, commentTextRef, showReply,
        showOptionDropdown, setShowReply, setShowOptionDropdown, handleUpdate
    }
}

export default CommentUtility;

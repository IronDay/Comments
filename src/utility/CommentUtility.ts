import {useEffect, useRef, useState} from "react";

const CommentUtility = (text: string, OnCommentUpdate?: (id: string | number, updatedText: string, idCommentRoot?: string | number) => void) => {
    const [showReply, setShowReply] = useState<boolean>(false);
    const [showOptionDropdown, setShowOptionDropdown] = useState<boolean>(false);

    const replyRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    //const dep = textRef.current && textRef.current.innerText;
    useEffect(() => {
        if (text.includes("@")) {
            const start = text.indexOf("@");
            const end = text.indexOf(" ", start);
            let temp = text.substring(start, end);

            if (end === -1) {
                temp = text.substring(start, text.length);
            }
            textRef.current && (textRef.current.innerHTML =
                text.replace(temp, `<span style="color: #2573ff">${temp}</span>`));
        }
    }, [text]);


    const handleUpdate = (id: string | number, idCommentRoot?: string | number) => {
        console.log('id: ', id, 'idCommentRoot: ', idCommentRoot);
        const textArea = document.createElement("textarea");
        textArea.style.width = "29.9rem";
        textArea.style.fontFamily = "Inter,sans-serif";

        const p = document.createElement("p");

        if (textRef.current) {
            textArea.value = textRef.current.innerText;
            textRef.current.replaceChildren(textArea);
        }

        setShowOptionDropdown(!showOptionDropdown);

        textArea.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                OnCommentUpdate && OnCommentUpdate(id, textArea.value, idCommentRoot);
                p.innerText = textArea.value;
                textRef.current && textRef.current.replaceChildren(p);
            }
        });
    }

    return {replyRef, textRef, showReply, showOptionDropdown, setShowReply, setShowOptionDropdown, handleUpdate}
}

export default CommentUtility;

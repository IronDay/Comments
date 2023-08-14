import {useState} from "react";
import {v4 as uuid} from "uuid";

import {Comments} from "../data/common.types.ts";
import profile from "../assets/profile.jpg";

const useComment = () => {
    const [comments, setComments] = useState<Comments[]>([] as Comments[]);
    const OnAddComment = (comment_text: string) => {
        setComments([{
            id: uuid(),
            idRoot: uuid(),
            isRoot: true,
            time: new Date().toISOString(), author: {name: "Margaret Simmons", pseudo: "@Simons", profile: profile},
            text: comment_text
        }, ...comments]);
    }

    const handleCommentUpdate = (id: string | number, newText: string, idRootComment?: string | number): void => {
        console.log("id:", id, "idRoot:", idRootComment, "reply:", newText);
        let comment = comments.find((comment) => comment.id === id);
        if (comment) {
            comment.text = newText;
            comment.hasBeenEdited = true;
            setComments([...comments]);
        } else {
            comment = comments.find((comment) => comment.idRoot === idRootComment);
            if (comment) {
                const temp = comment.replies?.find((reply) => reply.id === id)
                console.log("temp", temp);
                if (temp) {
                    temp.text = newText;
                    temp.hasBeenEdited = true;
                    setComments([...comments]);
                    console.log("comment", comment);
                }
            }
        }
    }

    const handleCommentDelete = (id: string | number, idRootComment?: string | number) => {
        let comment = comments.find((comment) => comment.id === id);
        if (comment) {
            setComments(comments.filter((comment) => comment.id !== id));
        } else {
            comment = comments.find((comment) => comment.idRoot === idRootComment);
            if (comment) {
                comment.replies = comment.replies?.filter((reply) => reply.id !== id);
                setComments([...comments])
            }
        }
    }

    const handleCommentLiking = (id: string | number, idRootComment?: string | number) => {
        console.log("id:", id, "idRoot:", idRootComment);
        let comment = comments.find((comment) => comment.id === id);
        if (comment) {
            comment.likeCount ?
                comment.likeCount += 1 : comment.likeCount = (comment.likeCount = 0) + 1;
        } else {
            comment = comments.find((comment) => comment.idRoot === idRootComment)
                ?.replies?.find((reply) => reply.id == id);
            if (comment)
                comment?.likeCount ? comment.likeCount += 1 : comment.likeCount = (comment.likeCount = 0) + 1;
        }
        setComments([...comments]);
    }

    const handleCommentDislike = (id: string | number, idRootComment?: string | number) => {
        let comment = comments.find((comment) => comment.id === id);
        if (comment) {
            comment.dislikeCount ?
                comment.dislikeCount += 1 : comment.dislikeCount = (comment.dislikeCount = 0) + 1;
        } else {
            comment = comments.find((comment) => comment.idRoot === idRootComment)
                ?.replies?.find((reply) => reply.id == id);
            if (comment)
                comment?.dislikeCount ? comment.dislikeCount += 1 : comment.dislikeCount = (comment.dislikeCount = 0) + 1;
        }
        setComments([...comments]);
    }

    const handleCommentReply = (_id: number | string, idRoot: number | string, reply: string | null) => {
        const comment = comments.find((comment) => comment.idRoot === idRoot);
        if (comment && reply) {
            setComments(comments.map((comment) => (
                comment.idRoot === idRoot ?
                    {
                        ...comment,
                        replies: comment.replies ? [{
                                idRoot: idRoot, id: uuid(), isRoot: false, author: {name: "Jake Wood", pseudo: "@Jake", profile: profile},
                                text: reply, time: new Date().toISOString()
                            },
                                ...comment.replies,
                            ] :
                            [{
                                idRoot: idRoot, id: uuid(), isRoot: false, author: {name: "Jake Wood", pseudo: "@Jake", profile: profile},
                                text: reply, time: new Date().toISOString()
                            }]
                    }
                    : comment)));
        }
    }


    return {
        comments, OnAddComment, handleCommentUpdate,
        handleCommentDelete, handleCommentLiking, handleCommentReply, handleCommentDislike
    };
}

export default useComment;
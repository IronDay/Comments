import profile from "../assets/profile.jpg";
import react from "../assets/react.svg";
import {Comments} from "./common.types.ts";

const now = new Date();
const Comments: Comments[] = [
    {
        id: 1,
        isRoot:true,
        time:now.toISOString(),
        idRoot: 8,
        author: {
            name: "John G. Weller",
            pseudo: "@Ironday",
            profile: profile
        },
        text: "Nice to have the new book on spring security published",
        likeCount: 5,
        dislikeCount: 2,
        retweetCount: 4,
        replies: [] as Comments[]
    },
    {
        id: 2,
        idRoot: 9,
        isRoot:true,
        time:now.toISOString(),
        author: {
            name: "Mark Weller",
            pseudo: "@Markday",
            profile: react
        },
        text: "Likely that you will be on top position next year to win the price",
        likeCount: 14,
        dislikeCount: 1,
        retweetCount: 25,
        replies: [
            {
                id: 23,
                idRoot: 9,
                isRoot:false,
                time:now.toISOString(),
                author: {
                    name: "Sullyvane Weller",
                    pseudo: "@Sully",
                    profile: profile
                },
                text: "I'm just a girl willing to be with a boy",
                likeCount: 26,
                dislikeCount: 6,
                retweetCount: 10,
                replies: [] as Comments[]
            },
            {
                id: 24,
                idRoot: 9,
                isRoot:false,
                time:now.toISOString(),
                author: {
                    name: "Barbara",
                    pseudo: "@Bar",
                    profile: react
                },
                text: "@Sully Just remember that your dad is not Ok with that",
                likeCount: 26,
                dislikeCount: 6,
                retweetCount: 10,
                replies: [] as Comments[]
            }
        ]
    },
    {
        id: 3,
        idRoot:10,
        isRoot:true,
        time:now.toISOString(),
        author: {
            name: "Sullyvane Weller",
            pseudo: "@Sully",
            profile: react
        },
        text: "I'm just a girl willing to be with a boy",
        likeCount: 26,
        dislikeCount: 6,
        retweetCount: 10,
        replies: [] as Comments[]
    },
    {
        id: 4,
        idRoot:11,
        isRoot:true,
        time:now.toISOString(),
        author: {
            name: "Barbara Weller",
            pseudo: "@Bar",
            profile: react
        },
        text: "Love you sweet heart. Just be back at home before the dinner",
        likeCount: 20,
        dislikeCount: 12,
        retweetCount: 41,
        replies: [] as Comments[]
    }
];

export default Comments;
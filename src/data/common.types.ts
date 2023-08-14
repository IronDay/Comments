export interface Users {
    name: string,
    pseudo: string,
    profile: string
}

export interface Comments {
    id: number | string,
    idRoot: number | string,
    isRoot:boolean,
    text: string,
    author: Users,
    hasBeenEdited?: boolean,
    time: string,
    likeCount?: number,
    dislikeCount?: number,
    retweetCount?: number,
    replies?: Comments[]
}
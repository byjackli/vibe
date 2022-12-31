export type SongDetails = {
    songid: string,
    title: string,
    artists: string[],
    image: string,
}

export type CardDetails = {
    songDetails: SongDetails,
    trackPosition: number,
}
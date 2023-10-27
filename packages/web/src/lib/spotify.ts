const spotifyGenres = [
    "alt-rock",
    "alternative",
    "anime",
    "bluegrass",
    "blues",
    "breakbeat",
    "club",
    "country",
    "dance",
    "dancehall", ,
    "disco",
    "drum-and-bass",
    "dubstep",
    "funk",
    "grunge",
    "hard-rock",
    "heavy-metal",
    "hip-hop",
    "house",
    "indie",
    "indie-pop",
    "jazz",
    "latino",
    "metal",
    "new-release",
    "party",
    "punk",
    "punk-rock",
    "r-n-b",
    "reggae",
    "reggaeton",
    "rock",
    "rock-n-roll",
    "soul",
    "synth-pop",
    "techno",
    "trance",
    "trip-hop",
]

export const genres: Genre[] = spotifyGenres.map(g => {
    const words = g.split("-")
    const labelWords = words.map(w => capitalizeFirstLetter(w))
    const label = labelWords.join(" ")
    return {
        label: label,
        value: g
    }
})

function capitalizeFirstLetter(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export type Genre = {
    value: string
    label: string
}

export type Era = {
    from: number
    to: number
    value: string
    label: string
}

export const eras: Era[] = [
    { from: 1950, to: 1959, value: "1950s", label: "50s" },
    { from: 1960, to: 1969, value: "1960s", label: "60s" },
    { from: 1970, to: 1979, value: "1970s", label: "70s" },
    { from: 1980, to: 1989, value: "1980s", label: "80s" },
    { from: 1990, to: 1999, value: "1990s", label: "90s" },
    { from: 2000, to: 2009, value: "2000s", label: "00s" },
    { from: 2010, to: 2019, value: "2010s", label: "2010s" },
    { from: 2020, to: 2029, value: "2020s", label: "2020s" },
]
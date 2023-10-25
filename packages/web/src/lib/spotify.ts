
const scopes = [
    "user-read-email",
    "user-read-email",
    "streaming",
].join(",")

const params = {
    scope: scopes
}

const queryParamString = new URLSearchParams(params);
export const LOGIN_URL = `https://accounts.spotify.com/authorize?` + queryParamString.toString();



const spotifyGenres = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"]

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
import { createContext, useState, ReactNode, useContext } from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (estate: boolean) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPervious: boolean;
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    const hasPervious = currentEpisodeIndex > 0
    const hasNext = (currentEpisodeIndex + 1) < episodeList.length

    function playNext() {
        if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
    }

    function playPrevious() {
        if (hasPervious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }


    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                playNext,
                playPrevious,
                playList,
                isPlaying,
                togglePlay,
                setPlayingState,
                hasNext,
                hasPervious,
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}
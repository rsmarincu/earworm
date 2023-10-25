import useSpotify from '@/hooks/useSpotify';
import { Fragment, useState } from 'react';
import { Genre, genres, Era, eras } from '@/lib/spotify';
import { Listbox, Transition } from '@headlessui/react'
import { ChevronsUpDownIcon, CheckIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import { Button } from './ui/button';
import useGame from '@/providers/game';



const Controls: React.FC = () => {
    const { toast } = useToast()
    const game = useGame()

    const [selectedGenres, setGenres] = useState<Array<Genre>>([genres[0]])
    const [selectedEras, setEras] = useState<Array<Era>>([eras[0]])

    function onPlay(): void {
        const from = selectedEras.reduce(function (prev, current) {
            return (prev && prev.from < current.from) ? prev : current
        })
        const to = selectedEras.reduce(function (prev, current) {
            return (prev && prev.to > current.to) ? prev : current
        })

        console.log(from.from, " - ", to.to)

    }


    return (
        <div className="flex flex-col space-y-4">
            <div className='flex justify-between space-x-4 text-input'>
                <div className='w-72'>
                    <Listbox value={selectedGenres} onChange={(value) => {
                        if (value.length <= 3) {
                            setGenres(value)
                        } else {
                            toast({
                                title: "Genres",
                                description: "You can only select a maximum of 3 genres."
                            })
                        }
                    }} multiple>
                        <div className="relative mt-1 ">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">{selectedGenres.map((genre) => genre.label).join(", ")}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronsUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {genres.map((genre) => (
                                        <Listbox.Option key={genre.value} value={genre} className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }>
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {genre.label}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>

                        </div>
                    </Listbox>
                </ div >
                <div className='w-72'>
                    <Listbox value={selectedEras} onChange={(value) => {
                        if (value.length <= 3) {
                            setEras(value)
                        } else {
                            toast({
                                title: "Eras",
                                description: "You can only select a maximum of 3 eras."
                            })
                        }
                    }} multiple>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">{selectedEras.map((era) => era.label).join(", ")}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronsUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {eras.map((era) => (
                                        <Listbox.Option key={era.value} value={era} className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }>
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {era.label}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>

                        </div>
                    </Listbox>
                </ div >
            </div>
            <div className="flex justify-center">

                <Button variant={"default"} onClick={onPlay} className='w-fit'>Play</Button>
            </div>
        </div>
    )
}

export default Controls
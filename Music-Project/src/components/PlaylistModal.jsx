import React, {useState} from 'react';
import {songsData} from '../assets/assets';

const PlaylistModal = ({isOpen, onClose, onSave}) => {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistImage, setPlaylistImage] = useState(null);
    const [selectedSongs, setSelectedSongs] = useState([]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPlaylistImage(URL.createObjectURL(file)); //local preview of the img
        }
    };

    const handleSongSelection = (id) => {
        setSelectedSongs((prev) => 
            prev.includes(id) ? prev.filter((songId) => songId !== id) : [...prev, id]
        );
    };

    const handleSubmit = () => {
        if (!playlistName || selectedSongs.length === 0) {
            alert('Please enter a name and select at least one song.');
            return;
        }
        onSave({
            name: playlistName,
            image: playlistImage,
            songs: selectedSongs,
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-10  bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-6 w-[90%] max-w-md text-black rounded-xl shadow-xl animate-fadeIn' >
                <button className='absolute top-3 right-3 text-gray-500 hover:text-black transition-all duration-200' onClick={onClose} > &times;</button>
                <h2 className='text-2xl font-bold mb-4'>Create Playlist</h2>
                <div className='mb-4'>
                    <label className='block font-bold mb-1'>Playlist Name</label>
                    <input
                        type='text'
                        className='w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold mb-1'>Playlist Image</label>
                    <input
                        type='file'
                        accept='image/*'
                        className='w-full p-2 border rounded-md'
                        onChange={handleImageUpload}
                    />
                    {playlistImage && (
                        <img
                            src={playlistImage}
                            alt='Playlist Preview'
                            className='m-4 w-32 h-32 object-cover rounded-md shadow-lg'
                        />
                    )}
                </div>
                <div className='mb-4'>
                    <label className='block font-bold mb-1'>Add Songs</label>
                    <div className ='h-40 overflow-y-scroll border rounded-md p-2 bg-gray-50'>
                        {songsData.map((song) => (
                            <div key={song.id} className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-all'>
                                <input
                                    type='checkbox'
                                    checked={selectedSongs.includes(song.id)}
                                    onChange={() => handleSongSelection(song.id)}
                                />
                                <p>{song.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex justify-end gap-4'>
                        <button className='px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-all' onClick={onClose}>
                            Cancel
                        </button>
                        <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all' onClick={handleSubmit}>
                            Save
                        </button>
                </div>
            </div> 
        </div>
    );
}
export default PlaylistModal
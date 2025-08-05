import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../../config'
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../reducers/user';

const Gallery = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    useEffect(() => {
        if (user.language === undefined) {
            dispatch(setLanguage(false));
        }
    }, [dispatch, user.language]);
    const isEnglish = !!user.language;

    // Fetch images from API
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}gallery`);
                const formattedImages = (response.data || []).flatMap(item => 
                    (item.media || [])
                        .filter(mf => mf.image_url && mf.image_url.full && mf.image_url.full.high_res)
                        .map(mf => ({
                            src: `${API_BASE_URL}${mf.image_url.full.high_res}`,
                            alt: mf.name?.original || (isEnglish ? 'Gallery Image' : 'ಗ್ಯಾಲರಿ ಚಿತ್ರ')
                        }))
                );
                // Limit to 6 images
                setImages(formattedImages.slice(0, 6));
            } catch (error) {
                console.error("Failed to fetch gallery images:", error);
            }
        };
        fetchImages();
    }, [isEnglish]);

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
                {/* Left: Heading, Description, View More */}
                <div className="md:w-1/3 w-full flex flex-col items-start justify-center mb-6 md:mb-0">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{isEnglish ? 'Gallery' : 'ಗ್ಯಾಲರಿ'}</h2>
                    <p className="text-gray-600 mb-6">{isEnglish ? "Explore moments from our community's events, activities, and celebrations. Our gallery captures the spirit and togetherness of our members." : "ನಮ್ಮ ಸಮುದಾಯದ ಕಾರ್ಯಕ್ರಮಗಳು, ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಹಬ್ಬಗಳ ಕ್ಷಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ನಮ್ಮ ಗ್ಯಾಲರಿ ಸದಸ್ಯರ ಒಗ್ಗಟ್ಟನ್ನು ಮತ್ತು ಆತ್ಮೀಯತೆಯನ್ನು ಹಿಡಿದಿಟ್ಟಿದೆ."}</p>
                    <a
                        onClick={() => navigate('/gallery')}
                        className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all duration-200 text-sm cursor-pointer"
                    >
                        {isEnglish ? 'View More >' : 'ಮತ್ತಷ್ಟು ನೋಡಿ >'}
                    </a>
                </div>
                {/* Right: Image Grid */}
                <div className="md:w-2/3 w-full">
                    {/* Image Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {images.map((image, index) => (
                            <a key={index} className="group block relative overflow-hidden rounded-lg">
                                <img 
                                    className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" 
                                    src={image.src} 
                                    alt={image.alt} 
                                />
                            </a>
                        ))}
                    </div>
                    {/* End Image Grid */}
                </div>
            </div>
        </div>
    )
}

export default Gallery

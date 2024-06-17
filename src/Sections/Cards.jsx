import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { FreeMode, Scrollbar } from 'swiper/modules';
import Feedback from '../Components/Feedback';
import Report from '../Sections/Report';

const Cards = ({ events, withSlider, horizontal }) => {
    const [eventsState, setEventsState] = useState([]);
    const [eventWithOpenReport, setEventWithOpenReport] = useState(null);

    useEffect(() => {
        setEventsState(events);
    }, [events]);

    const handleSaveChange = (eventId, newSavedValue) => {
        setEventsState(prevEvents =>
            prevEvents.map(event =>
                event._id === eventId ? { ...event, isSaved: newSavedValue } : event
            )
        );
        // Implement save functionality here if needed
    };

    const renderEventImage = (imageData) => {
        if (typeof imageData === 'string' && imageData.startsWith('/9j/')) {
            return <img src={`data:image/jpeg;base64,${imageData}`} alt="Event" className='mt-6 rounded-lg' />;
        } else {
            return <div className='mt-6 rounded-lg bg-gray-200 text-center py-14'>Image not available</div>;
        }
    };

    const handleReportClose = () => {
        setEventWithOpenReport(null);
    };

    if (!eventsState || eventsState.length === 0) {
        return <div>No events available</div>;
    }

    if (withSlider) {
        return (
            <>
                <div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        freeMode={true}
                        scrollbar={{ draggable: true, enabled: true }}
                        modules={[FreeMode, Scrollbar]}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            768: { slidesPerView: 3, spaceBetween: 40 },
                            1024: { slidesPerView: 4, spaceBetween: 50 },
                        }}
                    >
                        {eventsState.slice(0, 5).map((event, index) => (
                            <SwiperSlide key={index}>
                                <div className='mx-auto w-[400px] h-[520px] sm:w-[300px] sm:h-[460px] md:w-[240px] md:h-[440px] xl:w-[280px]'>
                                    <div className="bg-white shadow-md rounded-lg py-6 px-4 hover:shadow-lg duration-300">
                                        <Link to={`/event/${event._id}`}>
                                            <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
                                            <p className="truncate text-[#2B2118]">{event.description}</p>
                                            <p className='text-[#2B2118] text-sm mt-4'>{new Date(event.date).toLocaleDateString()}</p>
                                            <p className='text-[#2B2118] text-sm'>{event.price}</p>
                                            {renderEventImage(event.image)}
                                        </Link>
                                        <Feedback
                                            rating={event.rating}
                                            isSaved={event.isSaved}
                                            onSaveChange={(newSavedValue) => handleSaveChange(event._id, newSavedValue)}
                                            onReport={() => setEventWithOpenReport(event)}
                                            eventId={event._id}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {eventWithOpenReport && (
                    <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-90 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-md w-full max-w-lg mx-auto">
                            <h2 className="text-2xl font-bold mb-4">Report Event</h2>
                            <Report
                                onSubmit={() => {
                                    alert('Report submitted successfully');
                                    setEventWithOpenReport(null);
                                }}
                                onClose={handleReportClose}
                                eventId={eventWithOpenReport._id}
                            />
                        </div>
                    </div>
                )}
            </>
        );
    } else if (horizontal) {
        return (
            <>
                <Link to={`/event/${eventsState._id}`}>
                    <div className="bg-white shadow-md rounded-lg p-4 mb-8 flex items-center hover:shadow-lg duration-300">
                        <div className='w-1/3'>
                            {renderEventImage(eventsState.image)}
                        </div>
                        <div className='ml-14 w-2/3'>
                            <h2 className="text-lg font-semibold mb-2">{eventsState.title}</h2>
                            <p className="truncate text-[#2B2118]">{eventsState.description}</p>
                            <p className='text-[#2B2118] text-sm mt-4'>{new Date(eventsState.date).toLocaleDateString()}</p>
                            <p className='text-[#2B2118] text-sm'>{eventsState.price}</p>
                            <Feedback
                                rating={eventsState.rating}
                                isSaved={eventsState.isSaved}
                                onSaveChange={(newSavedValue) => handleSaveChange(eventsState._id, newSavedValue)}
                                onReport={() => setEventWithOpenReport(eventsState)}
                                eventId={eventsState._id}
                            />
                        </div>
                    </div>
                </Link>
                {eventWithOpenReport && (
                    <Report
                        onSubmit={() => {
                            alert('Report submitted successfully');
                            setEventWithOpenReport(null);
                        }}
                        onClose={handleReportClose}
                        eventId={eventWithOpenReport._id}
                    />
                )}
            </>
        );
    } else {
        return (
            <>
                <div className="bg-white shadow-md rounded-lg py-6 px-4 hover:shadow-lg duration-300">
                    <Link to={`/event/${eventsState._id}`}>
                        <h2 className="text-lg font-semibold mb-2">{eventsState.title}</h2>
                        <p className="truncate text-[#2B2118]">{eventsState.description}</p>
                        <p className='text-[#2B2118] text-sm mt-4'>{new Date(eventsState.date).toLocaleDateString()}</p>
                        <p className='text-[#2B2118] text-sm'>{eventsState.price}</p>
                        {renderEventImage(eventsState.image)}
                    </Link>
                    <Feedback
                        rating={eventsState.rating}
                        isSaved={eventsState.isSaved}
                        onSaveChange={(newSavedValue) => handleSaveChange(eventsState._id, newSavedValue)}
                        onReport={() => setEventWithOpenReport(eventsState)}
                        eventId={eventsState._id}
                    />
                </div>
                {eventWithOpenReport && (
                    <Report
                        onSubmit={() => {
                            alert('Report submitted successfully');
                            setEventWithOpenReport(null);
                        }}
                        onClose={handleReportClose}
                        eventId={eventWithOpenReport._id}
                    />
                )}
            </>
        );
    }
};

export default Cards;

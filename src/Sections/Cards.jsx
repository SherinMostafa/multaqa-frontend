import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { FreeMode, Scrollbar } from 'swiper/modules';
import Feedback from '../Components/Feedback';
import Report from '../Sections/Report';

const Cards = ({ events, withSlider, horizontal, horizontalOrganizer }) => {
    const [eventsState, setEventsState] = useState([]);
    const [eventWithOpenReport, setEventWithOpenReport] = useState(null);
    const [savedEvents, setSavedEvents] = useState(() => {
        const storedEvents = JSON.parse(localStorage.getItem('savedEvents')) || [];
        return storedEvents;
    });

    useEffect(() => {
        if (Array.isArray(events)) {
            setEventsState(events.map(event => ({
                ...event,
                isSaved: savedEvents.includes(event._id)  // Check if event is saved
            })));
        } else if (events) {
            setEventsState([{ ...events, isSaved: savedEvents.includes(events._id) }]);
        }
    }, [events, savedEvents]);

    const handleSaveChange = (eventId, newSavedValue) => {
        setEventsState(prevEvents => {
            if (Array.isArray(prevEvents)) {
                return prevEvents.map(event =>
                    event._id === eventId ? { ...event, isSaved: newSavedValue } : event
                );
            } else {
                return { ...prevEvents, isSaved: newSavedValue };
            }
        });

        setSavedEvents(prevSavedEvents => {
            if (newSavedValue) {
                return [...prevSavedEvents, eventId];
            } else {
                return prevSavedEvents.filter(id => id !== eventId);
            }
        });
    };

    const renderEventImage = (imageData) => {
        if (typeof imageData === 'string' && imageData.startsWith('/9j/')) {
            return <img src={`${imageData}`} alt="Event" className='mt-6 rounded-lg' />;
        } else {
            return <div className='mt-6 rounded-lg bg-gray-200 text-center py-14'>Image not available</div>;
        }
    };

    const handleReportClose = () => {
        setEventWithOpenReport(null);
    };

    // Update local storage when savedEvents state changes
    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    }, [savedEvents]);

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
                                        <Link to={`/Event/${event._id}`}>
                                            <h2 className="truncate text-lg font-semibold mb-2">{event.title}</h2>
                                            <p className="truncate text-[#2B2118]">{event.description}</p>
                                            <p className='text-[#2B2118] text-sm mt-4'>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - {event.time}</p>
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
            <div className="bg-white shadow-md rounded-lg py-6 px-4 hover:shadow-lg duration-300 flex items-center">
                <div className='w-1/3'>
                    {renderEventImage(eventsState[0].image)}
                </div>
                <div className='ml-4 flex-1'>
                    <Link to={`/Event/${eventsState[0]._id}`}>
                        <h2 className="truncate text-lg font-semibold mb-2">{eventsState[0].title}</h2>
                        <p className="truncate">{eventsState[0].description}</p>
                        <p className='text-sm mt-2'>{new Date(eventsState[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - {eventsState[0].time}</p>
                        <p className='text-sm'>{eventsState[0].price}</p>
                    </Link>
                    <Feedback
                        rating={eventsState[0].rating}
                        isSaved={eventsState[0].isSaved}
                        onSaveChange={(newSavedValue) => handleSaveChange(eventsState[0]._id, newSavedValue)}
                        onReport={() => setEventWithOpenReport(eventsState[0])}
                        eventId={eventsState[0]._id}
                    />
                </div>
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
    } else if (horizontalOrganizer) {
        return (
            <>
            <div className="bg-white shadow-md rounded-lg py-6 px-4 hover:shadow-lg duration-300 flex items-center">
                <div className='w-1/3'>
                    {renderEventImage(eventsState[0].image)}
                </div>
                <div className='ml-4 flex-1'>
                    <Link to={`/Event/${eventsState[0]._id}`}>
                        <div className='flex justify-between'>
                            <div>
                                <h2 className="truncate text-lg font-semibold mb-2">{eventsState[0].title}</h2>
                                <p className="truncate">{eventsState[0].description}</p>
                                <p className='text-sm mt-2'>{new Date(eventsState[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - {eventsState[0].time}</p>
                                <p className='text-sm'>{eventsState[0].price}</p>
                            </div>
                            <div>
                            <h2 className="truncate text-lg font-semibold mb-2">{eventsState[0].availableTickets}</h2>
                                <p className="truncate">{eventsState[0].soldTickets}</p>
                                <p className='text-sm'>{eventsState[0].orgRevenue}</p>
                            </div>
                        </div>
                    </Link>
                    <Feedback
                        rating={eventsState[0].rating}
                        isSaved={eventsState[0].isSaved}
                        onSaveChange={(newSavedValue) => handleSaveChange(eventsState[0]._id, newSavedValue)}
                        onReport={() => setEventWithOpenReport(eventsState[0])}
                        eventId={eventsState[0]._id}
                    />
                </div>
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
    } else {
        return (
            <>
                <div className="bg-white shadow-md rounded-lg py-6 px-4 hover:shadow-lg duration-300">
                    <Link to={`/Event/${eventsState[0]._id}`}>
                        <h2 className="truncate text-lg font-semibold mb-2">{eventsState[0].title}</h2>
                        <p className="truncate text-[#2B2118]">{eventsState[0].description}</p>
                        <p className='text-sm mt-2'>{new Date(eventsState[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - {eventsState[0].time}</p>
                        <p className='text-[#2B2118] text-sm'>{eventsState[0].price}</p>
                        {renderEventImage(eventsState[0].image)}
                    </Link>
                    <Feedback
                        rating={eventsState[0].rating}
                        isSaved={eventsState[0].isSaved}
                        onSaveChange={(newSavedValue) => handleSaveChange(eventsState[0]._id, newSavedValue)}
                        onReport={() => setEventWithOpenReport(eventsState[0])}
                        eventId={eventsState[0]._id}
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar } from 'swiper/modules';
import Feedback from '../Components/Feedback';

const Cards = ({ events, withSlider, horizontal }) => {
  const [eventsState, setEventsState] = useState(events);

  const handleSaveChange = (eventId, newSavedValue) => {
    setEventsState(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, isSaved: newSavedValue } : event
      )
    );
  };

  if (withSlider) {
    return (
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
                <Link to={`/event/${event.id}`}>
                  <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
                  <p className="text-[#2B2118]">{event.description}</p>
                  <p className='text-[#2B2118] text-sm mt-4'>{event.date}</p>
                  <p className='text-[#2B2118] text-sm'>{event.price}</p>
                  <img src={event.imageURL} alt="Event" className='mt-6 rounded-lg' />
                </Link>
                <Feedback rating={event.rating} isSaved={event.save} onSaveChange={(newSavedValue) => handleSaveChange(event.id, newSavedValue)} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  } else if (horizontal) {
    return (
      <>
        <Link to={`/event/${events.id}`}>
          <div className="bg-white shadow-md rounded-lg p-4 mb-8 flex items-center hover:shadow-lg duration-300">
            <div className='w-1/3'>
              <img src={events.imageURL} alt="Event" className='rounded-lg' />
            </div>
            <div className='ml-14 w-2/3'>
              <h2 className="text-lg font-semibold mb-2">{events.title}</h2>
              <p className="text-[#2B2118]">{events.description}</p>
              <p className='text-[#2B2118] text-sm mt-4'>{events.date}</p>
              <p className='text-[#2B2118] text-sm'>{events.price}</p>
              <Feedback rating={events.rating} isSaved={events.save} onSaveChange={(newSavedValue) => handleSaveChange(events.id, newSavedValue)} />
            </div>
          </div>
        </Link>
      </>
    )
  } else {
    return (
      <>
        <div className="bg-white shadow-md rounded-lg py-6 px-4 hover:shadow-lg duration-300">
          <Link to={`/event/${events.id}`}>
            <h2 className="text-lg font-semibold mb-2">{events.title}</h2>
            <p className="text-[#2B2118]">{events.description}</p>
            <p className='text-[#2B2118] text-sm mt-4'>{events.date}</p>
            <p className='text-[#2B2118] text-sm'>{events.price}</p>
            <img src={events.imageURL} alt="Event" className='mt-6 rounded-lg' />
          </Link>
          <Feedback rating={events.rating} isSaved={events.save} onSaveChange={(newSavedValue) => handleSaveChange(events.id, newSavedValue)} />
        </div>
      </>
    )
  };
}

export default Cards;

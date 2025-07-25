import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

export default function Topeditors() {
  const [selectedImage, setSelectedImage] = useState(null);

  const cardData = [
    {
      name: 'Kaluram banjara',
      role: 'Web Designer',
      image: 'https://cdn.pixabay.com/photo/2022/03/11/06/14/indian-man-7061278_960_720.jpg',
    },
    {
      name: 'Dungaram banjara',
      role: 'Web Designer',
      image: 'https://img.freepik.com/free-photo/portrait-handsome-serious-man_23-2149022626.jpg',
    },
    {
      name: 'Birdaram banjara',
      role: 'Web Designer',
      image: 'https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg',
    },
    {
      name: 'Jhingurmal banjara',
      role: 'Web Designer',
      image: 'https://img.freepik.com/premium-photo/smiling-bearded-man_1030879-40664.jpg',
    },
    {
      name: 'Todarmal banjara',
      role: 'Web Designer',
      image: 'https://t3.ftcdn.net/jpg/04/97/66/28/360_F_497662812_7rGW6PMBJR9AbrKcGgN5S1luXYTjH92i.jpg',
    },
        {
      name: 'Jhingurmal banjara',
      role: 'Web Designer',
      image: 'https://img.freepik.com/premium-photo/smiling-bearded-man_1030879-40664.jpg',
    },

  ];

  return (
    <div className="w-full px-4 mt-10">
      <Swiper
        loop={true}
        spaceBetween={20}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {cardData.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="bg-black h-[300px] w-full rounded-xl overflow-hidden relative">
              <img
                className="w-full h-full object-cover cursor-pointer"
                src={card.image}
                alt={card.name}
                onClick={() => setSelectedImage(card.image)}
              />
              <div className="absolute bottom-5 left-5 leading-tight">
                <p className="text-white font-bold tracking-wide text-sm">
                  {card.name}
                </p>
                <p className="text-white text-xs">{card.role}</p>
                <div className="flex flex-row gap-2 mt-1">
                  <span className="border px-2 text-[9px] text-white rounded-full border-zinc-300">artist</span>
                  <span className="border px-2 text-[9px] text-white rounded-full border-zinc-300">designer</span>
                  <span className="border px-2 text-[9px] text-white rounded-full border-zinc-300">worker</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full View"
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

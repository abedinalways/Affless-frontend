import { useRef } from 'react';
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from 'react-icons/fa6';

export default function CustomSwiper({ data }: { data: string[] }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div style={{ position: 'relative' }}>
            <button ref={prevRef} className="absolute top-1/2 left-0 -translate-y-1/2 bg-[#ffffff81] backdrop-blur-xs border border-[#ccc] disabled:border-[#ccc] rounded-md disabled:bg-gray-200 disabled:text-gray-400 right-0 z-10 cursor-pointer disabled:cursor-not-allowed w-fit aspect-square p-1">
                <FaChevronLeft className='w-4 h-4' />
            </button>
            <button ref={nextRef} className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#ffffff81] backdrop-blur-xs border border-[#ccc] disabled:border-[#ccc] disabled:bg-gray-200 disabled:text-gray-400 z-10 rounded-md cursor-pointer disabled:cursor-not-allowed w-fit aspect-square p-1">
                <FaChevronRight className='w-4 h-4' />
            </button>
            <div className='px-7'>
                <Swiper
                    modules={[Navigation, A11y]}
                    spaceBetween={16} // Fixed gap of 16px
                    slidesPerView="auto" // Auto width based on content
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => {
                        setTimeout(() => {
                            if (
                                swiper.params.navigation &&
                                typeof swiper.params.navigation !== 'boolean' &&
                                swiper.navigation
                            ) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.destroy();
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        });
                    }}
                >
                    {data.map((item, idx) => (
                        <SwiperSlide key={idx} style={{ width: 'auto' }}>
                            <span className='select-none whitespace-nowrap bg-gray-100 px-4 py-1 rounded-full text-[12px] md:text-sm text-center'>
                                {item}
                            </span>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
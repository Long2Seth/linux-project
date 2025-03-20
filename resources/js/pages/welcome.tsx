// resources/js/pages/Welcome.tsx
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import Layout from "@/layouts/public-layout";

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <Layout title="សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ">
            <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full mx-auto">
                <CarouselContent className="-ml-4">
                    {[
                        'rupp-image2.jpg',
                        'rupp-image3.jpg',
                        'rupp-image4.jpg',
                        'rupp-image5.jpg',
                        'rupp-image6.jpg',
                        'rupp-image7.jpg'
                    ].map((image, index) => (
                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                            <img
                                src={`https://rsms-tech.makara.rocks/images/${image}`}
                                className="w-full h-96 rounded-md object-cover"
                                alt={`RUPP Image ${index + 1}`}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <section className="flex flex-col md:flex-row items-center justify-center gap-6 py-10 px-4">
                <div className="w-full md:w-96 h-72 rounded-md bg-white p-4">
                    <div className="w-32 mb-2">
                        <h3 className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text font-extrabold text-transparent italic">
                            New Innovation
                        </h3>
                    </div>
                    <h1 className="font-sans text-2xl font-bold text-black mb-2">
                        Cambodia's innovation of tech
                    </h1>
                    <p className="font-thin text-black text-sm">
                        Technological innovation drives rapid growth across industries by developing new technologies and improving
                        existing ones. It solves problems, enhances efficiency, and creates opportunities.
                    </p>
                    <p className="text-sm text-black mt-4">
                        Author: <span className="font-bold">John Doe</span>
                        <br />
                        Date: <span className="font-thin">15.03.2025</span>
                    </p>
                </div>

                <div className="w-full md:w-96 h-72 rounded-md overflow-hidden">
                    <video
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        loop
                        muted
                    >
                        <source src="https://rsms-tech.makara.rocks/videos/technology.mp4" type="video/mp4" />
                    </video>
                </div>
            </section>
        </Layout>
    );
}

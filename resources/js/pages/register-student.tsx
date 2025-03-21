import ProfileCard from '@/components/ProfileCard';
import Layout from '@/layouts/public-layout';
import { MemberData, MentorData } from '@/types/AboutUs';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { LuTarget } from 'react-icons/lu';
import { MdRemoveRedEye } from 'react-icons/md';

export default function RegisterStudent() {
    return (
        <Layout title="សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ - About">
            <section className="bg-khotixs-background-white dark:bg-khotixs-background-dark mb-[50px] space-y-[50px] md:mb-[80px] md:space-y-[80px] xl:mb-[100px] xl:space-y-[100px]">
                {/* Hero section */}
                <section className="relative flex h-[400px] w-full items-center justify-center overflow-x-hidden px-6 xl:h-[600px]">
                    {/* Background Shapes */}
                    <div className="bg-primary-color absolute left-[-200px] h-[400px] w-[520px] overflow-x-hidden rounded-bl-[100%] xl:h-[600px]"></div>
                    <div className="bg-primary-color absolute left-[300px] h-[400px] w-[1600px] xl:h-[600px]"></div>

                    {/* Content Wrapper */}
                    <div className="flex w-full max-w-[90%] flex-col items-center justify-between md:flex-row">
                        {/* Left Section for Text */}
                        <div className="z-10 max-w-[100%] space-y-4 px-4 md:max-w-[45%] md:px-8 md:text-left">
                            <h1 className="text-secondary-color-text left-[-230px] text-lg font-bold sm:left-[-180px] md:left-[-130px] md:text-2xl xl:top-[10px] xl:left-[30px] xl:text-4xl">
                                ABOUT US
                            </h1>
                            <p className="text-md text-black md:text-lg xl:text-2xl dark:text-white">
                                We’re here to help! Whether you have a question about your booking, need assistance, or want to share feedback, the
                                KHOTIXS team is ready to assist you.
                            </p>
                        </div>

                        {/* Right Section for Image */}
                        <div className="relative hidden h-[300px] w-[300px] md:block lg:h-[400px] lg:w-[400px]">
                            <DotLottieReact
                                className="h-full w-full object-cover"
                                src="https://lottie.host/ca623e10-a4d1-47bc-8a47-f7c7c73c2f46/jFAmyuUgYN.lottie"
                                loop
                                autoplay
                            />
                        </div>
                    </div>
                </section>


            </section>
        </Layout>
    );
}

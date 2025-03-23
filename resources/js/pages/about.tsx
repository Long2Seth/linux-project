import ProfileCard from '@/components/ProfileCard';
import Layout from '@/layouts/public-layout';
import { MemberData, MentorData } from '@/types/AboutUs';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { LuTarget } from 'react-icons/lu';
import { MdRemoveRedEye } from 'react-icons/md';

export default function About() {
    return (
        <Layout title="សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ - About">
            <section className="bg-RUPP-background-white dark:bg-RUPP-background-dark mb-[50px] space-y-[50px] md:mb-[80px] md:space-y-[80px] xl:mb-[100px] xl:space-y-[100px]">
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
                                We’re here to help! Whether you have a question about your <span className={'font-bold text-black'}>Student Management</span>, need assistance, or want to share feedback, the
                                RUPP team is ready to assist you.
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

                <section className="text-secondary-color dark:text-secondary-color-text h-auto w-full">
                    <section className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center px-5">
                            <h1 className="text-title-color dark:text-secondary-color-text max-w-[350px] text-center text-lg font-bold uppercase md:text-2xl xl:max-w-full xl:text-4xl">
                                Welcome To Our Website
                            </h1>
                            <hr className="bg-primary-color my-[20px] hidden h-2 w-[160px] sm:block dark:bg-white" />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-title-color dark:text-secondary-color-text text-lg font-bold uppercase md:text-2xl xl:text-4xl">
                                RUPP
                            </h1>
                            <p className="text-description-color text-md my-[20px] max-w-[350px] px-5 text-center text-base md:mx-[120px] md:max-w-[700px] md:text-lg xl:text-xl dark:text-gray-200">
                                Welcome to RUPP – Cambodia’s trusted platform for Student Management and event management. Whether you’re
                                looking to register, check information, scholarships, or you’re an event organizer by University, RUPP is here to bridge the gap. Our platform is designed to make the entire Student Management
                                process simple, fast, and reliable. With RUPP, you can explore upcoming events, information Volunteer, and connect with
                                the people in Cambodia, all in one place.
                            </p>
                        </div>
                    </section>

                    <section className="text-secondary-color dark:text-secondary-color-text container mt-10 mx-auto flex h-auto w-full justify-center">
                        <section className="grid w-full max-w-[350px] grid-cols-1 justify-center gap-5 px-5 md:max-w-full md:grid-cols-2 md:px-[40px]">
                            <section className="bg-secondary-color-text dark:bg-secondary-color flex w-full max-w-full flex-col justify-center gap-y-5 rounded-[5px] px-10 py-10 text-center md:max-w-[460px] lg:max-w-full">
                                {/* Icon */}
                                <LuTarget className="text-title-color dark:text-secondary-color-text h-[70px] w-full" />
                                {/* Title */}
                                <h1 className="text-title-color dark:text-secondary-color-text text-lg font-bold uppercase md:text-2xl xl:text-4xl">
                                    Our Mission
                                </h1>
                                {/* Description */}
                                <p className="text-description-color dark:text-secondary-color-text text-center text-base md:text-lg xl:text-xl">
                                    Our mission is to empower individuals and organizations by providing a seamless, user-friendly registering solution
                                    that connects event organizers with their academic. We aim to make every event accessible, every Student Management easy,
                                    and every experience unforgettable.
                                </p>
                            </section>
                            <section className="dark:bg-secondary-color flex max-w-full flex-col justify-center gap-y-5 rounded-[5px] bg-white px-10 py-10 text-center md:max-w-[460px] lg:max-w-full">
                                {/* Icon */}
                                <MdRemoveRedEye className="text-title-color dark:text-secondary-color-text h-[70px] w-full" />
                                {/* Title */}
                                <h1 className="text-title-color dark:text-secondary-color-text text-lg font-bold uppercase md:text-2xl xl:text-4xl">
                                    OUR VISION
                                </h1>
                                {/* Description */}
                                <p className="text-description-color dark:text-secondary-color-text text-center text-base md:text-lg xl:text-xl">
                                    Our vision is to become the leading  in Cambodia, fostering a thriving events ecosystem
                                    where people can discover, participate in, and celebrate the vibrant culture and creativity of the nation. We
                                    envision a future where RUPP is the go-to platform for both student and administration across the region.
                                </p>
                            </section>
                        </section>
                    </section>
                </section>

                <section className="text-secondary-color dark:text-secondary-color-text container mx-auto h-auto w-full overflow-x-hidden">
                    <h1 className="text-title-color dark:text-secondary-color-text text-center text-lg font-bold uppercase md:text-2xl xl:text-4xl">
                        OUR MENTORS
                    </h1>
                    <section className="w-fullz my-[20px] flex items-center justify-center gap-5 px-5 sm:grid-cols-2">
                        {MentorData.map((mentor) => (
                            <div className="flex items-center justify-center" key={mentor.name}>
                                <ProfileCard name={mentor.name} imageUrl={mentor.image} />
                            </div>
                        ))}
                    </section>
                </section>

                <section className="text-secondary-color dark:text-secondary-color-text container mx-auto h-auto w-full overflow-x-hidden">
                    <h1 className="text-title-color dark:text-secondary-color-text text-center text-lg font-bold uppercase md:text-2xl xl:text-4xl">
                        OUR MEMBERS
                    </h1>
                    <section className="w-fullz my-[20px] grid grid-cols-1 items-center justify-center gap-5 px-5 md:grid-cols-2 lg:grid-cols-3">
                        {MemberData.map((member) => (
                            <div className="flex items-center justify-center" key={member.name}>
                                <ProfileCard name={member.name} imageUrl={member.image} />
                            </div>
                        ))}
                    </section>
                </section>
            </section>
        </Layout>
    );
}

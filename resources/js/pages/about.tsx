import Layout from "@/layouts/public-layout"
import {LuTarget} from "react-icons/lu";
import {MdRemoveRedEye} from "react-icons/md";
import {MemberData, MentorData} from "@/types/AboutUs";
import ProfileCard from "@/components/ProfileCard";

export default function About() {

    return (
        <Layout title="សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ - About">
            <section
                className="space-y-[50px] md:space-y-[80px] xl:space-y-[100px] mb-[50px] md:mb-[80px] xl:mb-[100px] bg-khotixs-background-white dark:bg-khotixs-background-dark">
                {/* Hero section */}
                <section
                    className="relative h-[400px] xl:h-[600px] w-full overflow-x-hidden flex items-center justify-center px-6">
                    {/* Background Shapes */}
                    <div
                        className="absolute bg-primary-color h-[400px] xl:h-[600px] w-[520px] rounded-bl-[100%] left-[-200px] overflow-x-hidden"></div>
                    <div
                        className="absolute bg-primary-color h-[400px] xl:h-[600px] w-[1600px] left-[300px]"></div>

                    {/* Content Wrapper */}
                    <div className="flex flex-col md:flex-row items-center justify-between max-w-[90%] w-full">
                        {/* Left Section for Text */}
                        <div
                            className="z-10 max-w-[100%] md:max-w-[45%] md:text-left space-y-4 px-4 md:px-8">
                            <h1 className="text-secondary-color-text text-lg md:text-2xl xl:text-4xl font-bold left-[-230px] sm:left-[-180px] md:left-[-130px] xl:left-[30px] xl:top-[10px]">
                                ABOUT US
                            </h1>
                            <p className="text-white text-md md:text-lg xl:text-2xl dark:text-white">
                                We’re here to help! Whether you have a question about your booking, need
                                assistance, or want to share feedback, the KHOTIXS team is ready to assist you.
                            </p>
                        </div>

                        {/* Right Section for Image */}
                        <div className="relative lg:w-[400px] lg:h-[400px] w-[300px] h-[300px] hidden md:block">
                            <img
                                src="/about-us.gif"
                                alt="About Us"
                                className={` object-cover`}
                            />
                        </div>
                    </div>
                </section>

                <section className="w-full h-auto text-secondary-color dark:text-secondary-color-text">
                    <section className="flex flex-col justify-center items-center ">
                        <div className="flex flex-col justify-center items-center px-5">
                            <h1 className=" text-title-color text-lg md:text-2xl xl:text-4xl font-bold uppercase max-w-[350px] xl:max-w-full text-center dark:text-secondary-color-text ">
                                Welcome To Our Website
                            </h1>
                            <hr className="w-[160px] h-2 bg-primary-color hidden sm:block dark:bg-white my-[20px] "/>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-title-color text-lg md:text-2xl xl:text-4xl font-bold uppercase dark:text-secondary-color-text  ">
                                KHOTIXS
                            </h1>
                            <p className="text-description-color text-base md:text-lg xl:text-xl text-center max-w-[350px] px-5 text-md  md:max-w-[700px] md:mx-[120px] dark:text-gray-200 my-[20px]">
                                Welcome to KHOTIXS – Cambodia’s trusted platform for effortless ticket booking
                                and event
                                management. Whether you’re looking to book tickets for concerts, sports events,
                                or cultural
                                activities, or you’re an event organizer seeking to reach a broader audience,
                                KHOTIXS is
                                here to bridge the gap. Our platform is designed to make the entire booking
                                process simple,
                                fast, and reliable. With KHOTIXS, you can explore upcoming events, secure
                                tickets, and
                                connect with the latest happenings in Cambodia, all in one place.
                            </p>
                        </div>
                    </section>

                    <section
                        className="container mx-auto flex justify-center w-full h-auto text-secondary-color dark:text-secondary-color-text">
                        <section
                            className="grid justify-center w-full gap-5 grid-cols-1 max-w-[350px] px-5 md:grid-cols-2 md:max-w-full md:px-[40px]">
                            <section
                                className="bg-secondary-color-text flex flex-col w-full justify-center text-center max-w-full px-10 py-10 rounded-[5px] gap-y-5 md:max-w-[460px] lg:max-w-full dark:bg-secondary-color">
                                {/* Icon */}
                                <LuTarget
                                    className="w-full h-[70px] text-title-color dark:text-secondary-color-text"/>
                                {/* Title */}
                                <h1 className="text-title-color text-lg md:text-2xl xl:text-4xl font-bold uppercase dark:text-secondary-color-text ">
                                    Our Mission
                                </h1>
                                {/* Description */}
                                <p className="text-description-color text-base md:text-lg xl:text-xl text-center dark:text-secondary-color-text">
                                    Our mission is to empower individuals and organizations by providing a
                                    seamless, user-friendly ticketing solution that connects event organizers
                                    with their audiences. We aim to make every event accessible, every booking
                                    easy, and every experience
                                    unforgettable.
                                </p>
                            </section>
                            <section
                                className="bg-white text-center max-w-full flex flex-col justify-center px-10 py-10 rounded-[5px] gap-y-5 md:max-w-[460px] lg:max-w-full dark:bg-secondary-color">
                                {/* Icon */}
                                <MdRemoveRedEye
                                    className="w-full h-[70px] text-title-color dark:text-secondary-color-text"/>
                                {/* Title */}
                                <h1 className="text-title-color text-lg md:text-2xl xl:text-4xl font-bold uppercase dark:text-secondary-color-text ">
                                    OUR VISION
                                </h1>
                                {/* Description */}
                                <p className="text-description-color text-base md:text-lg xl:text-xl text-center dark:text-secondary-color-text">
                                    Our vision is to become the leading online ticketing platform in Cambodia,
                                    fostering a thriving events ecosystem where people can discover, participate
                                    in, and celebrate the vibrant culture and creativity of the nation. We
                                    envision a future where KHOTIXS is the go-to platform for both customers and
                                    event organizers across the region.
                                </p>
                            </section>
                        </section>
                    </section>
                </section>


                <section
                    className="container overflow-x-hidden mx-auto w-full h-auto text-secondary-color dark:text-secondary-color-text">
                    <h1 className="text-title-color text-lg md:text-2xl xl:text-4xl font-bold uppercase text-center dark:text-secondary-color-text ">
                        OUR MENTORS
                    </h1>
                    <section
                        className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center w-fullz gap-5 px-5 my-[20px]">
                        {MentorData.map((mentor) => (
                            <div className="flex justify-center items-center" key={mentor.name}>
                                <ProfileCard name={mentor.name} imageUrl={mentor.image} links={mentor.info}/>
                            </div>
                        ))}
                    </section>
                </section>


                <section
                    className="container overflow-x-hidden mx-auto w-full h-auto text-secondary-color dark:text-secondary-color-text">
                    <h1 className="text-title-color text-lg md:text-2xl xl:text-4xl font-bold uppercase text-center dark:text-secondary-color-text ">
                        OUR MEMBERS
                    </h1>
                    <section
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center w-fullz gap-5 px-5 my-[20px]">
                        {MemberData.map((member) => (
                            <div className="flex justify-center items-center" key={member.name}>
                                <ProfileCard name={member.name} imageUrl={member.image} links={member.info}/>
                            </div>
                        ))}
                    </section>
                </section>


            </section>
        </Layout>
    );
}

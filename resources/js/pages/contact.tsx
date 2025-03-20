import Layout from '@/layouts/public-layout'
import {Link} from "@inertiajs/react";
import {GrLocation} from "react-icons/gr";
import {FiPhone} from "react-icons/fi";
import {HiOutlineMail} from "react-icons/hi";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

export default function Contact() {

    return (
        <Layout title="សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ - Contact">

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
                                CONTACT US
                            </h1>
                            <p className="text-black text-md md:text-lg xl:text-2xl dark:text-white">
                                We’re here to help! Whether you have a question about your booking, need assistance,
                                or want to share feedback, the KHOTIXS team is ready to assist you.
                            </p>
                        </div>

                        {/* Right Section for Image */}
                        <div className="relative lg:w-[400px] lg:h-[400px] w-[300px] h-[300px] hidden md:block">
                            <div className="relative lg:w-[400px] lg:h-[400px] w-[300px] h-[300px] hidden md:block">
                                <DotLottieReact
                                    src="https://lottie.host/75abaa0d-f55c-4d2f-9f56-a973dec36f61/X69vy1QwzX.lottie"
                                    loop
                                    autoplay
                                    className="object-cover h-full w-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Info and Form */}
                <section
                    className="container mx-auto w-full h-auto text-primary-color-text dark:text-secondary-color-text">
                    <div className="grid grid-cols-1 lg:gap-[100px] gap-5 w-full md:grid-cols-2 px-[24px]">

                        <div className="relative lg:w-[500px] lg:h-[500px] w-[300px] h-[300px] hidden md:block">
                            <div className="relative lg:w-[400px] lg:h-[400px] w-[300px] h-[300px] hidden md:block">
                                <DotLottieReact
                                    src="https://lottie.host/d18edbe2-35b2-4943-a81a-fa4dbcdc54b3/wsHA0wKT7F.lottie"
                                    loop
                                    autoplay
                                    className="object-cover h-full w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-8 text-center">
                            <h1 className="text-title-color text-lg md:text-2xl xl:text-4xl font-bold uppercase w-full text-center dark:text-white">
                                OUR CONTACT
                            </h1>
                            <p className="text-description-color text-base md:text-lg xl:text-xl text-start px-3 dark:text-dark-description-color">
                                Looking for more information or need assistance? Our friendly team is here to help.
                                Reach out to us by filling out the contact form below. We&apos;ll be in touch
                                shortly.
                            </p>
                            <div className="flex flex-col gap-5 text-lg">
                                <Link href="https://maps.app.goo.gl/V9rV5hL13QNK3ZJg9"
                                      className="grid grid-cols-12 hover:opacity-80 items-center bg-white px-5 py-2 rounded-[5px] dark:bg-background-blur dark:bg-opacity-5">
                                    <div className="col-span-2 xl:col-span-1">
                                        <GrLocation className="w-[30px] h-[30px] text-primary-color"/>
                                    </div>
                                    <div className="text-start col-span-10 xl:col-span-11">
                                        <h3 className="text-title-color text-base md:text-lg xl:text-xl font-bold dark:text-secondary-color-text">
                                            Location
                                        </h3>
                                        <p className="text-description-color text-sm md:text-base xl:text-lg dark:text-dark-description-color">
                                            No. 24, St 562, Sangkat Boeung Kak I, Khan Toul Kork, Phnom Penh.
                                        </p>
                                    </div>
                                </Link>
                                <Link href="tel:+85595990910"
                                      className="grid grid-cols-12 hover:opacity-80 items-center bg-white px-5 py-2 rounded-[5px] dark:bg-background-blur dark:bg-opacity-5">
                                    <div className="col-span-2 xl:col-span-1">
                                        <FiPhone className="w-[30px] h-[30px] text-primary-color"/>
                                    </div>
                                    <div className="text-start col-span-10 xl:col-span-11">
                                        <h3 className="text-title-color text-base md:text-lg xl:text-xl font-bold dark:text-secondary-color-text">
                                            Phone
                                        </h3>
                                        <p className="text-description-color text-sm md:text-base xl:text-lg dark:text-dark-description-color">(+855)
                                            95 990 910</p>
                                    </div>
                                </Link>
                                <Link href="https://mail.google.com/mail/u/0/#sent?compose=new"
                                      className="grid grid-cols-12 hover:opacity-80 items-center bg-white px-5 py-2 rounded-[5px] dark:bg-background-blur dark:bg-opacity-5">
                                    <div className="col-span-2 xl:col-span-1">
                                        <HiOutlineMail className="w-[30px] h-[30px] text-primary-color"/>
                                    </div>
                                    <div className="text-start col-span-10 xl:col-span-11">
                                        <h3 className="text-title-color text-base md:text-lg xl:text-xl font-bold dark:text-secondary-color-text">
                                            Email
                                        </h3>
                                        <p className="text-description-color text-sm md:text-base xl:text-lg dark:text-dark-description-color">inform.service@gmail.com</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Right Section: Contact Form */}
                        {/*<div className="flex flex-col gap-8 w-full text-center">*/}
                        {/*    <h1 className="text-title-color text-lg md:text-2xl xl:text-4xl font-bold uppercase max-w-[350px] xl:max-w-full text-center dark:text-white">*/}
                        {/*        WRITE A MESSAGE*/}
                        {/*    </h1>*/}
                        {/*    <p className="text-description-color text-base md:text-lg xl:text-xl text-start dark:text-dark-description-color">*/}
                        {/*        Please use this space to share your message, questions, or specific requests.*/}
                        {/*        We&apos;ll do our best to respond promptly.*/}
                        {/*    </p>*/}
                        {/*    <div*/}
                        {/*        className="p-5 xl:p-20 text-start rounded-[5px] bg-white dark:bg-background-blur dark:bg-opacity-5">*/}
                        {/*        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>*/}
                        {/*            <div className="flex flex-col gap-2">*/}
                        {/*                <label htmlFor="name"*/}
                        {/*                       className="text-base font-medium text-primary-color-text dark:text-secondary-color-text">*/}
                        {/*                    Name <span className="text-red-500">*</span>*/}
                        {/*                </label>*/}
                        {/*                <Input*/}
                        {/*                    type="text"*/}
                        {/*                    id="name"*/}
                        {/*                    placeholder="Name"*/}
                        {/*                    value={name}*/}
                        {/*                    onChange={(e) => setName(e.target.value)}*/}
                        {/*                    onBlur={(e) => handleBlur('name', e.target.value)}*/}
                        {/*                    className="p-2 text-lg border-gray-300 rounded-[6px] dark:border-label-description placeholder:text-gray-300 dark:text-secondary-color-text dark:bg-background-blur dark:bg-opacity-5"*/}
                        {/*                />*/}
                        {/*                {errors.name && <span className="text-red-500">{errors.name}</span>}*/}
                        {/*            </div>*/}
                        {/*            <div className="flex flex-col gap-2">*/}
                        {/*                <label htmlFor="email"*/}
                        {/*                       className="text-lg font-medium text-primary-color-text dark:text-secondary-color-text">*/}
                        {/*                    Email <span className="text-red-500">*</span>*/}
                        {/*                </label>*/}
                        {/*                <Input*/}
                        {/*                    type="email"*/}
                        {/*                    id="email"*/}
                        {/*                    placeholder="Email"*/}
                        {/*                    value={email}*/}
                        {/*                    onChange={(e) => setEmail(e.target.value)}*/}
                        {/*                    onBlur={(e) => handleBlur('email', e.target.value)}*/}
                        {/*                    className="p-2 text-lg border-gray-300 rounded-[6px] dark:border-label-description placeholder:text-gray-300 dark:text-secondary-color-text dark:bg-background-blur dark:bg-opacity-5"*/}
                        {/*                />*/}
                        {/*                {errors.email && <span className="text-red-500">{errors.email}</span>}*/}
                        {/*            </div>*/}
                        {/*            <div className="flex flex-col gap-2">*/}
                        {/*                <label htmlFor="message"*/}
                        {/*                       className="text-lg font-medium text-primary-color-text dark:text-secondary-color-text">*/}
                        {/*                    Message <span className="text-red-500">*</span>*/}
                        {/*                </label>*/}
                        {/*                <textarea*/}
                        {/*                    id="message"*/}
                        {/*                    placeholder="Message"*/}
                        {/*                    value={message}*/}
                        {/*                    onChange={(e) => setMessage(e.target.value)}*/}
                        {/*                    onBlur={(e) => handleBlur('message', e.target.value)}*/}
                        {/*                    className="p-2 text-lg border border-gray-300 rounded-[6px] dark:border-label-description placeholder:text-gray-300 dark:text-secondary-color-text bg-transparent"*/}
                        {/*                ></textarea>*/}
                        {/*                {errors.message && <span className="text-red-500">{errors.message}</span>}*/}
                        {/*            </div>*/}
                        {/*            <LoadingButton*/}
                        {/*                type="submit"*/}
                        {/*                loading={loading}*/}
                        {/*                className="bg-primary-color text-white text-lg py-2 px-4 rounded-[5px] hover:bg-primary-color/80 transition">*/}
                        {/*                Submit*/}
                        {/*            </LoadingButton>*/}
                        {/*        </form>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </section>

                {/* Our Location Section */}
                <section
                    className="container mx-auto w-full text-primary-color-text dark:text-secondary-color-text space-y-[30px]">
                    <h1 className="text-title-color text-lg md:text-2xl xl:text-4xl font-bold uppercase w-[300px] text-center mx-auto dark:text-white">
                        OUR LOCATION
                    </h1>
                    <Link href="https://maps.app.goo.gl/V9rV5hL13QNK3ZJg9" className="m-5">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.6314046843904!2d104.89920651123596!3d11.578259843843679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6f%3A0x6b66703c5fc0c7cc!2sScience%20and%20Technology%20Advanced%20Development%20Co.%2C%20Ltd.!5e0!3m2!1sen!2sus!4v1733450750727!5m2!1sen!2sus"
                            style={{border: 0, height: '600px', width: '100%'}}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Link>
                </section>
            </section>



        </Layout>
    );
}

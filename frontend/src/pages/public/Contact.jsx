import {
    Phone,
    Mail,
    MapPin,
    Clock
} from "lucide-react";

function Contact() {

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Hero Section */}
            <div className="text-center py-20 px-6">

                <h1
                    className="
                    text-6xl
                    font-black
                    bg-gradient-to-r
                    from-blue-400
                    via-cyan-400
                    to-green-400
                    bg-clip-text
                    text-transparent
                "
                >
                    Contact Us
                </h1>

                <p className="text-slate-400 mt-5 text-lg">
                    We'd love to hear from you.
                </p>

            </div>

            <div className="max-w-7xl mx-auto px-6 pb-20">

                <div className="grid md:grid-cols-2 gap-10">

                    {/* Contact Information */}
                    <div
                        className="
                        bg-white/5
                        backdrop-blur-xl
                        border
                        border-white/10
                        rounded-3xl
                        p-10
                    "
                    >

                        <h2 className="text-3xl font-bold mb-8">
                            Get In Touch
                        </h2>

                        <div className="space-y-8">

                            <div className="flex items-center gap-4">

                                <Phone
                                    size={30}
                                    className="text-blue-400"
                                />

                                <div>
                                    <h3 className="font-bold">
                                        Phone
                                    </h3>

                                    <p className="text-slate-400">
                                        +91 9482284692
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <Mail
                                    size={30}
                                    className="text-green-400"
                                />

                                <div>
                                    <h3 className="font-bold">
                                        Email
                                    </h3>

                                    <p className="text-slate-400">
                                        smartparking@gmail.com
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <MapPin
                                    size={30}
                                    className="text-red-400"
                                />

                                <div>
                                    <h3 className="font-bold">
                                        Address
                                    </h3>

                                    <p className="text-slate-400">
                                        Vijayapura, Karnataka, India
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <Clock
                                    size={30}
                                    className="text-yellow-400"
                                />

                                <div>
                                    <h3 className="font-bold">
                                        Working Hours
                                    </h3>

                                    <p className="text-slate-400">
                                        24 × 7 Service Available
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Contact Form */}
                    <div
                        className="
                        bg-white/5
                        backdrop-blur-xl
                        border
                        border-white/10
                        rounded-3xl
                        p-10
                    "
                    >

                        <h2 className="text-3xl font-bold mb-8">
                            Send Message
                        </h2>

                        <form className="space-y-6">

                            <input
                                type="text"
                                placeholder="Your Name"
                                className="
                                w-full
                                p-4
                                rounded-xl
                                bg-slate-900
                                border
                                border-slate-700
                                focus:outline-none
                                focus:border-blue-500
                                "
                            />

                            <input
                                type="email"
                                placeholder="Your Email"
                                className="
                                w-full
                                p-4
                                rounded-xl
                                bg-slate-900
                                border
                                border-slate-700
                                focus:outline-none
                                focus:border-blue-500
                                "
                            />

                            <textarea
                                rows="6"
                                placeholder="Your Message"
                                className="
                                w-full
                                p-4
                                rounded-xl
                                bg-slate-900
                                border
                                border-slate-700
                                focus:outline-none
                                focus:border-blue-500
                                "
                            />

                            <button
                                type="submit"
                                className="
                                w-full
                                py-4
                                rounded-xl
                                bg-gradient-to-r
                                from-blue-600
                                to-purple-600
                                font-bold
                                hover:scale-105
                                transition-all
                                duration-300
                                "
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Contact;
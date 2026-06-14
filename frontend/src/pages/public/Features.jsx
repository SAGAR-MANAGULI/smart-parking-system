import {
  Car,
  CreditCard,
  BarChart3,
  ShieldCheck,
  Smartphone,
  Zap
} from "lucide-react";

import { Link } from "react-router-dom";

function Features() {

  const features = [
    {
      icon: <Car size={50} />,
      title: "Real-Time Slot Tracking",
      description:
        "Monitor available and occupied parking slots instantly with live updates."
    },
    {
      icon: <CreditCard size={50} />,
      title: "Smart Payment System",
      description:
        "Supports Cash, UPI and Card payments with secure transactions."
    },
    {
      icon: <BarChart3 size={50} />,
      title: "Reports & Analytics",
      description:
        "View parking statistics, revenue reports and occupancy insights."
    },
    {
      icon: <ShieldCheck size={50} />,
      title: "Secure Management",
      description:
        "Protected admin dashboard with role-based access and monitoring."
    },
    {
      icon: <Smartphone size={50} />,
      title: "Mobile Friendly",
      description:
        "Responsive design that works smoothly on mobile, tablet and desktop."
    },
    {
      icon: <Zap size={50} />,
      title: "Instant Live Updates",
      description:
        "Get parking status updates instantly without manual refresh."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">

        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-600/20 blur-3xl rounded-full"></div>

        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-blue-400 font-semibold tracking-widest uppercase mb-4">
            Why Choose Smart Parking
          </h1>

          <h2
            className="
                        text-5xl
                        md:text-7xl
                        font-black
                        bg-gradient-to-r
                        from-blue-400
                        via-cyan-400
                        to-green-400
                        bg-clip-text
                        text-transparent
                        "
          >
            Smart Features
          </h2>

          <p className="text-slate-400 text-lg mt-6 max-w-3xl mx-auto">
            Experience a modern parking management solution
            designed for efficiency, automation and real-time monitoring.
          </p>

        </div>

      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="
                            group
                            backdrop-blur-xl
                            bg-white/5
                            border
                            border-white/10
                            rounded-3xl
                            p-8
                            hover:-translate-y-3
                            hover:border-blue-500/50
                            hover:shadow-2xl
                            hover:shadow-blue-500/20
                            transition-all
                            duration-500
                            "
            >

              <div className="text-blue-400 mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <div
            className="
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-8
                        text-center
                        "
          >

            <div
              className="
                            bg-gradient-to-r
                            from-blue-600
                            to-blue-800
                            rounded-3xl
                            p-10
                            "
            >
              <h2 className="text-5xl font-black">
                100+
              </h2>

              <p className="mt-3 text-blue-100">
                Parking Slots
              </p>
            </div>

            <div
              className="
                            bg-gradient-to-r
                            from-green-600
                            to-green-800
                            rounded-3xl
                            p-10
                            "
            >
              <h2 className="text-5xl font-black">
                500+
              </h2>

              <p className="mt-3 text-green-100">
                Vehicles Managed
              </p>
            </div>

            <div
              className="
                            bg-gradient-to-r
                            from-purple-600
                            to-purple-800
                            rounded-3xl
                            p-10
                            "
            >
              <h2 className="text-5xl font-black">
                99%
              </h2>

              <p className="mt-3 text-purple-100">
                System Accuracy
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">

        <div
          className="
                    max-w-5xl
                    mx-auto
                    text-center
                    bg-white/5
                    border
                    border-white/10
                    rounded-3xl
                    p-12
                    "
        >

          <h2 className="text-4xl md:text-5xl font-black">
            Ready To Experience
            Smart Parking?
          </h2>

          <p className="text-slate-400 mt-6 text-lg">
            View live parking availability and
            monitor slot occupancy in real time.
          </p>

          <Link
            to="/livestatus"
            className="
                        inline-block
                        mt-8
                        px-10
                        py-4
                        rounded-xl
                        bg-gradient-to-r
                        from-blue-600
                        to-purple-600
                        hover:scale-105
                        transition-all
                        duration-300
                        font-bold
                        "
          >
            View Live Status
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Features;
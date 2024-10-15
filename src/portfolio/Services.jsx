import React from "react";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Building responsive and modern websites.",
      icon: "🌐",
    },
    {
      title: "Mobile Development",
      description: "Creating mobile apps for Android and iOS.",
      icon: "📱",
    },
    {
      title: "UI/UX Design",
      description: "Designing user-friendly interfaces.",
      icon: "🎨",
    },
  ];

  return (
    <section
      id="services"
      className="text-center w-full py-24 bg-background_container"
    >
      <h1 className="text-4xl font-bold mb-12 text-heading">Services</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-background_card p-8 rounded-lg shadow-lg w-80 text-left transform hover:scale-105 transition-transform"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h2 className="text-2xl font-semibold mb-2 text-text_tertiary">
              {service.title}
            </h2>
            <p className="text-lg text-text_accent">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

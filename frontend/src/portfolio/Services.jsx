import React, { useEffect, useState } from "react";
import { useServicesQuery } from "../hooks/servicesQuery"; // Assuming you have a custom hook to fetch services

const Services = () => {
  const [services, setServices] = useState([]);
  const { data: servicesData, isLoading, error } = useServicesQuery();

  useEffect(() => {
    if (servicesData) {
      setServices(servicesData);
    }
  }, [servicesData]);

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center text-red-500">
        <p>Error loading services data</p>
      </div>
    );
  }

  return (
    <section
      id="services"
      className="text-center w-full py-24 bg-background_container"
    >
      <h1 className="text-4xl font-bold mb-12 text-heading">Services</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;

function ServiceCard({ service, index }) {
  const { title, description, icon, image_path } = service;

  return (
    <div className="bg-background_card p-8 rounded-lg shadow-lg w-80 text-left transform hover:scale-105 transition-transform">
      <div className="text-5xl mb-4">{icon}</div>
      <h2 className="text-2xl font-semibold mb-2 text-text_tertiary">
        {title}
      </h2>
      <p className="text-lg text-text_accent">{description}</p>
      {image_path && (
        <img
          src={image_path}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mt-4"
        />
      )}
    </div>
  );
}

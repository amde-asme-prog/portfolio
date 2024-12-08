const Projects = ({ projects }) => {
  return (
    <section
      id="projects"
      className="px-12w-full p-10 py-16 bg-gray-100 dark:bg-stone-900 mb-5
      "
    >
      <div className="text-center mb-16">
        <h2 className="text-blue-600 dark:text-blue-400 font-semibold uppercase text-sm tracking-wider">
          Our Portfolio
        </h2>
        <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
          Featured Projects
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
          Explore our best work and see how we solve complex challenges.
        </p>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const { title, image_path, description } = project;

  return (
    <div className="relative group w-96 max-h-96 min-h-60 overflow-hidden rounded-lg shadow-lg bg-gray-200 dark:bg-gray-800">
      {/* Image */}
      <img
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* Shadow Overlay */}
      <div
        className="absolute inset-0 bg-blue-300/70 flex flex-col px-8 items-center justify-center
        translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"
      >
        <div className="px-4 self-start justify-self-start">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-300 line-clamp-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            illum, doloremque perspiciatis, similique ratione voluptate, sed
            facere unde recusandae ipsam perferendis possimus veritatis. Illum
            incidunt ut officia sequi praesentium repellat?
          </p>
        </div>
        <div className="self-end justify-self-end flex gap-6 py-10 pt-12  ">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300">
            github
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300">
            demo
          </button>
        </div>
      </div>

      {/* Directional Overlay Animation */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent to-black/70 opacity-0
        group-hover:opacity-100 group-hover:bg-gradient-to-b transition-opacity duration-500 ease-in-out"
      />
    </div>
  );
};

export default Projects;

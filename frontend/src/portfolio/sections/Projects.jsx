/* eslint-disable react/prop-types */
const Projects = ({ projects }) => {
  return (
    <section
      id="projects"
      className="px-4 sm:px-8 md:px-12 w-full p-10 py-16 bg-gray-100 dark:bg-stone-900 mb-5"
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-blue-600 dark:text-blue-400 font-semibold uppercase text-sm tracking-wider">
          Our Portfolio
        </h2>
        <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
          Featured Projects
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Explore our best work and see how we solve complex challenges.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const {
    title,
    image_path,
    description,
    role,
    tools,
    github_link,
    demo_link,
  } = project;

  return (
    <div className=" relative group h-[400px] overflow-hidden rounded-xl shadow-lg bg-gray-200 dark:bg-gray-800 hover:shadow-2xl transition-shadow duration-300">
      {/* Image */}
      <img
        src={import.meta.env.VITE_API_URL + image_path}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 flex flex-col p-6 justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          {/* Project Info */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-300 font-medium">{role}</p>
            <div className="flex flex-wrap gap-2">
              {tools &&
                (Array.isArray(tools) ? tools : JSON.parse(tools)).map(
                  (tool, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-600/80 rounded-full"
                    >
                      {tool}
                    </span>
                  )
                )}
            </div>
            <p className="text-sm text-gray-300 line-clamp-3 mt-2">
              {description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            {github_link && (
              <a
                href={github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Github
              </a>
            )}
            {demo_link && (
              <a
                href={demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

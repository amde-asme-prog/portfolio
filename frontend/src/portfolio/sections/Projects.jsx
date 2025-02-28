import { useProjectsQuery } from "../../hooks/projectsQuery";
import { ErrorMessage } from "../reusables/ErrorResponses";

const Projects = () => {
  const {
    data: projectsData,
    isLoading: isProjectLoading,
    error: projectsError,
  } = useProjectsQuery();

  if (isProjectLoading) {
    return <ProjectsShimmer />;
  } else if (projectsError) {
    return <ProjectsShimmer />;

    // return <ErrorMessage status={projectsError.response?.status} />;
  }

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
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectsShimmer = () => {
  return (
    <section
      id="projects"
      className="px-4 sm:px-8 md:px-12 w-full p-10 py-16 bg-gray-100 dark:bg-stone-900 mb-5"
    >
      {/* Header Shimmer */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="h-4 w-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="mt-4 h-8 w-64 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="mt-4 h-4 w-96 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Projects Grid Shimmer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div
            key={index}
            className="relative h-[400px] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse"
          >
            {/* Image Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Content Shimmer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/80 to-transparent">
              <div className="space-y-3">
                {/* Title Shimmer */}
                <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />

                {/* Role Shimmer */}
                <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded" />

                {/* Tools Shimmer */}
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"
                    />
                  ))}
                </div>

                {/* Description Shimmer */}
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="h-3 w-4/6 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>

                {/* Buttons Shimmer */}
                <div className="flex gap-4 mt-4">
                  <div className="flex-1 h-10 bg-gray-300 dark:bg-gray-600 rounded-lg" />
                  <div className="flex-1 h-10 bg-gray-300 dark:bg-gray-600 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Add this to your global CSS or style block
const shimmerStyles = `
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
.animate-shimmer {
  animation: shimmer 2s infinite;
}
`;

// Original ProjectCard component remains the same
const ProjectCard = ({ project }) => {
  // ... (Your existing ProjectCard implementation)
};

export default Projects;

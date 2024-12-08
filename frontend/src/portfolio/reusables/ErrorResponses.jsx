export const OfflineMessage = () => (
  <section className="w-full min-h-screen py-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
    <div className="flex flex-col gap-6 items-center justify-center text-center p-8 bg-red-900/10 rounded-lg shadow-lg max-w-lg mx-auto border border-red-500/20">
      <div className="text-6xl text-red-500">
        <i className="fas fa-exclamation-circle"></i>
      </div>
      <p className="text-2xl font-semibold text-red-600 mt-4">
        Oops! You're Offline
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
        It seems you're disconnected from the internet. Please check your
        connection.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300 mt-4">
        If you're on a network, try restarting your router or checking your
        connection settings.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-200"
      >
        Try Again
      </button>
    </div>
  </section>
);
export const LoadingSpinner = () => (
  <section className="w-full min-h-screen py-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
    <div className="flex flex-col gap-8 items-center justify-center text-center p-8 bg-gray-200 rounded-lg shadow-lg max-w-lg mx-auto border border-gray-300 dark:bg-gray-900 dark:border-gray-600">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-indigo-600 border-solid"></div>
      <p className="text-xl text-indigo-600 font-semibold mt-4">
        We are fetching your content
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
        Please hold on a moment while we gather the information.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300 mt-4">
        If the process takes too long, please try refreshing the page.
      </p>
    </div>
  </section>
);

export const ErrorMessage = ({ status }) => {
  const errorMessage =
    status >= 500
      ? "Oops! Something went wrong on our end."
      : status === 404
      ? "Page not found."
      : "An unexpected error occurred.";

  const description =
    status >= 500
      ? "We're experiencing technical issues. Please try again later."
      : status === 404
      ? "The page you are looking for might have been moved or deleted."
      : "Please try refreshing the page or contact support.";

  return (
    <section className="w-full min-h-screen py-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center justify-center text-center p-8 bg-red-900/10 rounded-lg shadow-lg max-w-lg mx-auto border border-red-500/20">
        <div className="text-6xl text-red-500">
          <i className="fas fa-bug"></i>
        </div>
        <p className="text-2xl font-semibold text-red-600 mt-4">
          {errorMessage}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          {description}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-200"
        >
          Refresh Page
        </button>
      </div>
    </section>
  );
};

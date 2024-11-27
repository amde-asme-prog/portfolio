export const OfflineMessage = () => (
  <section className="w-full min-h-screen py-24 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center p-8 bg-red-900/20 rounded-2xl border border-red-500/20">
        <p className="text-xl text-red-400">
          It seems you're offline. Please check your internet connection and try
          again.
        </p>
        <p className="text-lg text-gray-600 mt-4">
          Make sure your device is connected to a Wi-Fi or mobile data network.
          If you're on a network, try restarting your router or checking your
          connection settings.
        </p>
        <p className="text-lg text-gray-600 mt-4">
          If you're still having trouble, please check with your service
          provider or contact support for further assistance.
        </p>
      </div>
    </div>
  </section>
);

export const LoadingSpinner = () => (
  <section className="w-full min-h-screen py-24 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="content-center flex items-center justify-center  text-center p-8 bg-red-900/20 rounded-2xl border border-red-500/20">
        <div className="animate-spin rounded-full size-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
      <div className="text-center mt-8">
        <p className="text-xl text-indigo-600">
          We're loading your content. Please wait a moment...
        </p>
        <p className="text-lg text-gray-600 mt-4">
          This may take a little while depending on your internet connection. If
          the page takes longer than expected, try refreshing the page.
        </p>
      </div>
    </div>
  </section>
);
export const ErrorMessage = ({ status }) => {
  if (status >= 500) {
    return (
      <section className="w-full min-h-screen py-24 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center p-8 bg-red-900/20 rounded-2xl border border-red-500/20">
            <p className="text-xl text-red-400">
              Oops! Something went wrong on our end.
            </p>
            <p className="text-lg text-gray-600 mt-4">
              We're experiencing some technical issues with our servers. Please
              try again later. If the issue persists, feel free to reach out to
              our support team.
            </p>
            <p className="text-lg text-gray-600 mt-4">
              We apologize for the inconvenience and appreciate your patience as
              we work on fixing the problem.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (status === 404) {
    return (
      <section className="w-full min-h-screen py-24 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center p-8 bg-red-900/20 rounded-2xl border border-red-500/20">
            <p className="text-xl text-red-400">Page Not Found</p>
            <p className="text-lg text-gray-600 mt-4">
              The page you’re looking for might have been moved, deleted, or
              never existed. Please check the URL or go back to the homepage.
            </p>
            <p className="text-lg text-gray-600 mt-4">
              If you think this is an error, feel free to contact our support
              team for assistance.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

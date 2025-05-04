export default async function NotFound() {
    return (
        <div className="w-full max-w-md mx-auto p-3 md:mt-32 text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-neutral-500 mb-4">
                Page Not Found
            </h2>
            <p className="text-neutral-500 dark:text-neutral-700 mb-8">
                Oops! The page you're looking for doesn't exist.
            </p>
        </div>
    );
}
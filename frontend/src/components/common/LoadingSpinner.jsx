const LoadingSpinner = ({ size = 'md', fullPage = false }) => {
  const sizeClasses = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-t-2 border-b-2',
    lg: 'h-16 w-16 border-4'
  };
  
  const spinner = (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} border-indigo-500`}></div>
  );
  
  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          {spinner}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center py-8">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
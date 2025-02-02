import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonResumeDetailView = () => {
  return (
    <div className="flex w-full py-10 border-grey-light">
      {/* Left Section */}
      <div className="xs:w-3/5 w-11/12 mx-auto bg-white rounded-lg p-8 space-y-6">
        {/* Title */}
        <div>
          <Skeleton className="h-8 w-[200px]" />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-grey-light-active pb-5">
          <div className="flex gap-4 items-center">
            {/* Profile Image */}
            <Skeleton className="w-[40px] h-[40px] rounded-full" />
            {/* Company Name */}
            <div>
              <Skeleton className="h-5 w-[120px]" />
            </div>
          </div>
          {/* Date */}
          <Skeleton className="h-5 w-[100px]" />
        </div>

        {/* Content Section */}
        <div className="py-6 space-y-5">
          {/* Phone Number */}
          <div className="flex gap-2 items-center">
            <Skeleton className="w-[20px] h-[20px]" />
            <Skeleton className="h-5 w-[150px]" />
          </div>
          {/* Content */}
          <Skeleton className="h-[80px] w-full" />
        </div>

        {/* Button */}
        <Skeleton className="h-[40px] w-full mt-[20px]" />
      </div>
    </div>
  );
};

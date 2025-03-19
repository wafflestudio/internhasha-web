import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonCoffeeChatDetailView = () => {
  return (
    <div className="flex w-full border-grey-50 py-10">
      {/* Left Section */}
      <div className="mx-auto w-11/12 space-y-6 rounded-lg bg-white p-8 xs:w-3/5">
        {/* Title */}
        <div>
          <Skeleton className="h-8 w-[200px]" />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-grey-100 pb-5 sm:flex-row">
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <Skeleton className="h-[40px] w-[40px] rounded-full" />
            {/* Company Name */}
            <div>
              <Skeleton className="h-5 w-[120px]" />
            </div>
          </div>
          {/* Date */}
          <Skeleton className="h-5 w-[100px]" />
        </div>

        {/* Content Section */}
        <div className="space-y-5 py-6">
          {/* Phone Number */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-[20px] w-[20px]" />
            <Skeleton className="h-5 w-[150px]" />
          </div>
          {/* Content */}
          <Skeleton className="h-[80px] w-full" />
        </div>

        {/* Button */}
        <Skeleton className="mt-[20px] h-[40px] w-full" />
      </div>
    </div>
  );
};

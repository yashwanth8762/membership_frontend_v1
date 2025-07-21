import { cn } from "../../lib/utils";

export const BentoGrid = ({
  className,
  children
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-end items-stretch w-full px-4 md:px-12">
      {/* Heading centered vertically with grid */}
      <div className="hidden md:flex flex-col justify-center items-end mr-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Activities</h2>
      </div>
      <div
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3 md:ml-auto md:mr-0",
          className
        )}>
        {children}
      </div>
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-gray-100 p-4 transition duration-200 hover:shadow-xl",
        className
      )}>
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div
          className="mt-2 mb-2 font-sans font-bold text-neutral-600">
          {title}
        </div>
        <div
          className="font-sans text-xs font-normal text-neutral-600">
          {description}
        </div>
      </div>
    </div>
  );
};

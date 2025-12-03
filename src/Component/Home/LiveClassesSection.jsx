import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";
import ClassCard from './../Shared/ClassCard/ClassCard';
import useClasses from "../../hooks/useClasses";

const Live = () => {
  const { classData, loading, error } = useClasses(2);

  return (
    <div className="bg-blue-50 py-8 px-4">
      <div className="mb-6 px-2">
        <h3 className="text-3xl font-bold mb-0">Live Classes</h3>
        {error && <div className="text-red-600 mt-2">Error: {error}</div>}
        <div className="mt-1">
          <div className="h-[3px] w-28 bg-purple-400 rounded-full" />
          <div className="h-[3px] w-20 bg-purple-300 rounded-full mt-1" />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx}>
              <div className="rounded-xl bg-white border border-gray-200 shadow-md">
                <div className="overflow-hidden rounded-t-xl">
                  <ShimmerThumbnail height={160} rounded />
                </div>
                <div className="p-4">
                  <ShimmerTitle line={2} gap={10} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : classData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classData.slice(0, 4).map((ev) => (
            <div key={ev.subject_id}>
              <ClassCard data={ev} link={`/details-live/${ev.subject_id}`} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-600 text-center text-lg">
          No recorded classes available.
        </div>
      )}

      {classData.length > 4 && (
        <div className="flex justify-end mt-6">
          <Link
            to="/live-class"
            className="inline-flex items-center gap-2 text-white bg-purple-700 font-bold px-4 py-1.5 rounded shadow transition hover:bg-purple-800 hover:scale-105 duration-200"
          >
            View all
            <span className="text-xl">
              <MdKeyboardDoubleArrowRight />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Live;

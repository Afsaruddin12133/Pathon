import ClassCard from "../../Component/Shared/ClassCard/ClassCard";
import Pagination from "../../Component/Shared/Pagination/Pagination";
import useClasses from "../../hooks/useClasses";


const LiveClass = () => {

  const { classData, loading, error, pagination, setPage } = useClasses(2);

  return (
    <div className="bg-blue-50 py-10">
      <div className="bg-blue-50 py-10 max-w-7xl px-4 mx-auto">
        <h1 className="text-center text-3xl font-bold mb-6">
          <span className="inline-flex items-center rounded-lg border border-purple-600 px-5 py-1.5 text-text-black/80 font-bold text-2xl lg:text-3xl">
            Live Class
          </span>
        </h1>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!loading &&
            classData.map((ev) => (
              <ClassCard
                key={ev.subject_id}
                link={`/details-live/${ev.subject_id}`}
                data={ev}
              />
            ))}
        </div>

        {/* Pagination Section */}
        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default LiveClass;

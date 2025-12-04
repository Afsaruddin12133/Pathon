import { useEffect, useState } from "react";
import { classService } from "../api/services/classService";

export default function useClasses(type, initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [classData, setClassData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    classService
      .getAllClasses(page, type)
      .then(({ data, pagination }) => {
        setClassData(data);
        setPagination(pagination);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [type, page]);

  // RETURN setPage!
  return { classData, pagination, loading, error, setPage };
}

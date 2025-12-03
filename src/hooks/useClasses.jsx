import { useEffect, useState } from "react";
import Image from "../assets/Images/8.jpg";
import { Base_url } from './../api/api';

const useClasses = (number) => {
  const [classData, setClassData] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`${Base_url}getAllClass?page=${page}&type=${number}`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const raw = json?.data ?? json?.items ?? [];

        const normalized = raw.map((c) => ({
          subject_id: c.subject_id,
          title: c.title,
          name: c.full_name,
          headerImageVideo: c?.headerImageVideo
            ? `https://apidocumentationpathon.pathon.app/${c.headerImageVideo}`
            : Image,
          enroll: c.enrollment,
          class: c.class,
          rating: c.rating,
          ratingNo: c.rating_count,
          amount: c.price,
          country: c.country,
          negotiable: c.isNegotiable === 1 ? "Negotiable" : "Non-negotiable",
          type: "Live",
        }));

        const paginationObj = {
          current_page: json?.current_page ?? page,
          last_page: json?.last_page ?? 1,
        };

        setClassData(normalized);
        setPagination(paginationObj);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, number]); // Added 'number' to dependencies

  return { classData, loading, error, page, setPage, pagination };
};

export default useClasses;
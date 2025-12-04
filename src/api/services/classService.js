import Image from "../../assets/images/8.jpg";
import { api, BASE_URL } from "../apiClient";


export const classService = {
  async getAllClasses(page, number) {
    const json = await api.get(`getAllClass?page=${page}&type=${number}`);

    const raw = json?.data ?? json?.items ?? [];

    // Normalize your class structure
    const normalized = raw.map((c) => ({
      subject_id: c.subject_id,
      title: c.title,
      name: c.full_name,
      headerImageVideo: c?.headerImageVideo
        ? `${BASE_URL}${c.headerImageVideo}`
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

    return {
      data: normalized,
      pagination: paginationObj,
    };
  },
};

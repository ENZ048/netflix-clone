import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetCategory = (category) => {
  const [categoryContent, setCategoryContent] = useState([]);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getCategoryContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/category/${category}`);
        setCategoryContent(res.data.content.results);
      } catch (err) {
        console.error(`Error fetching ${category} ${contentType}`, err);
      }
    };

    getCategoryContent();
  }, [contentType, category]);

  return { categoryContent };
};

export default useGetCategory;

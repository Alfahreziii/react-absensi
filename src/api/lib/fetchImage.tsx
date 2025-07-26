// file: src/api/lib/fetchImage.ts
import axios from "../lib/axios";

export const fetchImageWithAuth = async (filename: string): Promise<string> => {
  const response = await axios.get(`/file/${filename}`, {
    responseType: "blob", // tetap pakai blob
    // Authorization header tidak diperlukan lagi
  });

  return URL.createObjectURL(response.data); // ubah blob jadi URL sementara
};

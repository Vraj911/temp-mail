import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
export interface Email {
  _id: string;
  address: string;
  prefix: string;
  user_id: string;
  status: string;
  expires_at: string;
  created_at: string;
}
export const fetchEmails = async (): Promise<Email[]> => {
  const response = await axios.get(`${BACKEND_URL}/api/dashboard/emails`);
  return response.data;
};

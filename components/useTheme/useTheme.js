import { GET_THEME } from "../../services/endpoints";
import useFetch from "../../components/useFetch/useFetch";
import { useRouter } from "next/router";
function useTheme() {
  async function getTheme(language) {
    const [getFetch] = useFetch();
    let data = null;
    try {
      const res = await getFetch(
        GET_THEME,
        process.env.NEXT_PUBLIC_MERCHANT,
        language
      );
      data = await res.json();
    } catch (e) {}
    return data;
  }

  return [getTheme];
}
export default useTheme;

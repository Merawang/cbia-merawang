import axios from "axios";
import { useEffect } from "react";

const useFetch = ({ url, setData, setMessage, setLoading }) => {

    useEffect(() => {
        (
            async () => {
                setLoading(true);
                try {
                    const response = await axios.get(url);

                    setData(response.data)
                    setMessage({ error: false, severity: 'success', message: `Sukses melakukan fetch data` })

                }
                catch (error) {
                    alert(error.message);
                    console.error(error);

                    setMessage({ error: true, severity: 'error', message: error.message || `Terjadi kesalahan pada server` });
                }
                finally {
                    setLoading(false);
                }
            }
        )();
    }, [])

}

export default useFetch;
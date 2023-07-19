import axios from "axios";

const useDelete = ({ data, url, setData, setMessage, setLoading }) => {
    const remove = async (column, row) => {
        setLoading(true);
        try {
            const response = await axios.delete(`${url}/${column}/${row?.NamaObat}`);

            setData(data.filter((item) => { return item?.NamaObat !== row?.NamaObat }));
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

    const handleDelete = async (e, column, row) => {
        e.stopPropagation();
        e.preventDefault();

        if (window.confirm(`Are you want to delete ${row.NamaObat}?`)) {
            await remove(column, row);
        }

    }

    return { remove, handleDelete };

}

export default useDelete;
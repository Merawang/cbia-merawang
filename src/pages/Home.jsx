import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import AddIcon from '@mui/icons-material/Add';

import useFetch from '@/hooks/useFetch';
import useDelete from '@/hooks/useDelete';
import SearchBox from '@/components/SearchBox';

const Home = () => {

    // Constant
    const url = `${import.meta.env.VITE_BASEURL}`;
    const forms = `${import.meta.env.VITE_GFORM}`;

    // Data
    const [data, setData] = useState([]);
    const [message, setMessage] = useState({});
    const [isLoading, setLoading] = useState(false);

    // Fetch
    useFetch({ url, setData, setLoading, setMessage });

    // Delete
    const { handleDelete } = useDelete({ data, url, setData, setLoading, setMessage })

    // Dialog
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    // Search
    const [searchText, setSearchText] = useState('')
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => setFilteredData(data), [data]);

    const filter = (value) => {
        const filtered = data?.filter((item) =>
            item?.NamaObat?.toLowerCase().includes(value.toLowerCase())
        );

        filtered[0] ? setFilteredData(filtered) : setFilteredData([]);
    }


    return (<>
        <h1 className="text-black font-bold text-xl md:text-2xl text-center mb-5">Daftar Obat:</h1>
        <div className="flex flex-col justify-center items-center space-y-5">
            <div id="search" className='w-full'>
                <SearchBox
                    placeholder={'Contoh: Paracetamol'}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    filter={filter}
                />
            </div>
            <section id="table" className='w-full h-[60vh] overflow-y-auto'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dibuat</TableCell>
                                <TableCell align="left">Nama Obat</TableCell>
                                <TableCell align="left">Zat Aktif</TableCell>
                                <TableCell align="left">Jumlah (kapsul)</TableCell>
                                <TableCell align="left">Kedaluarsa (tahun)</TableCell>
                                <TableCell align="left">Kotak Obat</TableCell>
                                <TableCell align="left">Catatan</TableCell>
                                <TableCell align="left">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading && <TableRow><TableCell align="left"><span className='font-bold' >Memuat..</span></TableCell></TableRow>}
                            {message?.error && <TableRow><TableCell align="left"><span className='font-bold' >{message?.message || 'Terjadi error pada sistem'}</span></TableCell></TableRow>}
                            {filteredData?.map((row, i) => (
                                <TableRow
                                    key={row?.Timestamp}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row?.Timestamp.split(' ')[0]}
                                    </TableCell>
                                    <TableCell align="left">{row?.NamaObat || '-'}</TableCell>
                                    <TableCell align="left">{row?.ZatAktif?.split(', ').map((item) => <Chip size='small' className='mr-1 mb-1' color='warning' label={item || '-'} />)}</TableCell>
                                    <TableCell align="left">{row?.Jumlah || '-'}</TableCell>
                                    <TableCell align="left">{row?.Kedaluarsa || '-'}</TableCell>
                                    <TableCell align="left">{row?.KotakObat || '-'}</TableCell>
                                    <TableCell align="left">{row?.Catatan || '-'}</TableCell>
                                    <TableCell align="left"><Button variant='contained' color='error' onClick={(e) => handleDelete(e, 'NamaObat', row)}>Hapus</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
            <div id="button" className='w-fit'>
                <Button variant="contained" target='_blank' className='w-fit' endIcon={<AddIcon />} href={forms}>
                    Tambah Obat
                </Button>
            </div>
        </div>
        <div className="text-center mt-4 mb-12 font-semibold underline text-gray-400">
            <button className='underline' onClick={handleOpen}>Cara Penggunaan 🛈</button>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <DialogTitle>
                    <p className="font-semibold">
                        Cara Penggunaan
                    </p>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lihat daftar obat pada tabel di atas. Apabila ingin menambah data obat, silakan lakukan klik pada tombol Tambah Obat
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    </>);
}

export default Home;
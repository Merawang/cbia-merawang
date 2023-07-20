import { useState } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';

import SearchIcon from '@mui/icons-material/Search';

const SearchBox = ({ placeholder, searchText, setSearchText, filter }) => {

    const sortList = [
        {
            title: 'Nama (A-Z)',
            value: 'nameAsc'
        },
        {
            title: 'Nama (Z-A)',
            value: 'nameDesc'
        },
    ]

    const [selectedSort, setSelectedSort] = useState('');

    const handleSort = (event) => {
        setSelectedSort(event.target.value);
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchText(value);
        filter(value);
    }


    return (<>
        <div className="search flex flex-row gap-2 items-start justify-center">
            <TextField
                fullWidth
                onChange={handleInputChange}
                label="Cari nama obat.."
                placeholder={placeholder}
                id="search"
                margin='dense'
                size='small'
                value={searchText}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
            <div className="sort">
                <FormControl sx={{ my: 1, minWidth: 80 }} size="small">
                    <InputLabel id="demo-select-small-label">Sort</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={selectedSort}
                        label="Sort"
                        onChange={handleSort}
                    >
                        {!!sortList.length && sortList.map((item, i) => {
                            return (
                                <MenuItem key={i} value={item.value}>{item.title}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
        </div>
    </>);
}

export default SearchBox;
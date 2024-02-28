// src/components/BlogList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, TextField, Box, Checkbox, FormControlLabel, Button } from '@mui/material';
import Entry from './Entry';
import UserProfile from './UserProfile';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const BlogList = () => {
    const [entries, setEntries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [searchQuery3, setSearchQuery3] = useState('');
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [newEntryData, setNewEntryData] = useState({
        title: '',
        author: '',
        content: '',
    });

    useEffect(() => {
        fetchEntries();
    }, [searchQuery, searchQuery1, searchQuery2, searchQuery3, advancedSearch]);

    const fetchEntries = async () => {
        try {
            const params = advancedSearch
                ? { title: searchQuery1, content: searchQuery2, author: searchQuery3 }
                : { title: searchQuery };

            const response = await axios.get('http://localhost:3001/entries', { params });

            setEntries(response.data);
        } catch (error) {
            console.error('Error al obtener las entradas:', error);
        }
    };

    const fetchData = async () => {
        try {
            let url = 'http://localhost:3001/entries';

            if (advancedSearch && searchQuery) {
                url += `?title=${searchQuery}`;
            }

            const response = await axios.get(url);
            setEntries(response.data);
        } catch (error) {
            console.error('Error al obtener las entradas:', error);
        }
    };

    const truncateContent = (content, maxLength) => {
        return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content;
    };

    const handleSearch = () => {
        fetchData();
    };

    const handleSearchInputChange = (e, field) => {
        switch (field) {
            case 'title':
                setSearchQuery1(e.target.value);
                break;
            case 'content':
                setSearchQuery2(e.target.value);
                break;
            case 'author':
                setSearchQuery3(e.target.value);
                break;
            default:
                setSearchQuery(e.target.value);
        }

        if (!advancedSearch) {
            handleSearch();
        }
    };

    const handleNewEntry = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDialogInputChange = (e, field) => {
        setNewEntryData({
            ...newEntryData,
            [field]: e.target.value,
        });
    };

    const handlePublish = async () => {
        try {
            if (!newEntryData.title || !newEntryData.author || !newEntryData.content) {
                console.error('Todos los campos son obligatorios');
                return;
            }

            await axios.post('http://localhost:3001/entries', newEntryData);

            fetchData();

            handleCloseDialog();
        } catch (error) {
            console.error('Error al agregar una nueva entrada:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h2" align="center" gutterBottom style={{ color: '#4b4870', fontWeight: 'bold' }}>
                Blog App
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3} md={3}>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNewEntry}
                        style={{ marginBottom: '20px', backgroundColor: '#4b4870' }}
                    >
                        Nueva entrada
                    </Button>

                    <UserProfile />

                    {advancedSearch ? (
                        <Box>
                            <TextField
                                fullWidth
                                label="Título"
                                variant="outlined"
                                disabled={!advancedSearch}
                                style={{ marginBottom: '10px' }}
                                value={searchQuery1}
                                onChange={(e) => handleSearchInputChange(e, 'title')}
                            />
                            <TextField
                                fullWidth
                                label="Contenido"
                                variant="outlined"
                                disabled={!advancedSearch}
                                style={{ marginBottom: '10px' }}
                                value={searchQuery2}
                                onChange={(e) => handleSearchInputChange(e, 'content')}
                            />
                            <TextField
                                fullWidth
                                label="Autor"
                                variant="outlined"
                                disabled={!advancedSearch}
                                style={{ marginBottom: '10px' }}
                                value={searchQuery3}
                                onChange={(e) => handleSearchInputChange(e, 'author')}
                            />
                        </Box>
                    ) : (
                        <TextField
                            fullWidth
                            label="Búsqueda por título"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => handleSearchInputChange(e, 'default')}
                        />
                    )}

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={advancedSearch}
                                onChange={() => setAdvancedSearch(!advancedSearch)}
                                color="primary"
                            />
                        }
                        label="Búsqueda avanzada"
                    />

                </Grid>

                <Grid item xs={12} sm={9} md={9}>
                    {entries.map(entry => (
                        <Grid key={entry.id} item xs={12} sm={12} md={12}>
                            <Entry entry={{ ...entry, content: truncateContent(entry.content, 70) }} />
                        </Grid>
                    ))}
                </Grid>

            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Nueva Entrada</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Título"
                        variant="outlined"
                        value={newEntryData.title}
                        onChange={(e) => handleDialogInputChange(e, 'title')}
                        style={{ marginTop: '10px', marginBottom: '20px' }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Autor"
                        variant="outlined"
                        value={newEntryData.author}
                        onChange={(e) => handleDialogInputChange(e, 'author')}
                        style={{ marginBottom: '20px' }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Contenido"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={newEntryData.content}
                        onChange={(e) => handleDialogInputChange(e, 'content')}
                        style={{ marginBottom: '20px' }}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePublish} color="primary">
                        Publicar
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default BlogList;
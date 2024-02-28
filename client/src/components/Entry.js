// src/components/Entry.js
import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { format } from 'date-fns';

const Entry = ({ entry }) => {
    const formattedDate = format(new Date(entry.publish_date), 'MMMM d, yyyy');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEntryDetails, setSelectedEntryDetails] = useState(null);

    const handleReadMore = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/entries/${entry.id}`);
            setSelectedEntryDetails(response.data);
            setOpenDialog(true);
        } catch (error) {
            console.error('Error al obtener detalles de la entrada:', error);
        }
    };

    return (
        <div style={{ position: 'relative', marginBottom: '60px' }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom style={{ color: '#4b4870', fontSize: '42px', fontWeight: 'bold' }}>
                        {entry.title}
                    </Typography>

                    <div>
                        <Typography color="textSecondary" gutterBottom>
                            {formattedDate}
                        </Typography>
                    </div>

                    <Typography variant="body2" component="div">
                        {entry.content}
                    </Typography>

                    <div style={{ textAlign: 'right' }}>
                        <Typography color="textSecondary" gutterBottom style={{ color: '#4b4870', fontSize: '18px', fontWeight: 'bold' }}>
                            {`${entry.author}`}
                        </Typography>
                    </div>
                </CardContent>
            </Card>

            <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', marginBottom: '-20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReadMore}
                    style={{ borderRadius: '0', backgroundColor: '#4b4870', fontWeight: 'bold', padding: '10px' }}
                >
                    Seguir leyendo...
                </Button>
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogContent>
                        {selectedEntryDetails && (
                            <div>
                                <Typography variant="h5" component="div" gutterBottom style={{ color: '#4b4870', fontSize: '42px', fontWeight: 'bold' }}>
                                    {selectedEntryDetails.title}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" gutterBottom style={{ marginBottom: '20px' }}>
                                    {format(new Date(selectedEntryDetails.publish_date), 'MMMM d, yyyy')}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {selectedEntryDetails.content}
                                </Typography>
                                <div style={{ textAlign: 'right' }}>
                                    <Typography color="textSecondary" gutterBottom style={{ color: '#4b4870', fontSize: '18px', fontWeight: 'bold' }}>
                                        Autor: {selectedEntryDetails.author}
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>


            </div>
        </div>
    );
};

export default Entry;

// src/components/UserProfile.js
import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';

const UserProfile = () => {
    return (
        <Box display="flex">
            <Avatar />
            <Box marginLeft={2} marginBottom={2}>
                <Typography variant="subtitle1" style={{ color: '#4b4870', fontWeight: 'bold' }}>
                    Admin
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Administrador
                </Typography>
            </Box>
        </Box>
    );
};

export default UserProfile;

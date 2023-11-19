import React from 'react';
import YouTube from 'react-youtube';
import {Card, CardContent, Grid, Typography} from '@mui/material';

const CourseMaterialsList = () => {
    const materials = [
        {
            title: 'Título del Material 1',
            videoLink: 'https://www.youtube.com/watch?v=video_id_1',
        },
        {
            title: 'Título del Material 2',
            videoLink: 'https://www.youtube.com/watch?v=video_id_2',
        },
        // Agrega más materiales según sea necesario
    ];

    const opts = {
        height: '200',
        width: '500',
    };

    return (
        <Grid container spacing={2}>
            {materials.map((material, index) => (
                <Grid item xs={12} key={index} container justifyContent="center">
                    <Card elevation={0} style={{ maxWidth: '500px', margin: '16px' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" justifyContent="center">
                                {material.title}
                            </Typography>
                            <YouTube videoId={material.videoLink.split('v=')[1]} opts={opts} />
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CourseMaterialsList;
import React from 'react';
import YouTube from 'react-youtube';
import { Card, CardContent, Typography } from '@mui/material';

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
        width: '300',
    };

    return (
        <div>
            {materials.map((material, index) => (
                <Card key={index} style={{ maxWidth: '320px', margin: '16px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {material.title}
                        </Typography>
                        <YouTube videoId={material.videoLink.split('v=')[1]} opts={opts} />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default CourseMaterialsList;
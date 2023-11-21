import React from 'react';
import YouTube from 'react-youtube';
import { Card, CardContent, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CourseMaterialsList = ({ courseSections }) => {
    // Check if courseSections is null or empty and handle accordingly
    if (!courseSections || courseSections.length === 0) {
        return (
            <Typography variant="subtitle1" style={{ margin: '20px' }}>
                No course materials available.
            </Typography>
        );
    }

    return (
        <Grid container spacing={2}>
            {courseSections.map((section, sectionIndex) => (
                <Grid item xs={12} key={sectionIndex}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">{section.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                {section.videos.map((video, videoIndex) => (
                                    <Grid item xs={12} key={videoIndex}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="subtitle1">{video.title}</Typography>
                                                <Typography variant="body2">{video.description}</Typography>
                                                <YouTube videoId={new URL(video.link).searchParams.get('v')} />
                                                <Typography variant="body2">Duration: {video.duration}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            ))}
        </Grid>
    );
};

export default CourseMaterialsList;

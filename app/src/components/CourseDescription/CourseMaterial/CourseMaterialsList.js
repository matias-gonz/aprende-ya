import React from 'react';
import YouTube from 'react-youtube';
import { Card, CardContent, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CourseMaterialsList = ({ courseSections }) => {

    const [expandedSection, setExpandedSection] = React.useState(null);
    const [expandedVideo, setExpandedVideo] = React.useState(null);

    const handleSectionAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedSection(isExpanded ? panel : false);
        if (isExpanded) setExpandedVideo(null); // Close any open video if a section is expanded
    };

    const handleVideoAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedVideo(isExpanded ? panel : false);
    };

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


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
                <Grid item xs={12} key={section.id}>
                    <Accordion
                        expanded={expandedSection === `section-${section.id}`}
                        onChange={handleSectionAccordionChange(`section-${section.id}`)}
                        className="courseSection"
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="sectionHeader">
                            <Typography className="sectionTitle">{section.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="sectionDetails">
                            <Grid container direction="column" spacing={2}>
                                {section.videos.map((video, videoIndex) => (
                                    <Grid item xs={12} key={`video-${video.id}`}>
                                        <Accordion
                                            expanded={expandedVideo === `video-${video.id}`}
                                            onChange={handleVideoAccordionChange(`video-${video.id}`)}
                                            className="videoAccordion"
                                        >
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="videoSummary">
                                                <Typography variant="subtitle1" className="videoTitle">{video.title}</Typography>
                                                <Typography variant="caption" className="videoDuration">{formatDuration(video.duration)}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails className="videoDetails">
                                                <Typography variant="body2" className="videoDescription">{video.description}</Typography>
                                                {expandedVideo === `video-${video.id}` && (
                                                    <div className="videoContainer">
                                                        <YouTube videoId={new URL(video.link).searchParams.get('v')} />
                                                    </div>
                                                )}
                                            </AccordionDetails>
                                        </Accordion>
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

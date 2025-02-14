import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function CustomBreadcrumbs() {
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            <Link underline="hover" color="inherit" href="/">
                <HomeIcon fontSize="small" sx={{ verticalAlign: 'middle', mb: 0.2 }} />
            </Link>
            <Link underline="hover" color="inherit" href="/projects">
                Projects
            </Link>
            <Typography color="text.primary">Project Nero</Typography>
        </Breadcrumbs>
    );
}

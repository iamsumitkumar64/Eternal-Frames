import { Box, Typography, Button } from '@mui/material';
import styles from './welcome.module.css';

export default function WelcomePage() {
    return (
        <Box component="main" className={styles.container}>
            <Box className={styles.hero}>
                <Box>
                    <Typography variant="h2" component="h1" className={styles.title}>
                        Welcome!
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        This is a fully static server page using Material UI and CSS Modules.
                    </Typography>
                </Box>

                <Box>
                    <Button
                        variant="contained"
                        className={styles.btn}
                        sx={{ width: '150px' }}
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="outlined"
                        className={styles.btn}
                        sx={{ width: '150px' }}
                    >
                        Learn More
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

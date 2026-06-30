import { Box, Typography } from '@mui/material';
import styles from './auth-layout.module.css';

export default function AuthLayoutComp() {
    return (
        <Box className={styles.container}>
            <Box className={styles.leftContainer}>
                <Typography className={styles.title}>Eternal Frames</Typography>
            </Box>

            <Box className={styles.rightContainer}>
                <Typography className={styles.description}>"The architecture of a moment, preserved forever."</Typography>
            </Box>
        </Box>
    )
}
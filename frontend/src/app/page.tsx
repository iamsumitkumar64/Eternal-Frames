import { Box } from '@mui/material';
import styles from './home.module.css';
import HomeHeaderComp from '@/component/home-page/header/header';

export default function HomePage() {
    return (
        <Box className={styles.container}>
            <Box className={styles.headerBox}>
                <HomeHeaderComp />
            </Box>

        </Box>
    )
}
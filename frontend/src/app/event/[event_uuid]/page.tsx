import { Box, } from '@mui/material';
import styles from './event.module.css';
import HomeHeaderComp from '@/component/common/header/header';

export default function HomePage() {
    return (
        <Box className={styles.container}>
            <Box className={styles.headerBox}>
                <HomeHeaderComp />
            </Box>

        </Box>
    )
}
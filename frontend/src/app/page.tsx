import { Box, Button, Typography } from '@mui/material';
import styles from './home.module.css';
import HomeHeaderComp from '@/component/home-page/header/header';
import Image from 'next/image';

export default function HomePage() {
    return (
        <Box className={styles.container}>
            <Box className={styles.headerBox}>
                <HomeHeaderComp />
            </Box>

            <Box className={styles.businessInfo}>
                <Box className={styles.leftbusinessInfoBox}>
                    <Typography className={styles.businessEstablished}>Est. 2024</Typography>

                    <Box className={styles.businessInfoDetails}>
                        <Typography component="div" className={styles.businessInfoTitle}>
                            Eternal Frames — Preservation of
                            <Typography component="span">Milestone Memories.</Typography>
                        </Typography>

                        <Typography className={styles.businessInfoDescription}>Elevating your professional artistry through seamless digital preservation and immersive gallery experiences.</Typography>
                    </Box>

                    <Box className={styles.businessInfoButtons}>
                        <Button className={styles.businessInfoGetStartedButton}>
                            Get Started
                        </Button>
                        <Button className={styles.businessInfoExploreFeatureButton}>
                            Explore Features
                        </Button>
                    </Box>
                </Box>

                <Box className={styles.rightbusinessInfoBox}>
                    <Image src={'/home-page/rightBusinessInfo.jpg'} alt='rightBusinessInfo.jpg' width={100} height={100} />
                </Box>
            </Box>
        </Box>
    )
}
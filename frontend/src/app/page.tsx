import { Box, Button, Typography } from '@mui/material';
import styles from './home.module.css';
import HomeHeaderComp from '@/component/home-page/header/header';
import Image from 'next/image';
import CheckIcon from '@mui/icons-material/Check';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function HomePage() {
    return (
        <Box className={styles.container}>
            <Box className={styles.headerBox}>
                <HomeHeaderComp />
            </Box>

            <Box className={styles.businessInfo}>
                <Box className={styles.leftbusinessInfoBox}>
                    <Typography className={styles.businessEstablished} component="span">Est. 2024</Typography>

                    <Box className={styles.businessInfoDetails}>
                        <Typography component="div" className={styles.businessInfoTitle}>
                            Eternal Frames — Preservation of
                            <Typography component="span" className={styles.businessInfoTitleSpan}> Milestone Memories.</Typography>
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
                    <Box className={styles.buisnessInfoImageBox}>
                        <Image src={'/home-page/rightBusinessInfo.jpg'} alt='rightBusinessInfo.jpg' width={100} height={100} className={styles.buisnessInfoImage} />
                    </Box>

                    <Box className={styles.buisnessInfoImageTagBox}>
                        <CheckIcon className={styles.iconButton} />

                        <Box className={styles.buisnessInfoImageTagInfo}>
                            <Typography className={styles.buisnessInfoImageTagInfop1}>Trusted by Professionals</Typography>
                            <Typography className={styles.buisnessInfoImageTagInfop2}> Premium Standard</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box className={styles.coreCapabilites}>
                <Typography className={styles.coreCapabilitesTitle} >Core Capabilities</Typography>

                <Box className={styles.capabilityContainer}>
                    <Box className={styles.capabilityBox}>
                        <QrCodeScannerIcon className={styles.capabilityBoxIconButton} />
                        <Typography className={styles.capabilityTitle} >Instant QR Sharing</Typography>
                        <Typography className={styles.capabilityDescription} >Generate elegant, customizable QR codes for instant event-wide photo access and engagement.</Typography>
                    </Box>

                    <Box className={styles.capabilityBox}>
                        <HighQualityIcon className={styles.capabilityBoxIconButton} />
                        <Typography className={styles.capabilityTitle} >Infinite Resolution</Typography>
                        <Typography className={styles.capabilityDescription} >Preserve every pixel with our high-fidelity storage system designed for the most demanding visual artists.</Typography>
                    </Box>

                    <Box className={styles.capabilityBox}>
                        <AutoAwesomeIcon className={styles.capabilityBoxIconButton} />
                        <Typography className={styles.capabilityTitle} >Crowdsourced Magic</Typography>
                        <Typography className={styles.capabilityDescription} >Effortlessly collect and curate moments from every attendee into a single, cohesive masterpiece.</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
import { Box, Button, Typography } from '@mui/material';
import styles from './home.module.css';
import HomeHeaderComp from '@/component/common/header/header';
import Image from 'next/image';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CollectionsIcon from '@mui/icons-material/Collections';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import NavButton from '@/component/common/nav-button/nav-button';

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
                        <Box className={styles.buisnessInfoIconInfo}>
                            <VerifiedOutlinedIcon className={styles.verifyIconButton} />
                        </Box>

                        <Box className={styles.buisnessInfoImageTagInfo}>
                            <Typography className={styles.buisnessInfoImageTagInfop1}>Trusted by Professionals</Typography>
                            <Typography className={styles.buisnessInfoImageTagInfop2}> Premium Standard</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box className={styles.coreCapabilites}>
                <Box className={styles.coreCapabilitesTitleBox}>
                    <Typography className={styles.coreCapabilitesTitle} >Core Capabilities</Typography>
                    <Typography className={styles.coreCapabilitesdivider} ></Typography>
                </Box>

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


            <Box className={styles.chooseExperience}>
                <Box className={styles.chooseExperienceTitleBox}>
                    <Typography className={styles.chooseExperienceTitle} >Choose Your Experience</Typography>
                    <Typography className={styles.chooseExperienceDescription}>Select the path that best fits your needs today. Whether preserving a single moment or managing a legacy.</Typography>
                </Box>

                <Box className={styles.chooseExperienceContainer}>
                    <Box className={styles.chooseExperienceBox}>
                        <CollectionsIcon className={styles.chooseExperienceBoxIconButton} />

                        <Box>
                            <Typography className={styles.chooseExperienceBoxTitle} >Simple User</Typography>
                            <Typography className={styles.chooseExperienceBoxDescription} >Register to watch and download beautifully captured moments. Get your exclusive event link directly from the studio.</Typography>
                        </Box>

                        <NavButton
                            title="Register As User"
                            redirectTo="/auth/user/register"
                            sx={{
                                width: '100%',
                                borderRadius: '4px',
                                padding: '2% 0',
                                color: '#6e4700',
                                border: '2px solid #CBA65E',
                                '&:hover': {
                                    border: '2px solid #CBA65E',
                                    backgroundColor: 'rgba(203, 166, 94, 0.08)',
                                },
                            }}
                        />
                    </Box>

                    <Box className={styles.chooseExperienceBox}>
                        <CameraEnhanceIcon className={styles.chooseExperienceBoxIconButton} />

                        <Box>
                            <Typography className={styles.chooseExperienceBoxTitle} >Professional Studio</Typography>
                            <Typography className={styles.chooseExperienceBoxDescription} >Register your studio to start creating high-end event galleries, managing your portfolio, and delivering premium digital experiences.</Typography>
                        </Box>

                        <NavButton
                            title="Create Studio Account"
                            redirectTo="/auth/studio/welcome"
                            sx={{
                                width: '100%',
                                borderRadius: '4px',
                                padding: '2% 0',
                                color: 'white',
                                backgroundColor: '#6e4700',
                                border: '2px solid #6e4700',
                                '&:hover': {
                                    backgroundColor: '#543500',
                                    borderColor: '#543500',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
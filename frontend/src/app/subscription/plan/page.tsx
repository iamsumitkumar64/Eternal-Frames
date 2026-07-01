import { Box, Typography } from '@mui/material';
import styles from './plan.module.css';
import HomeHeaderComp from '@/component/common/header/header';
import SubscriptionPlanComp from '@/component/subscription-plan/subscription-plan';
import NavButton from '@/component/common/nav-button/nav-button';

export default function SubscriptionPlanPage() {

    return (
        <Box className={styles.container}>
            <Box className={styles.headerBox}>
                <HomeHeaderComp />
            </Box>

            <Box className={styles.bottombody}>
                <Box className={styles.header}>
                    <Typography className={styles.title}>
                        Choose Your Legacy
                    </Typography>

                    <Typography className={styles.description}>
                        Secure your creative future with a platform designed to honor every frame. Select the plan that aligns with your artistic vision.
                    </Typography>
                </Box>

                <Box className={styles.planBox}>
                    <SubscriptionPlanComp />
                </Box>

                <Box className={styles.footer}>
                    <Typography className={styles.footerTitle}>
                        Want to decide later? You can manage your subscription anytime from your studio profile.
                    </Typography>

                    <NavButton
                        title="Create Studio Account"
                        redirectTo="/gallery"
                        sx={{
                            width: 'fit-content',
                            padding: '.5% 1%',
                            color: '#1c1200',
                            bgcolor: 'transparent',
                            borderBottom: '2px solid #c97f00',
                            '&:hover': {
                                borderColor: '#915c01',
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}
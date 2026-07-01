import { Box, Typography } from '@mui/material';
import styles from './plan.module.css';
import HomeHeaderComp from '@/component/common/header/header';

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
            </Box>
        </Box>
    )
}
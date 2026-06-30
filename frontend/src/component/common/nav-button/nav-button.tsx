'use client';

import { Button, ButtonProps } from '@mui/material';
import { useRouter } from 'next/navigation';

interface NavButtonProps extends ButtonProps {
  title: string;
  redirectTo: string;
}

export default function NavButton({
  title,
  redirectTo,
  sx,
  variant,
  ...rest
}: NavButtonProps) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(redirectTo)}
      sx={sx}
      variant={variant}
      {...rest}
    >
      {title}
    </Button>
  );
}

"use client";

import styles from "./event.form.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, IconButton, InputLabel, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks.ts";
import { enqueueSnackbar } from "notistack";
import { createEvent, uploadEventImage } from "@/redux/feature/event/event.action";
import { MultiFileUpload } from "mui-file-upload";
import { createEventSchema, CreateEventSchemaType } from "@/schemas/event-create";
import { CreateEventPayload } from "@/redux/feature/event/event.type";
import CloseIcon from "@mui/icons-material/Close";

const MAX_FILES = 1;
interface EventFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EventFormModalComp({ isOpen, onClose }: EventFormModalProps) {
    const dispatch = useAppDispatch();
    const [files, setFiles] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CreateEventSchemaType>({
        resolver: zodResolver(createEventSchema),
    })

    const uploadService = async (
        file: File,
        onProgress: (progress: number) => void
    ): Promise<string> => {
        return new Promise((resolve) => {
            let progress = 0;

            const interval = setInterval(() => {
                progress += 10;
                onProgress(progress);

                if (progress >= 100) {
                    clearInterval(interval);
                    resolve("ok");
                }
            }, 150);
        });
    };

    const onSubmit = async (data: CreateEventPayload) => {
        try {
            let images: any[] = [];

            if (files.length > MAX_FILES) {
                enqueueSnackbar(`You can only upload up to ${MAX_FILES} images`, { variant: "warning" });
                return;
            }

            if (files.length > 0) {
                const image_urls = await dispatch(uploadEventImage(files)).unwrap();

                images = image_urls.image_urls.map((img: any) => ({
                    image_url: img.path,
                }));
            }

            await dispatch(createEvent({ ...data, image_url: images[0].image_url })).unwrap();
            reset();
            setFiles([]);
        } catch (error) {
            enqueueSnackbar(String(error || "Something wrong"), { variant: "error" });
            console.log(error)
        }
    }

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box className={styles.modalContainer}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Box className={styles.field}>
                        <InputLabel htmlFor={`${2}-input`} className={styles.label}>Title</InputLabel>

                        <TextField
                            id={`${2}-input`}
                            type="title"
                            placeholder="wedding event"
                            fullWidth
                            {...register("title")}
                            variant="standard"
                        />
                        {errors.title && (
                            <span className={styles.error}>
                                {errors.title.message}
                            </span>
                        )}
                    </Box>

                    <Box className={styles.field}>
                        <InputLabel htmlFor={`${2}-input`} className={styles.label}>Description</InputLabel>

                        <TextField
                            id={`${2}-input`}
                            type="description"
                            placeholder="wedding event is wonderful at location organized by ...."
                            fullWidth
                            {...register("description")}
                            variant="standard"
                        />
                        {errors.description && (
                            <span className={styles.error}>
                                {errors.description.message}
                            </span>
                        )}
                    </Box>

                    <Box className={styles.field}>
                        <InputLabel htmlFor={`${2}-input`} className={styles.label}>Location</InputLabel>

                        <TextField
                            id={`${2}-input`}
                            type="location"
                            placeholder="34 Street NewYork"
                            fullWidth
                            {...register("location")}
                            variant="standard"
                        />
                        {errors.location && (
                            <span className={styles.error}>
                                {errors.location.message}
                            </span>
                        )}
                    </Box>

                    <MultiFileUpload
                        // sx={{
                        //     sx: {
                        //         width: "90%",
                        //         height: "100%",
                        //         display: "flex",
                        //         justifyContent: "center",
                        //         alignItems: "center"
                        //     }
                        // }}
                        uploadService={uploadService}
                        acceptsOnly="image/*"
                        onSuccessfulUpload={(fileUpload: any) => {
                            setFiles((prev) => {
                                if (prev.length > MAX_FILES) {
                                    console.log(prev, prev.length, MAX_FILES);
                                    enqueueSnackbar(`You can't upload more than ${MAX_FILES} images`, { variant: "warning" });
                                    return prev;
                                }
                                const exists = prev.some(f => f.name === fileUpload.file.name);

                                if (exists) return prev;

                                return [...prev, fileUpload.file];
                            });
                        }}
                    />

                    <Box className={styles.fileList}>
                        {files.map((file, i) => (
                            <Box key={i} className={styles.fileItem}>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                                    className={styles.fileItem}
                                />
                                <IconButton size="small" onClick={() => removeFile(i)}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>

                    <Button
                        type="submit"
                        className={styles.button}
                    >
                        Create Event
                    </Button>
                </form>

            </Box>
        </Modal>
    );
}
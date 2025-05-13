import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const CaseCard = ({ caseItem, allCategories }) => {
    const bg = caseItem.images?.[0]
        ? `url(https://backend.alazarstudio.ru/uploads/${caseItem.preview})`
        : undefined;

    const matchedCategories = allCategories.filter(cat =>
        caseItem.categoryIds?.includes(cat.id)
    );

    return (
        <Box
            sx={{
                width: 400,
                height: 450,
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundImage: bg,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                color: 'white',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                boxShadow: 5,
                textAlign: 'center',
                backgroundBlendMode: 'darken',
                outline: '1px solid red'
            }}
        >
            {/* Затемняющий слой */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.35)', // степень затемнения
                    zIndex: 1,
                }}
            />
            <Box sx={{
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '30px',
                mb: '28px'
            }}>
                {matchedCategories.map(cat => (
                    <Typography key={cat.id} sx={{
                        fontSize: '13px',
                        fontWeight: "500",
                        fontStyle: "normal",
                        textAlign: "center",
                        color: "#FFFFFFB2",
                    }}>
                        {cat.name}
                    </Typography>
                ))}
            </Box>
            <Box sx={{ zIndex: 2 }}>
                <Typography sx={{
                    zIndex: 2,
                    fontWeight: 700,
                    fontSize: '30px',
                    textAlign: 'center',
                    verticalAlign: 'middle'
                }}>
                    {caseItem.title}
                </Typography>
            </Box>
        </Box >
    );
};

export default CaseCard;

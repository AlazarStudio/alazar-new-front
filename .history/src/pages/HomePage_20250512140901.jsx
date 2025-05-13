import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Button, Grid, Chip
} from '@mui/material';
import Header from '../components/Header';
import CaseCard from '../components/CaseCard';
import CaseModal from '../components/CaseModal';

const HomePage = () => {
    const [cases, setCases] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCase, setSelectedCase] = useState(null);
    const [developers, setDevelopers] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch('https://backend.alazarstudio.ru/api/cases').then(res => res.json()),
            fetch('https://backend.alazarstudio.ru/api/categories').then(res => res.json()),
            fetch('https://backend.alazarstudio.ru/api/developers').then(res => res.json()),
        ]).then(([caseData, categoryData, developerData]) => {
            setCases(caseData);
            setCategories(categoryData);
            setDevelopers(developerData);
        });
    }, []);

    const filteredCases = activeCategoryId
        ? cases.filter(c => c.categoryIds.includes(activeCategoryId))
        : cases;

    return (
        <Box>
            {/* Header */}
            <Header
                activeCategoryId={activeCategoryId}
                onCategorySelect={(id) => setActiveCategoryId(id)}
            />

            {/* Сетка кейсов */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width:'100%', outline: '1px solid red', justifyContent: 'center', py: 4 }}>
                {filteredCases.map(c => (
                    <Box key={c.id} onClick={() => setSelectedCase(c)} sx={{ cursor: 'pointer' }}>
                        <CaseCard caseItem={c} allCategories={categories} />
                    </Box>
                ))}
            </Box>


            {/* Подвал */}
            <Box sx={{ textAlign: 'center', py: 4, color: '#666' }}>
                ©2024 ALAZAR STUDIO. ALL RIGHT RESERVED.
            </Box>

            <CaseModal
                open={Boolean(selectedCase)}
                onClose={() => setSelectedCase(null)}
                caseItem={selectedCase}
                allDevelopers={developers}
                allCategories={categories}
            />
        </Box>
    );
};

export default HomePage;

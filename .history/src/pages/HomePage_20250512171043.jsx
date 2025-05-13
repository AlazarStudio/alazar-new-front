import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header/Header';
import CaseCard from '../components/CaseCard/CaseCard';
import CaseModal from '../components/CaseModal/CaseModal';
import styles from './HomePage.module.css';

import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';


const HomePage = () => {
  const [cases, setCases] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [developers, setDevelopers] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('https://backend.alazarstudio.ru/api/cases').then((res) => res.json()),
      fetch('https://backend.alazarstudio.ru/api/categories').then((res) => res.json()),
      fetch('https://backend.alazarstudio.ru/api/developers').then((res) => res.json()),
    ]).then(([caseData, categoryData, developerData]) => {
      setCases(caseData);
      setCategories(categoryData);
      setDevelopers(developerData);
    });
  }, []);

  const filteredCases = activeCategoryId
    ? cases.filter((c) => c.categoryIds.includes(activeCategoryId))
    : cases;

  return (
    <Box className={styles.container}>
      <Header
        activeCategoryId={activeCategoryId}
        onCategorySelect={(id) => setActiveCategoryId(id)}
      />

      <Box className={styles.casesWrapper}>
        {filteredCases.map((c) => (
          <Box
            key={c.id}
            className={styles.caseBox}
            onClick={() => setSelectedCase(c)}
          >
            <CaseCard caseItem={c} allCategories={categories} />
          </Box>
        ))}
      </Box>

      <Box className={styles.footer}>
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

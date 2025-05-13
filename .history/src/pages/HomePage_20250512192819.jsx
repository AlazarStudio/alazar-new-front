import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import CaseCard from '../components/CaseCard/CaseCard';
import CaseModal from '../components/CaseModal/CaseModal';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [cases, setCases] = useState([]);
  const [categories, setCategories] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const encodeSlug = (str) => str.replace(/\s+/g, '-');
const decodeSlug = (str) => str.replace(/-/g, ' ');


  // Загрузка данных
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

  // Анализ pathname → category / case
  useEffect(() => {
    const path = decodeURIComponent(location.pathname).slice(1); // убираем первый "/"
    const parts = path.split('/').filter(Boolean);

    const [part1, part2] = parts;

    const decodedPart1 = decodeSlug(part1 || '');
    const decodedPart2 = decodeSlug(part2 || '');
    
    const category = categories.find(cat => cat.name === decodedPart1);
    const caseFromFirst = cases.find(c => String(c.id) === part1);
    const caseFromSecond = cases.find(c => String(c.id) === part2);
    

    if (category) {
      setActiveCategoryId(category.id);
    } else {
      setActiveCategoryId(null);
    }

    if (caseFromFirst) {
      setSelectedCase(caseFromFirst);
    } else if (caseFromSecond) {
      setSelectedCase(caseFromSecond);
    } else {
      setSelectedCase(null);
    }
  }, [location.pathname, categories, cases]);

  const filteredCases = activeCategoryId
    ? cases.filter((c) => c.categoryIds.includes(activeCategoryId))
    : cases;

  const handleCategorySelect = (id) => {
    const category = categories.find(cat => cat.id === id);
    setActiveCategoryId(id);
    if (category) {
      navigate(`/${encodeSlug(category.name)}`);
    } else {
      navigate(`/`);
    }
  };

  const handleCaseClick = (c) => {
    const category = categories.find(cat => cat.id === activeCategoryId);
    if (category) {
      navigate(`/${encodeSlug(category.name)}/${c.id}`);
    } else {
      navigate(`/${c.id}`);
    }
    setSelectedCase(c);
  };

  const handleCloseModal = () => {
    const category = categories.find(cat => cat.id === activeCategoryId);
    if (category) {
      navigate(`/${encodeSlug(category.name)}`);
    } else {
      navigate(`/`);
    }
    setSelectedCase(null);
  };

  return (
    <Box className={styles.container}>
      <Header
        activeCategoryId={activeCategoryId}
        onCategorySelect={handleCategorySelect}
      />

      <Box className={styles.casesWrapper}>
        {filteredCases
         .sort((a, b) => (b.positionTop === true) - (a.positionTop === true))
        .map((c) => (
          <Box
            key={c.id}
            className={styles.caseBox}
            onClick={() => handleCaseClick(c)}
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
        onClose={handleCloseModal}
        caseItem={selectedCase}
        allDevelopers={developers}
        allCategories={categories}
      />
    </Box>
  );
};

export default HomePage;

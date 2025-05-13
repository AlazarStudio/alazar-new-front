import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
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

  const { categorySlug, caseId } = useParams();
  const navigate = useNavigate();

  // Загрузка данных
  useEffect(() => {
    Promise.all([
      fetch('https://backend.alazarstudio.ru/api/cases').then(res => res.json()),
      fetch('https://backend.alazarstudio.ru/api/categories').then(res => res.json()),
      fetch('https://backend.alazarstudio.ru/api/developers').then(res => res.json())
    ]).then(([caseData, categoryData, developerData]) => {
      setCases(caseData);
      setCategories(categoryData);
      setDevelopers(developerData);
    });
  }, []);

  // Сопоставление URL → состояния
  useEffect(() => {
    if (categories.length) {
      if (categorySlug) {
        const matchedCategory = categories.find(cat => cat.name === categorySlug);
        setActiveCategoryId(matchedCategory ? matchedCategory.id : null);
      } else {
        setActiveCategoryId(null);
      }
    }

    if (cases.length && caseId) {
      const matchedCase = cases.find(c => String(c.id) === caseId);
      setSelectedCase(matchedCase || null);
    } else {
      setSelectedCase(null);
    }
  }, [categorySlug, caseId, categories, cases]);

  // Фильтрация кейсов
  const filteredCases = activeCategoryId
    ? cases.filter(c => c.categoryIds.includes(activeCategoryId))
    : cases;

  // Клик по категории
  const handleCategorySelect = (id) => {
    const category = categories.find(cat => cat.id === id);
    setActiveCategoryId(id);
    if (category) {
      navigate(`/${category.name}`);
    } else {
      navigate(`/`);
    }
  };

  // Клик по кейсу
  const handleCaseClick = (c) => {
    const category = categories.find(cat => cat.id === activeCategoryId);
    if (category) {
      navigate(`/${category.name}/${c.id}`);
    } else {
      navigate(`/${c.id}`);
    }
    setSelectedCase(c);
  };

  // Закрытие модалки
  const handleCloseModal = () => {
    const category = categories.find(cat => cat.id === activeCategoryId);
    if (category) {
      navigate(`/${category.name}`);
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
        {filteredCases.map((c) => (
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

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

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

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

  // Синхронизация состояния с URL
  useEffect(() => {
    const categorySlug = searchParams.get('category');
    const caseId = searchParams.get('case');

    if (categorySlug && categories.length) {
      const foundCategory = categories.find((cat) => cat.name === categorySlug); // или slug
      if (foundCategory) {
        setActiveCategoryId(foundCategory.id);
      }
    }

    if (caseId && cases.length) {
      const foundCase = cases.find((c) => String(c.id) === String(caseId));
      if (foundCase) {
        setSelectedCase(foundCase);
      }
    }
  }, [searchParams, categories, cases]);

  // Отфильтрованные кейсы
  const filteredCases = activeCategoryId
    ? cases.filter((c) => c.categoryIds.includes(activeCategoryId))
    : cases;

  // Обновить категорию в URL
  const handleCategorySelect = (id) => {
    const category = categories.find((cat) => cat.id === id);
    if (category) {
      setActiveCategoryId(id);
      const currentParams = new URLSearchParams(searchParams);
      currentParams.set('category', category.name); // или category.slug
      if (selectedCase) currentParams.set('case', selectedCase.id);
      setSearchParams(currentParams);
    }
  };

  // Обновить кейс в URL
  const handleCaseClick = (c) => {
    setSelectedCase(c);
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('case', c.id);
    if (activeCategoryId) {
      const cat = categories.find((cat) => cat.id === activeCategoryId);
      if (cat) currentParams.set('category', cat.name); // или cat.slug
    }
    setSearchParams(currentParams);
  };

  // Закрытие модалки и очистка URL
  const handleCloseModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('case');
    setSearchParams(newParams);
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

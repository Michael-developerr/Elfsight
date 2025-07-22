import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useSearchParams } from 'react-router-dom';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePage, setActivePage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  useEffect(() => {
    const params = {
      status: searchParams.get('status') || '',
      gender: searchParams.get('gender') || '',
      species: searchParams.get('species') || '',
      name: searchParams.get('name') || '',
      type: searchParams.get('type') || '',
      page: searchParams.get('page') || '1'
    };

    setFilters({
      status: params.status,
      gender: params.gender,
      species: params.species,
      name: params.name,
      type: params.type
    });

    setActivePage(Number(params.page));
  }, [searchParams]);

  const buildApiUrl = useCallback(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    params.set('page', activePage);

    return `${API_URL}?${params.toString()}`;
  }, [filters, activePage]);

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    params.set('page', activePage);
    setSearchParams(params);
  }, [filters, activePage, setSearchParams]);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    setIsError(false);

    try {
      const url = buildApiUrl();
      const { data } = await axios.get(url);
      setCharacters(data.results);
      setInfo(data.info);
    } catch (e) {
      setIsError(true);
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  }, [buildApiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApply = useCallback(() => {
    setActivePage(1);
    fetchData();
  }, [fetchData]);

  const handleReset = useCallback(() => {
    setFilters({
      status: '',
      gender: '',
      species: '',
      name: '',
      type: ''
    });
    setActivePage(1);
  }, []);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      filters,
      setFilters,
      handleApply,
      handleReset,
      apiURL: buildApiUrl(),
      setApiURL: (url) => {
        const newUrl = new URL(url);
        const page = newUrl.searchParams.get('page');
        if (page) setActivePage(Number(page));

        const params = {
          status: newUrl.searchParams.get('status') || '',
          gender: newUrl.searchParams.get('gender') || '',
          species: newUrl.searchParams.get('species') || '',
          name: newUrl.searchParams.get('name') || '',
          type: newUrl.searchParams.get('type') || ''
        };
        setFilters(params);
      }
    }),
    [
      activePage,
      characters,
      isFetching,
      isError,
      info,
      filters,
      fetchData,
      handleApply,
      handleReset,
      buildApiUrl
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);

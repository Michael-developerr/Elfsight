import { useCallback } from 'react';
import { useData } from './providers';
import styled from 'styled-components';
import { CustomSelect } from './CustomSelect';

const statusOptions = ['Alive', 'Dead', 'unknown'];
const genderOptions = ['Female', 'Male', 'Genderless', 'unknown'];
const speciesOptions = [
  'Human',
  'Alien',
  'Humanoid',
  'Robot',
  'Animal',
  'Mythological Creature',
  'unknown'
];

export function Filters() {
  const {
    filters,
    setFilters,
    handleApply,
    handleReset,
    isFetching
  } = useData();

  const handleFilterChange = useCallback(
    (key, value) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [setFilters]
  );

  const onStatusChange = useCallback(
    (val) => handleFilterChange('status', val),
    [handleFilterChange]
  );

  const onGenderChange = useCallback(
    (val) => handleFilterChange('gender', val),
    [handleFilterChange]
  );

  const onSpeciesChange = useCallback(
    (val) => handleFilterChange('species', val),
    [handleFilterChange]
  );

  const onNameChange = useCallback(
    (e) => handleFilterChange('name', e.target.value),
    [handleFilterChange]
  );

  const onTypeChange = useCallback(
    (e) => handleFilterChange('type', e.target.value),
    [handleFilterChange]
  );

  return (
    <FiltersContainer>
      <TopFilters>
        <FilterGroup>
          <CustomSelect
            value={filters.status}
            onChange={onStatusChange}
            options={statusOptions}
            placeholder="Status"
          />
        </FilterGroup>

        <FilterGroup>
          <CustomSelect
            value={filters.gender}
            onChange={onGenderChange}
            options={genderOptions}
            placeholder="Gender"
          />
        </FilterGroup>

        <FilterGroup>
          <CustomSelect
            value={filters.species}
            onChange={onSpeciesChange}
            options={speciesOptions}
            placeholder="Species"
          />
        </FilterGroup>
      </TopFilters>

      <BottomFilters>
        <FilterGroup>
          <Input
            type="text"
            value={filters.name}
            onChange={onNameChange}
            placeholder="Name"
          />
        </FilterGroup>

        <FilterGroup>
          <Input
            type="text"
            value={filters.type}
            onChange={onTypeChange}
            placeholder="Type"
          />
        </FilterGroup>

        <ButtonsContainer>
          <Button onClick={handleApply} disabled={isFetching}>
            Apply
          </Button>
          <Button onClick={handleReset} disabled={isFetching}>
            Reset
          </Button>
        </ButtonsContainer>
      </BottomFilters>
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: #263750;
  border-radius: 10px;
`;

const TopFilters = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const BottomFilters = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #444;
  background: #1a2639;
  color: #fff;

  &::placeholder {
    color: #fff;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background: ${({ disabled }) => (disabled ? '#555' : '#83bf46')};
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.2s;

  &:hover {
    background: ${({ disabled }) => (disabled ? '#555' : '#6da437')};
  }

  &:last-child {
    background: ${({ disabled }) => (disabled ? '#555' : '#ff5152')};

    &:hover {
      background: ${({ disabled }) => (disabled ? '#555' : '#d84343')};
    }
  }
`;

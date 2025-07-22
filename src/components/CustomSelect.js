import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export function CustomSelect({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  const handleClearClick = useCallback(
    (e) => {
      e.stopPropagation();
      handleClear();
    },
    [handleClear]
  );

  const handleOptionClick = useCallback(
    (option) => () => {
      onChange(option);
      setIsOpen(false);
    },
    [onChange]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Wrapper ref={ref}>
      <SelectBox onClick={toggle} $active={isOpen || value}>
        <span>{value || placeholder}</span>
        {value && <ClearIcon onClick={handleClearClick} />}
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </SelectBox>
      {isOpen && (
        <Options>
          {options.map((opt) => (
            <Option
              key={opt}
              onClick={handleOptionClick(opt)}
              $selected={opt === value}
            >
              {opt}
            </Option>
          ))}
        </Options>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SelectBox = styled.div`
  background: ${({ $active }) => ($active ? '#2e4268' : '#1a2639')};
  border: 1px solid #444;
  border-radius: 5px;
  padding: 8px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Options = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background: #1a2639;
  border: 1px solid #444;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
`;

const Option = styled.div`
  padding: 8px;
  color: white;
  cursor: pointer;
  background: ${({ $selected }) => ($selected ? '#2e8b57' : 'transparent')};
  font-weight: ${({ $selected }) => ($selected ? 'bold' : 'normal')};

  &:hover {
    background: #2e8b57;
  }
`;

const ClearIcon = styled(X)`
  margin-right: 8px;
  color: #83bf46;
  cursor: pointer;

  &:hover {
    color: #a3d46a;
  }
`;

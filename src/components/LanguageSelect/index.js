import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const LANGUAGES = ["en", "he"];

function LanguageSelect({ language, onchange }) {

  const switchLanguage = (event) => onchange(event.target.name);

  return (
    <span className="inline">
      <DropdownButton
        title={language}
        variant="outline-secondary"
      >
        {LANGUAGES.map((lang) => (
          <Dropdown.Item
            key={lang}
            name={lang}
            as="button"
            onClick={switchLanguage}
          >
            {lang}
          </Dropdown.Item>
        ))}
      </DropdownButton>

    </span>
  );
}

export default LanguageSelect;

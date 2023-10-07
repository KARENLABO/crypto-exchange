import { useState } from "react";
import { AutoComplete } from "antd";

// Function to render the title of the autocomplete options
const renderTitle = (title) => <span>{title}</span>;

// Function to render each item in the autocomplete dropdown
const renderItem = (items) => {
  return items?.map((item) => {
    const { name, asset_id } = item;
    return {
      value: asset_id,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {`(${asset_id}) - ${name}`}
        </div>
      ),
    };
  });
};

// Function to map the options for the autocomplete
const mapOptions = (list, isCrypto) => {
  if (list.length < 1) {
    return [
      {
        label: "No results found",
      },
    ];
  }
  return [
    {
      label: renderTitle(isCrypto ? "Crypto Currencies" : "Local Currencies"),
      options: renderItem(list),
    },
  ];
};

// Function to filter search results based on user input
const handleSearch = (query, options) => {
  if (!query) {
    return;
  }
  const filteredResults = options?.filter((item) => {
    return (
      item.asset_id.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  });

  return mapOptions(filteredResults);
};

// Main component for selecting currencies
function SelectUI({ list, onChange, isCrypto }) {
  const [options, setOptions] = useState(mapOptions(list, isCrypto));

  return (
    <AutoComplete
      popupMatchSelectWidth={250} //in the documentation of ant design is recommended to make the styles here
      style={{ width: "280px" }} //in the documentation of ant design is recommended to make the styles here
      options={options}
      onSelect={(item) => onChange(item, isCrypto)}
      onSearch={(query) => setOptions(handleSearch(query, list))}
      notFoundContent={true}
      placeholder={
        isCrypto ? "Select a crypto currency" : "Select a local currency"
      }
    ></AutoComplete>
  );
}

export default SelectUI;

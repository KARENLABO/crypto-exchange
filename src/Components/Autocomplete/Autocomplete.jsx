import { useState } from "react";
import { AutoComplete } from "antd";

const renderTitle = (title) => <span>{title}</span>;
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

const mapOptions = (list, isCrypto) => {
  return [
    {
      label: renderTitle(isCrypto ? "Crypto Currencies" : "Local Currencies"),
      options: renderItem(list),
    },
  ];
};

// Function to filter search results
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

function SelectUI({ list, onChange, isCrypto, error, isLoading }) {
  const [options, setOptions] = useState(mapOptions(list, isCrypto));

  return (
    <AutoComplete
      popupMatchSelectWidth={250}
      style={{ width: "280px" }}
      options={options}
      onSelect={(item) => onChange(item, isCrypto)}
      onSearch={(query) => setOptions(handleSearch(query, list))}
      placeholder={
        isCrypto ? "Select a crypto currency" : "Select a local currency"
      }
    ></AutoComplete>
  );
}

export default SelectUI;

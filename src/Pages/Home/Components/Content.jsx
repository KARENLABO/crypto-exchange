import { useContext, useState, useEffect, useRef } from "react";
import { InputNumber, Button, Tour } from "antd";
import { RedoOutlined, BulbOutlined } from "@ant-design/icons";

import { DataContext } from "../../../ContextProvider/ContextProvider";
import Autocomplete from "../../../Components/Autocomplete";
import { getExchangeRate } from "../../../Api/Api";

import "./styles.scss";

function Content() {
  const { ListCoinsData } = useContext(DataContext);
  const [selectedCrypto, setSelectedCrypto] = useState();
  const [selectedLocal, setSelectedLocal] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [unit, setUnit] = useState(1);
  const [value, setValue] = useState();
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  useEffect(() => {
    setError(null);

    if ((selectedCrypto, selectedLocal) || refresh) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const data = await getExchangeRate(
            selectedCrypto,
            selectedLocal,
            setError
          );
          setValue(data);
        } catch (e) {
          console.error(e, "error");
        }
        setIsLoading(false);
      };

      fetchData();
    }
    setRefresh(false);
  }, [selectedCrypto, selectedLocal, refresh]);

  const handleChange = async (item, isCrypto) => {
    if (isCrypto) {
      setSelectedCrypto(item);
    } else {
      setSelectedLocal(item);
    }
  };

  const steps = [
    {
      title: "Crypto Currencies",
      description: "Select the crypto currencies here",
      target: () => ref1.current,
    },
    {
      title: "Local Currencies",
      description: "Select the local currencies here",
      target: () => ref2.current,
    },
    {
      title: "Amount",
      description: "You can select the amount you want to convert here.",
      target: () => ref3.current,
    },
    {
      title: "Conversion",
      description: "Here you can see the conversion amount",
      target: () => ref4.current,
    },
    {
      title: "Update",
      description: "You can update the value in real time here",
      target: () => ref5.current,
    },
  ];

  return (
    <div className="container">
      <Button
        className="start-tour"
        type="primary"
        shape="round"
        icon={<BulbOutlined />}
        onClick={() => setOpen(true)}
      >
        Start Tour
      </Button>
      <div className="autoComplete" ref={ref1}>
        <label>Crypto Currencies:</label>
        <Autocomplete
          list={ListCoinsData.crypto}
          onChange={handleChange}
          isCrypto
          isLoading={isLoading}
        />
      </div>
      <div className="autoComplete" ref={ref2}>
        <label>Local Currencies:</label>
        <Autocomplete
          list={ListCoinsData.nonCrypto}
          onChange={handleChange}
          isLoading={isLoading}
        />
      </div>
      {error && <span className="error-message">{error}</span>}
      {value && (
        <span className="text-convertion">{`${unit} ${selectedCrypto} is equal to $${(
          unit * value
        ).toLocaleString(undefined, {
          maximumFractionDigits: 4,
        })} ${selectedLocal}`}</span>
      )}

      <InputNumber
        className="input-number"
        ref={ref3}
        min={1}
        max={100}
        defaultValue={1}
        onChange={(unit) => setUnit(unit)}
        disabled={error}
      />
      <InputNumber
        className="input-number"
        ref={ref4}
        formatter={(value) => {
          const formattedValue = parseFloat(value).toLocaleString(undefined, {
            maximumFractionDigits: 4,
            minimumFractionDigits: 4,
          });
          return `$ ${formattedValue}`;
        }}
        disabled={error}
        value={value ? unit * value : ""}
        readOnly
      />

      <Button
        ref={ref5}
        className="button-refresh"
        type="dashed"
        style={{ color: value ? "#1677ff" : "gray" }}
        icon={<RedoOutlined />}
        loading={isLoading}
        onClick={() => setRefresh(true)}
        disabled={!value}
      >
        Update
      </Button>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
}

export default Content;

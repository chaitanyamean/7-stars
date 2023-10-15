import { Label, Select } from "flowbite-react";

export default function DefaultDropdown(props: any) {
  const { title, options, id, handleOnChange, keys } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleOnChange(e.target.value);
  };
  // const getKey = () => {};
  return (
    <div className="max-w-md" id="select">
      <div className="mb-2 block">
        <Label htmlFor={id} value={title} />
      </div>
      <Select id={id} required onChange={handleChange}>
        {options &&
          options.length > 0 &&
          options.map((item: any) => (
            <option key={item[keys[0]]}>{item[keys[1]]}</option>
          ))}
      </Select>
    </div>
  );
}

import { Label, Select } from "flowbite-react";

export default function DefaultDropdown(props: any) {
  let { title, options, id } = props;
  return (
    <div className="max-w-md" id="select">
      <div className="mb-2 block">
        <Label htmlFor={id} value={title} />
      </div>
      <Select id={id} required>
        {options &&
          options.length > 0 &&
          options.map((item: any) => (
            <option key={item.id}>{item.name}</option>
          ))}
      </Select>
    </div>
  );
}

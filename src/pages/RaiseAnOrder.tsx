import React from "react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  FileInput,
  Datepicker,
} from "flowbite-react";
import DefaultDropdown from "../components/Dropdown";

export const RaiseAnOrder = () => {
  let flavours = [
    {
      id: "1",
      name: "Chocolate",
    },
    {
      id: "2",
      name: "Butterscotch",
    },
    {
      id: "3",
      name: "Vannilla",
    },
    {
      id: "4",
      name: "Rasmalai",
    },
  ];
  let kgsOptions = [
    {
      id: "1",
      name: "1kg",
    },
    {
      id: "2",
      name: "2kg",
    },
    {
      id: "3",
      name: "3kg",
    },
    {
      id: "4",
      name: "4kg",
    },
    {
      id: "5",
      name: "5kg",
    },
  ];

  let locations = [
    {
      id: "1",
      name: "Ameenpur",
    },
    {
      id: "2",
      name: "Patencheruvu",
    },
    {
      id: "3",
      name: "Berrumguda",
    },
    {
      id: "4",
      name: "Ashok nagar",
    },
    {
      id: "5",
      name: "Lingampally",
    },
    {
      id: "6",
      name: "Miyapur",
    },
    {
      id: "7",
      name: "Chanda nagar",
    },
    {
      id: "8",
      name: "Madinaguda",
    },
    {
      id: "9",
      name: "Aminpur village",
    },
    {
      id: "10",
      name: "Bandhan kamavu",
    },
    {
      id: "8",
      name: "Krishna reddy petha",
    },
  ];

  return (
    <div className="m-4">
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput id="name" placeholder="Your Name" type="text" />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="number" value="Mobile Number" />
          </div>
          <TextInput
            id="number"
            placeholder="Your Number"
            required
            type="number"
          />
        </div>

        <div className="max-w-md" id="fileUpload">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload image" />
          </div>
          <FileInput helperText="A cake picture you liked" id="file" />
        </div>

        <div className="max-w-md" id="flavoursId">
          <div className="mb-2 block">
            <DefaultDropdown
              title="Select Flavours"
              options={flavours}
              id="flavoursId"
            />
          </div>
        </div>

        <div className="max-w-md" id="kgsOptionsId">
          <div className="mb-2 block">
            <DefaultDropdown title="Kgs" options={kgsOptions} />
          </div>
        </div>

        <div className="max-w-md" id="kgsOptionsId">
          <div className="mb-2 block">
            <DefaultDropdown title="Select Location" options={locations} />
          </div>
        </div>

        <div className="max-w-md" id="datepickerOptions">
          <div className="mb-2 block">
            <Label value="Select date" />
          </div>
          <Datepicker title="" />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="comments" value="Comments" />
          </div>
          <TextInput id="comments" required type="text" sizing="lg" />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

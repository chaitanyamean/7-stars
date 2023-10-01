import { useState } from "react";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import DefaultDropdown from "../components/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export const RaiseAnOrder = () => {
  const [data, setData] = useState({
    name: "",
    mobile: "",
    image: {},
    flavourType: "",
    quantity: "",
    location: "",
    date: new Date(),
    comments: "",
    address: "",
  });
  const flavours = [
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
      name: "Vanilla",
    },
    {
      id: "4",
      name: "Rasmalai",
    },
  ];
  const kgsOptions = [
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

  const locations = [
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

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
      console.log(data);
      const payload = {
        name: data.name,
        mobile: data.mobile,
        image: data.image,
        flavourType: data.flavourType,
        quantity: data.quantity,
        location: data.location,
        date: data.date,
        comments: data.comments,
        address: data.address,
      };
      console.log(payload);
      axios
        .post("https://sevenstarbakers.onrender.com/raiseanorder", payload, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res));
    }
  };

  return (
    <div className="m-4 flex justify-center">
      <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            placeholder="Your Name"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, name: e.target.value })
            }
          />
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({ ...data, mobile: e.target.value })
            }
          />
        </div>

        <div className="max-w-md" id="fileUpload">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload image" />
          </div>
          <FileInput
            helperText="A cake picture you liked"
            id="file"
            name="samplefile"
            onChange={(e: any) => {
              console.log(e.target.files[0]);
              setData({ ...data, image: e.target.files[0] });
            }}
          />
        </div>

        <div className="max-w-md" id="flavoursId">
          <div className="mb-2 block">
            <DefaultDropdown
              title="Select Flavours"
              options={flavours}
              id="flavoursId"
              handleOnChange={(e: string) =>
                setData({ ...data, flavourType: e })
              }
            />
          </div>
        </div>

        <div className="max-w-md" id="kgsOptionsId">
          <div className="mb-2 block">
            <DefaultDropdown
              title="Kgs"
              options={kgsOptions}
              handleOnChange={(e: string) => setData({ ...data, quantity: e })}
            />
          </div>
        </div>

        <div className="max-w-md" id="kgsOptionsId">
          <div className="mb-2 block">
            <DefaultDropdown
              title="Select Location"
              options={locations}
              handleOnChange={(e: string) => setData({ ...data, location: e })}
            />
          </div>
        </div>

        <div className="max-w-md" id="datepickerOptions">
          <div className="mb-2 block">
            <Label value="Select date" />
          </div>
          {/* <Datepicker title="" onChange={(e) => console.log(e.target.value)} /> */}
          <DatePicker
            selected={data.date}
            onChange={(date: Date) => setData({ ...data, date: date })}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="comments" value="Additional Details" />
          </div>
          <TextInput
            id="comments"
            required
            type="text"
            sizing="lg"
            onChange={(e) => setData({ ...data, comments: e.target.value })}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="address" value="Full Address" />
          </div>
          <TextInput
            id="address"
            required
            type="text"
            sizing="lg"
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

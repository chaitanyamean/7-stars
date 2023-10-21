import { useState, useEffect } from "react";
import {
  Button,
  Label,
  TextInput,
  FileInput,
  Textarea,
  Spinner,
  Alert,
} from "flowbite-react";
import DefaultDropdown from "../components/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineLoading } from "react-icons/ai";
import { fetchPrices } from "../slices/priceSlice";
import { fetchQuantites } from "../slices/quantitySlice";
import { fetchFlavours } from "../slices/flavourSlice";
import { AppDispatch } from "../store";

export const RaiseAnOrder = () => {
  // const priceSlice = useSelector((state: any) => state.priceSlice);
  const quantitySlice = useSelector((state: any) => state.quantitySlice);
  const flavourSlice = useSelector((state: any) => state.flavourSlice);

  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  console.log("quantitySlice", quantitySlice);
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
    price: "",
  });

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

  useEffect(() => {
    dispatch(fetchPrices());
    dispatch(fetchQuantites());
    dispatch(fetchFlavours());
  }, []);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
      console.log(data);
      setLoading(true);
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
        price: text,
      };
      console.log(payload);
      axios
        .post(`https://sevenstarbakers.onrender.com/raiseanorder`, payload, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res && res.status == 200) {
            console.log("200");
            setLoading(false);
            setSuccess(
              "Thank you for the order. We will keep you posted once the order is Accepted."
            );
            setText("");
            setData({
              name: "",
              mobile: "",
              image: {},
              flavourType: "",
              quantity: "",
              location: "",
              date: new Date(),
              comments: "",
              address: "",
              price: "",
            });
          } else {
            setLoading(false);
            setSuccess("Some Error");
          }
        })
        .catch(() => {
          setLoading(false);
          setSuccess("Some Error");
        });
    }
  };

  useEffect(() => {
    getTotalPrice();
  }, [data.quantity, data.flavourType]);

  const getTotalPrice = (quantity?: string, flavourType?: string) => {
    console.log(quantity, flavourType);

    const payload = {
      quantity: data.quantity ? data.quantity : quantity,
      flavourName: data.flavourType ? data.flavourType : flavourType,
    };
    if (data.quantity && data.flavourType) {
      axios
        .post(
          `https://sevenstarbakers.onrender.com/getpricebyquantity`,
          payload
        )
        .then((res) => {
          if (res && res.status == 200) {
            if (res.data && res.data.length > 0) {
              setText(res.data[0].price);
            } else {
              setText("----");
            }
          } else {
            // saved successfully
          }
        })
        .catch(() => {});
    }
  };

  return (
    <div className="m-4 flex justify-center">
      {!isLoading ? (
        <>
          <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
            {success ? (
              <Alert color="info">
                <span>
                  <p>{success}</p>
                </span>
              </Alert>
            ) : (
              ""
            )}
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

            <div className="max-w-md" id="locationId">
              <div className="mb-2 block">
                <DefaultDropdown
                  title="Select Location"
                  options={locations}
                  keys={["id", "name"]}
                  handleOnChange={(e: string) =>
                    setData({ ...data, location: e })
                  }
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
              <Textarea
                id="comments"
                required
                rows={4}
                onChange={(e) => setData({ ...data, comments: e.target.value })}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="address" value="Full Address" />
              </div>
              <Textarea
                id="address"
                required
                rows={4}
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </div>

            <div className="max-w-md" id="flavoursId">
              {flavourSlice &&
              flavourSlice.flavour &&
              flavourSlice.flavour.length > 0 ? (
                <div className="mb-2 block">
                  <DefaultDropdown
                    title="Flavours"
                    id="flavours"
                    options={flavourSlice.flavour}
                    keys={["flavourId", "flavourName"]}
                    value={data.flavourType}
                    handleOnChange={(e: string) => {
                      setData({ ...data, flavourType: e });
                    }}
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="max-w-md" id="kgsOptionsId">
              {quantitySlice &&
              quantitySlice.quantity &&
              quantitySlice.quantity.length > 0 ? (
                <div className="mb-2 block">
                  <DefaultDropdown
                    title="Kgs"
                    id="quantity"
                    options={quantitySlice.quantity}
                    value={data.quantity}
                    keys={["quantityId", "quantityName"]}
                    handleOnChange={(e: string) => {
                      setData({ ...data, quantity: e });
                    }}
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div>
              <Alert color="info">
                <span>
                  <p>
                    Total Price:
                    <strong>{text}</strong>
                  </p>
                </span>
              </Alert>
            </div>

            <Button
              isProcessing={isLoading}
              processingSpinner={
                <AiOutlineLoading className="h-6 w-6 animate-spin" />
              }
              size="md"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </>
      ) : (
        <div className="flex space-x-4">
          <span>Raising the order</span>
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      )}
    </div>
  );
};

// import { Carousel, Card, Select, Button } from "flowbite-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { fetchFlavours } from "../slices/flavourSlice";

export const Home = () => {
  // const [data, setData] = useState([
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  // ]);

  const flavourSlice = useSelector((state: any) => state.flavourSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFlavours());
  }, []);

  return (
    <div className="p-4 bg-bg-color grid grid-flow-row gap-6 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {flavourSlice &&
        flavourSlice.flavour &&
        flavourSlice.flavour.length > 0 &&
        flavourSlice.flavour.map((item: any) => (
          <>
            <div className="p-4 m-8 w-80 bg-white shadow-md rounded-xl">
              <picture className="rounded-lg overflow-hidden block">
                <img
                  className="hover:scale-125 ease-in duration-150"
                  src={item.image}
                />
              </picture>

              <h1 className="mt-4 mb-2 text-xl font-bold">
                {item.flavourName}
              </h1>
              {/* <div className="flex">
                <p className="text-sm text-gray-600">
                  Keterangan pendek tentang card di sini.
                </p>
                <Button>Buy</Button>
              </div> */}

              <span className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  {/* <div className="shrink-0"> */}
                  {/* <Select id="countries" required>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>France</option>
                      <option>Germany</option>
                    </Select> */}
                  {/* </div> */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {/* Neil Sims */}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      {/* email@windster.com */}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    320
                  </div>
                </div>
              </span>
            </div>
          </>
        ))}
    </div>
  );
};

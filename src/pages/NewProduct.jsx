import React, { useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs';
import  {ImageToBase64} from '../utility/ImageToBase64'
import { toast } from 'react-hot-toast';

const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: 0,
    description: "",
  })
  const handleOnChange = async (e) => {
    const {name, value} = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    })
  }

  const handleUploadImage = async (e) => {
    const data = await ImageToBase64(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleSubmitData = async(e) => {
    e.preventDefault()
    const { name, image, category, price } = data
    if (name && image && category && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/saveProduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const fetchedData = await fetchData.json()
      toast(fetchedData.message)
      
      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: 0,
          description: "",
        };
      })
    } else {
      toast("Fields must be not empty")
    }
  } 

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmitData}
      >
        <label htmlFor="name">Name</label>
        <input
          value={data.name}
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
        />

        <label htmlFor="category">Category</label>
        <select
          value={data.category}
          name="category"
          id="category"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
        >
          <option value={"other"}>Select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icream"}>Icream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"burger"}>Burger</option>
          <option value={"rice"}>Rice</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200 rounded my-1 flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} alt="imageProduct" className="h-full" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />{" "}
              </span>
            )}

            <input
              type={"file"}
              className="hidden"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleUploadImage}
            />
          </div>
        </label>

        <label htmlFor="price">Price</label>
        <input
          value={data.price}
          type={"number"}
          className="bg-slate-200 p-1 my-1"
          id="price"
          name="price"
          onChange={handleOnChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={3}
          value={data.description}
          className="bg-slate-200 p-1 my-1 resize-none"
          id="description"
          name="description"
          onChange={handleOnChange}
        />

        <button
          type={"submit"}
          className="bg-red-400 hover:bg-red-600 text-white text-lg font-md drop-shadow rounded-lg my-3"
        >
          save
        </button>
      </form>
    </div>
  );
}

export default NewProduct
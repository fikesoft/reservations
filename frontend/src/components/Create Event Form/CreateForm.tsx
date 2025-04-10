import React, { useState } from 'react';
import classNames from 'classnames';  // For conditionally adding classnames
import style from "./createForm.module.scss";
import { createEvent } from '../../api/eventApi';
import { showToast } from '../../store/slices/toastSlice';
import useAppDispatch from '../../store/hooks/useDispach';
import dayjs from 'dayjs';
const CreateForm = () => {
    interface CreateEventProps {
        name: string;
        img: string; // Changed from imgUrl
        date: string;
        location: {
          country: string;
          city: string;
          street: string;
        };
        price: number;
        category: string;
        classTicket: {
          type: string;
          multiplier: number;
        }[];
        description: string;
      }
    const dispatch = useAppDispatch();
    const [name, setName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [date, setDate] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [classTicket, setClassTicket] = useState([
        { type: "Normal", multiplier: 1, enabled: false },
        { type: "Premium", multiplier: 1, enabled: false },
        { type: "All Inclusive", multiplier: 1, enabled: false },
    ]);
    const [description, setDescription] = useState("");
    
    const handleSubmit = async ( e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Clean up classTicket by removing the 'enabled' property
        const cleanedClassTicket = classTicket.map(ticket => {
          const { enabled, ...rest } = ticket;
          return rest;
        });
        const formattedDate = dayjs(date.trim()).format("YYYY-MM-DD");
        // Build the payload with the needed data
        const eventData: CreateEventProps = {
            name: name.trim(),
            img: imgUrl.trim(),
            date: formattedDate,
            location: { country: country.trim(), city: city.trim(), street: street.trim() },
            price: parseFloat(price.trim()) || 0,
            category: category.trim(),
            classTicket: cleanedClassTicket,
            description: description.trim(),
          };  
        try {
            const returnedData = await createEvent(eventData);
            console.log("Event created successfully:", returnedData);
            dispatch(showToast({ type: "success", message: "Successfully created" }));
          } catch (error) {
            console.error("Error creating event:", error);
          }
      };
    return (
        <div className={classNames(style.createEventContainer,'d-flex flex-column align-items-center justify-content-center')} >
            <h2>Create your event</h2>
            <form className='border p-5 rounded  d-flex flex-column gap-2' onSubmit={(e)=>{handleSubmit(e)}}>
                <img src={ imgUrl || undefined } alt='enter a valid url'></img>
                <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
                    <label htmlFor="image-url">Image URL</label>
                    <input
                        name="image-url"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
                    <label htmlFor="date">Date</label>
                    <input
                        name="date"
                        type="date"
                        value={date}
                        onChange={(e) => { setDate(e.target.value); console.log(date); }}
                        className="form-control"
                    />
                </div>

                <div className={classNames('d-flex', 'flex-column', 'align-items-center')}>
                    <p>Location</p>
                    <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
                        <label htmlFor="Country">Country</label>
                        <input
                            name="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
                        <label htmlFor="city">City</label>
                        <input
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
                        <label htmlFor="Street">Street</label>
                        <input
                            name="Street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
                    <label htmlFor="Price">Price</label>
                    <input
                        name="Price"
                        type="number"
                        step={6}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
                    <label htmlFor="category">Category</label>
                    <input
                        name="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/*Class Ticket */}
                <div className={classNames("d-flex", "gap-4")}>
                    {classTicket.map((item) => (
                        <div key={item.type} className={classNames("d-flex", "flex-column", "align-items-center", "gap-3")}>
                            <div className={classNames('d-flex', 'align-items-center', 'gap-3')}>
                                <label htmlFor="type" className={style.customCheckboxLabel}>
                                    {item.type}
                                </label>

                                <input
                                    type="checkbox"
                                    checked={item.enabled}
                                    name="type"
                                    onChange={() => {
                                        setClassTicket((prev) =>
                                            prev.map((ticket) =>
                                                ticket.type === item.type
                                                    ? { ...ticket, enabled: !ticket.enabled }
                                                    : ticket
                                            )
                                        );
                                    }}
                                    className={classNames(style.customCheckbox)}
                                />
                            </div>

                            <div className={classNames("d-flex", "flex-column", "align-items-center")}>
                                <label htmlFor="type">Multiplier</label>
                                <input
                                    type="number"
                                    value={item.multiplier}
                                    disabled={!item.enabled}
                                    style={{ maxWidth: "65px" }}
                                    step={0.1}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value); // Convert string to number
                                        setClassTicket((prev) =>
                                            prev.map((ticket) =>
                                                ticket.type === item.type
                                                    ? { ...ticket, multiplier: value }
                                                    : ticket
                                            )
                                        );
                                    }}
                                    name="multiplier"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className='d-flex flex-column' >
                    <label htmlFor="description">Description</label>
                    <textarea name='description' className='border' value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                </div>
                {/*Class Ticket End */}
                <button type="submit" className="btn btn-primary btn mt-2 ">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreateForm;

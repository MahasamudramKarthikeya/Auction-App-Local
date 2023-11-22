import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import { clearErrors, createProduct } from '../../actions/productAction';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import MetaData from '../MetaData/MetaData';
import Loader from '../Loader/Loader';
import './addlotstyles.scss';

const Addlot = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  // HOOKS
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [images, setImages] = useState([]);
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Product Created Successfully');
      history.push('/lot');
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success]);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const formErrors = {};

    if (!name.trim()) {
      formErrors.name = 'Lot Name is required';
    }

    if (!description.trim()) {
      formErrors.description = 'Lot Description is required';
    }

    if (!category.trim()) {
      formErrors.category = 'Category is required';
    }

    if (price <= 0) {
      formErrors.price = 'Lot Start Price must be greater than 0';
    }

    if (!endDate.trim()) {
      formErrors.endDate = 'End Date is required';
    }

    if (!endTime.trim()) {
      formErrors.endTime = 'End Time is required';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    const myForm = new FormData();

    myForm.set('itemName', name);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('startingBid', price);
    myForm.set('bidEnd', new Date(endDate + ' ' + endTime));

    images.forEach((image) => {
      myForm.append('images', image);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Add Auctions" />

      <div className="addlotcls" data-aos="fade-up" data-aos-delay="400">
        <div className="row">
          <div className="col-10 mx-auto">
            <section className="section form-elements">
              <div className="row">
                <div className="card">
                  <div className="card-body">
                    <div className="section-title" data-aos="fade-up">
                      <h2>Add Lot</h2>
                      <p>Fill Details and Images of Lots</p>
                    </div>

                    <form
                      className="formbd"
                      encType="multipart/form-data"
                      onSubmit={createProductSubmitHandler}
                    >
                      {/* LOT NAME */}
                      <div className="row mb-3 rowset">
                        <label htmlFor="inputText" className="col-sm-2 col-form-label">
                          LOT NAME
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                      </div>

                      {/* LOT DESCRIPTION */}
                      <div className="row mb-3 rowset">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                          LOT DESCRIPTION
                        </label>
                        <div className="col-sm-10">
                          <textarea
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            style={{ height: '100px' }}
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                          {errors.description && (
                            <div className="invalid-feedback">{errors.description}</div>
                          )}
                        </div>
                      </div>

                      {/* CATEGORY */}
                      <div className="row mb-3 rowset">
                        <label className="col-sm-2 col-form-label">CATEGORY</label>
                        <div className="col-sm-10">
                          <select
                            className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                            aria-label="Default select example"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">Choose Category</option>
                            <option value="Celebrity's Product">Celebrity's Product</option>
                            <option value="Art">Art</option>
                            <option value="Property">Property</option>
                            <option value="Jewelry">Jewelry</option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Sports equipment">Sports equipment</option>
                            <option value="Industrial equipment">Industrial equipment</option>
                            <option value="Machinery">Machinery</option>
                            <option value="Rare&Old Heritage">Rare&Old Heritage</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.category && (
                            <div className="invalid-feedback">{errors.category}</div>
                          )}
                        </div>
                      </div>

                      {/* LOT START PRICE */}
                      <div className="row mb-3 rowset">
                        <label htmlFor="inputNumber" className="col-sm-2 col-form-label">
                          LOT START PRICE
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="number"
                            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                        </div>
                      </div>

                      {/* END DATE */}
                      <div className="row mb-3 rowset">
                        <label htmlFor="inputDate" className="col-sm-2 col-form-label">
                          END DATE
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="date"
                            className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                          {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
                        </div>
                      </div>

                      {/* END TIME */}
                      <div className="row mb-3 rowset">
                        <label htmlFor="inputTime" className="col-sm-2 col-form-label">
                          END TIME
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="time"
                            className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                          />
                          {errors.endTime && <div className="invalid-feedback">{errors.endTime}</div>}
                        </div>
                      </div>

                      {/* LOT IMAGES */}
                      <div className="row mb-3 rowset">
                        <label htmlFor="inputNumber" className="col-sm-2 col-form-label">
                          LOT IMAGES
                        </label>
                        <div className="col-sm-10">
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            name="avatar"
                            accept="image/*"
                            onChange={createProductImageChange}
                            multiple
                          />
                          {errors.images && (
                            <div className="invalid-feedback">{errors.images}</div>
                          )}
                        </div>
                      </div>

                      <div className="row mb-3 rowset">
                        <div className="col-sm-10 createProductFormImage">
                          {imagesPreview.map((image, index) => (
                            <img key={index} src={image} alt="Product preview" />
                          ))}
                        </div>
                      </div>

                      {/* Create Button */}
                      <div className="row mb-3 rowset submitbtn">
                        <div className="col-sm-10">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading ? true : false}
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addlot;

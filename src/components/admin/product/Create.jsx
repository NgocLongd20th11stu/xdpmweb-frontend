import React, { useEffect, useState, useRef, useMemo } from "react";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adminToken, apiURL } from "../../common/http";
import JoditEditor from "jodit-react";
import { formatVND } from "../../../utils/format";

const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [disable, setdisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImage, setGalleryImage] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizesChecked, setSizesChecked] = useState([]);

  const navigate = useNavigate();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "",
    }),
    [placeholder],
  );

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const price = watch("price");
  const comparePrice = watch("compare_price");

  // Hàm lưu sản phẩm
  const saveProduct = async (data) => {
    const formData = { ...data, description: content, gallery: gallery };

    setdisable(true);
    const res = await fetch(`${apiURL}/products`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        setdisable(false);
        if (result.status == 200) {
          toast.success(result.message);
          navigate("/admin/products");
        } else {
          const formErrors = result.errors;
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] });
          });
        }
      });
  };

  //Hàm lấy danh sách size
    const fetchSizes = async () => {
      const res = await fetch(`${apiURL}/sizes`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setSizes(result.data);
        });
    };
  //Hàm lấy danh sách loại sản phẩm
  const fetchCategories = async () => {
    const res = await fetch(`${apiURL}/categories`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.data);
      });
  };

  //Hàm lấy danh sách thương hiệu
  const fetchBrands = async () => {
    const res = await fetch(`${apiURL}/brands`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setBrands(result.data);
      });
  };

  // Hàm lưu ảnh sản phẩm
  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    setdisable(true);

    const res = await fetch(`${apiURL}/temp-images`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        gallery.push(result.data.id);
        setGallery(gallery);

        galleryImage.push(result.data.image_url);
        setGalleryImage(galleryImage);
        setdisable(false);
        e.target.value = "";
      });
  };

  const deleteImage = (image) => {
    const newGallery = galleryImage.filter((gallery) => gallery != image);
    setGalleryImage(newGallery);
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchSizes();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Sản phẩm / Thêm mới</h4>
            <Link to="/admin/products" className="btn btn-primary">
              Quay lại
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>

          {/* Title */}
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Tên sản phẩm
                    </label>
                    <input
                      {...register("title", {
                        required: "Chưa nhập tên sản phẩm!",
                      })}
                      type="text"
                      className={`form-control ${errors.title && "is-invalid"}`}
                      placeholder="Tên sản phẩm"
                    />
                    {errors.title && (
                      <p className="invalid-feedback">
                        {errors.title?.message}
                      </p>
                    )}
                  </div>

                  {/* Categories */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="">
                          Loại sản phẩm
                        </label>
                        <select
                          {...register("category", {
                            required: "Chưa chọn loại sản phẩm!",
                          })}
                          className={`form-control ${errors.category && "is-invalid"}`}
                        >
                          <option value="">Chọn loại sản phẩm</option>
                          {categories &&
                            categories.map((category) => {
                              return (
                                <option
                                  key={`category-${category.id}`}
                                  value={category.id}
                                >
                                  {category.name}
                                </option>
                              );
                            })}
                        </select>
                        {errors.category && (
                          <p className="invalid-feedback">
                            {errors.category?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Brands */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="">
                          Thương hiệu
                        </label>
                        <select
                          {...register("brand", {
                            required: "Chưa chọn thương hiệu!",
                          })}
                          className={`form-control ${errors.brand && "is-invalid"}`}
                        >
                          <option value="">Chọn thương hiệu</option>
                          {brands &&
                            brands.map((brand) => {
                              return (
                                <option
                                  key={`brand-${brand.id}`}
                                  value={brand.id}
                                >
                                  {brand.name}
                                </option>
                              );
                            })}
                        </select>
                        {errors.brand && (
                          <p className="invalid-feedback">
                            {errors.brand?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Short description */}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Mô tả sản phẩm
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Chưa nhập mô tả sản phẩm!",
                      })}
                      className="form-control"
                      placeholder="Mô tả sản phẩm"
                      rows={3}
                    ></textarea>
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Mô tả chi tiết
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {}}
                    />
                  </div>

                  {/* Price */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Giá
                        </label>
                        <input
                          {...register("price", {
                            required: "Chưa nhập số tiền!",
                            valueAsNumber: true,
                          })}
                          className={`form-control ${errors.price && "is-invalid"}`}
                          type="number"
                          placeholder="Giá"
                        />
                        {price && (
                          <small className="text-success">
                            {formatVND(price)}
                          </small>
                        )}
                        {errors.price && (
                          <p className="invalid-feedback">
                            {errors.price?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Discounted price */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Giá niêm yết
                        </label>
                        <input
                          {...register("compare_price", {
                            required: "Chưa nhập số tiền khuyến mãi!",
                          })}
                          className={`form-control ${errors.compare_price && "is-invalid"}`}
                          type="number"
                          placeholder="Giá niêm yết"
                        />
                        {comparePrice && (
                          <small className="text-success">
                            {formatVND(comparePrice)}
                          </small>
                        )}
                        {errors.compare_price && (
                          <p className="invalid-feedback">
                            {errors.compare_price?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SKU */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Mã sản phẩm
                        </label>
                        <input
                          {...register("sku", {
                            required: "Chưa nhập mã sản phẩm!",
                          })}
                          className={`form-control ${errors.sku && "is-invalid"}`}
                          type="text"
                          placeholder="Mã sản phẩm"
                        />
                        {errors.sku && (
                          <p className="invalid-feedback">
                            {errors.sku?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Barcode */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Mã vạch
                        </label>
                        <input
                          {...register("barcode", {
                            required: "Chưa nhập mã vạch!",
                          })}
                          className={`form-control ${errors.barcode && "is-invalid"}`}
                          type="text"
                          placeholder="Mã vạch"
                        />
                        {errors.barcode && (
                          <p className="invalid-feedback">
                            {errors.barcode?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Số lượng
                        </label>
                        <input
                          {...register("quantity", {
                            required: "Chưa nhập số lượng!",
                          })}
                          className={`form-control ${errors.quantity && "is-invalid"}`}
                          type="text"
                          placeholder="Số lượng"
                        />
                        {errors.quantity && (
                          <p className="invalid-feedback">
                            {errors.quantity?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Trạng thái
                        </label>
                        <select
                          {...register("status", {
                            required: "Chưa chọn trạng thái!",
                          })}
                          className={`form-control ${errors.status && "is-invalid"}`}
                        >
                          <option value="">Chọn trạng thái</option>
                          <option value="1">Hoạt động</option>
                          <option value="0">Khóa</option>
                        </select>
                        {errors.status && (
                          <p className="invalid-feedback">
                            {errors.status?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SIZES */}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Kích thước
                    </label>
                    {sizes &&
                      sizes.map((size) => {
                        return (
                          <div
                            className="form-check-inline ps-2"
                            key={`psize-${size.id}`}
                          >
                            <input
                              {...register("sizes")}
                              checked={sizesChecked.includes(size.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSizesChecked([...sizesChecked, size.id]);
                                } else {
                                  setSizesChecked(
                                    sizesChecked.filter(
                                      (sid) => size.id != sid,
                                    ),
                                  );
                                }
                              }}
                              className="form-check-input"
                              type="checkbox"
                              value={size.id}
                              id={`size-${size.id}`}
                            />
                            <label
                              className="form-check-label ps-2"
                              htmlFor="`size-${size.id}`"
                            >
                              {size.name}
                            </label>
                          </div>
                        );
                      })}
                  </div>

                  {/* Is_featured */}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Sản phẩm nổi bật
                    </label>
                    <select
                      {...register("is_featured", {
                        required: "Chưa chọn sản phẩm nổi bật!",
                      })}
                      className={`form-control ${errors.is_featured && "is-invalid"}`}
                    >
                      <option value="1">Có</option>
                      <option value="0">Không</option>
                    </select>
                    {errors.is_featured && (
                      <p className="invalid-feedback">
                        {errors.is_featured?.message}
                      </p>
                    )}
                  </div>

                  {/* Image */}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Hình ảnh
                    </label>
                    <input
                      onChange={handleFile}
                      type="file"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <div className="row">
                      {galleryImage &&
                        galleryImage.map((image, index) => {
                          return (
                            <div className="col-md-3" key={`image-${index}`}>
                              <div className="card shadow">
                                <img src={image} alt="" className="w-100" />
                              </div>
                              <button
                                className="btn btn-danger mt-3 w-100"
                                onClick={() => deleteImage(image)}
                              >
                                Xóa
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3 mb-5"
              >
                Thêm sản phẩm
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;

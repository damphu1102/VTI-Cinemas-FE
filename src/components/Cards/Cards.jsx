import { useEffect, useState } from "react";
import "./card.scss";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Seats } from "../../pages/Booking_Seat/Seats/Seats";
import { Timeout } from "../../pages/Booking_Seat/Timeout/Timeout";
import { Ticket_Detail } from "../../pages/Booking_Seat/Ticket_Detail/Ticket_Detail";
import { Status_Seat } from "../../pages/Booking_Seat/Status_Seat/Status_Seat";
import { Price } from "../../pages/Booking_Seat/Timeout/Price";
import { Checkbox } from "antd";
import { toast } from "react-toastify";

export const CardCarousel = ({ item }) => {
  return (
    <div className="card-content" key={item.id}>
      <div className="card_carousel_img">
        <Link to="#!">
          <div>
            <img src={item.image_url} alt="Image not found" />
          </div>
        </Link>
      </div>
    </div>
  );
};
export const CardMovie = ({ item }) => {
  return (
    <>
      <div className="card__movie">
        <Link to={`/movieinf/${item.movie_id}`}>
          <div>
            <img
              className="card__movie__img"
              src={item.image}
              alt={item.movie_name}
            />
            <h3 className="line-clamp title">{item.movie_name}</h3>
            <p className="line-clamp">{item.description}</p>
            <p>Rating: {item.rating}</p>
          </div>
        </Link>
        {/* Thêm nút Đặt vé */}
        <Link to={`/movieinf/${item.movie_id}`}>
          <button className="book-ticket-button">Xem chi tiết</button>
        </Link>
      </div>
    </>
  );
};

export const CardInfMovie = ({ movie, onBookTicket }) => {
  return (
    <>
      <div className="card__inf">
        <div className="image ">
          <img src={movie.image} alt={movie.movie_name} />
          <div className="showtime">
            {/* Sử dụng callback để mở Modal */}
            <button onClick={() => onBookTicket(movie)}>Đặt vé</button>
          </div>
        </div>

        <div className="row">
          <div className="introduce">
            <h1 className="movie__title">{movie.movie_name}</h1>
            <p>Ngày phát hành: {movie.release_date}</p>
            <p>Thời gian: {movie.duration} phút</p>
            <p>Thể loại: {movie.genre}</p>
            <p>Đạo diễn: {movie.director}</p>
            <p>Diễn viên: {movie.actor}</p>
            <p>Ngôn ngữ: {movie.language}</p>
            <p>Mô tả: {movie.description}</p>
          </div>
        </div>
      </div>

      <div className="trailer">
        <h2>Trailer</h2>
        <iframe
          width="600"
          height="300"
          src={movie.trailer}
          title={movie.movie_name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div className="comment">
        <h2>Gửi đánh giá và bình luận</h2>
        <textarea placeholder="Gửi bình luận ở đây"></textarea>
        <div className="submit">
          <button className="button">Gửi</button>
        </div>
      </div>
    </>
  );
};

export const CardSeats = ({ cinema, date, time }) => {
  const [selectedSeatPrice, setSelectedSeatPrice] = useState(0);
  const [selectSeatName, setSelectSeatName] = useState([]);
  const { movie_id } = useParams();
  const navigate = useNavigate();
  console.log(cinema, date, time);

  const handlePayment = () => {
    if (selectSeatName.length === 0) {
      toast.warning("Vui lòng chọn ghế để tiếp tục");
      return;
    }
    navigate(`/payment/${movie_id}`, {
      state: {
        selectSeatName: selectSeatName,
        selectedSeatPrice: selectedSeatPrice,
        cinema: cinema,
        date: date,
        time: time,
      },
    });
  };

  useEffect(() => {
    localStorage.setItem("timerCount", 600);
  }, []);

  return (
    <>
      <div className="card_seat">
        <div className="status_seat">
          <Status_Seat />
        </div>
        <div className="content_tab">
          <div className="col1">
            <img
              src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1731809663/ic-screen_qsvlrn.png"
              alt="màn chiếu"
            />

            <div className="row_seat">
              <div className="seat">
                <Seats
                  setSelectedSeatPrice={setSelectedSeatPrice}
                  setSelectSeatName={setSelectSeatName}
                />
              </div>
            </div>

            <div className="detail_seat">
              <div className="price">
                <h3>Giá vé</h3>
                <Price price={selectedSeatPrice} />
              </div>

              <div className="timeout">
                <h3>Thời gian</h3>
                <h2>
                  <Timeout />
                </h2>
              </div>
            </div>
          </div>

          <div className="col2">
            <h1>Thông tin vé</h1>
            <div className="detail_movie">
              <Ticket_Detail seat_name={selectSeatName} />
              <button onClick={handlePayment}>Tiếp tục</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const CardPayment = () => {
  const { state } = useLocation();
  const { selectSeatName, selectedSeatPrice, cinema, date, time } = state || {};
  console.log(selectSeatName, selectedSeatPrice, cinema, date, time);

  return (
    <>
      <div className="card_payment">
        <div className="content_tab">
          <div className="col1">
            <h1>Thông tin thanh toán</h1>
            {/*  */}
            <div className="person_inf">
              <div>
                <label htmlFor="">Họ tên:</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Số điện thoại:</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Email:</label>
                <input type="text" />
              </div>
            </div>
            {/*  */}
            <div className="service">
              <h1>COMBO ƯU ĐÃI</h1>
              <div className="lable_service">
                <div>
                  <label htmlFor="">Tên combo: </label>
                </div>
                <div>
                  <label htmlFor="">Mô tả: </label>
                </div>
                <div>
                  <label htmlFor="">Số lượng: </label>
                </div>
              </div>
              <div className="service1">
                <div>
                  <h2>Family Combo 69oz</h2>
                </div>
                <div>
                  <h3>
                    Tiết kiệm 95K! Gồm 2 Bắp (69oz) + 4 Nước có gaz (22oz) + 2
                    Snack Oishi (80g)
                  </h3>
                </div>
                <div>
                  <input type="number" />
                </div>
              </div>
              <div className="service1">
                <div>
                  <h2>Beta Combo 69oz</h2>
                </div>
                <div>
                  <h3>
                    Tiết kiệm 28K! Gồm 1 Bắp (69oz) + 1 Nước có gaz (22oz) + 1
                    Snack Oishi (80g)
                  </h3>
                </div>
                <div>
                  <input type="number" />
                </div>
              </div>
              <div className="service1">
                <div>
                  <h2>Sweet Combo 69oz</h2>
                </div>
                <div>
                  <h3>
                    Tiết kiệm 46K! Gồm 2 Bắp (69oz) + 2 Nước có gaz (22oz) 1
                    Snack Oishi (80g)
                  </h3>
                </div>
                <div>
                  <input type="number" />
                </div>
              </div>
            </div>
            {/*  */}
            <div className="voucher">
              <h1>Giảm giá</h1>
              <span>VTI voucher (Nhấn vào đây để xem danh sách voucher)</span>
              <div className="button">
                <button>Đổi điểm</button>
              </div>
              <div className="code_voucher">
                <label htmlFor="">Mã voucher</label>
                <select name="" id="">
                  <option value="">---</option>
                  <option value="">Mã giảm giá 1</option>
                  <option value="">mã giảm giá 2</option>
                  <option value="">Mã giảm giá 3</option>
                </select>
              </div>
              <div className="point_voucher">
                <div>
                  <label htmlFor="">Điểm hiện có</label>
                  <input type="text" />
                </div>
                <div>
                  <label htmlFor="">Nhập điểm</label>
                  <input type="text" />
                </div>
              </div>
              {/*  */}
              <div className="total_price">
                <div>
                  <p>Tổng tiền:</p>
                  <Price price={selectedSeatPrice} />
                </div>
                <div>
                  <p>Số tiền được giảm: </p>
                </div>
                <div>
                  <p>Số tiền cần thanh toán: </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="payment_method">
              <h1>Phương thức thanh toán</h1>
              <div className="method">
                <div>
                  <img
                    src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1732426727/ic-card-vn_mepuao.png"
                    alt=""
                  />
                  <label htmlFor="">Thẻ nội địa: </label>
                  <Checkbox />
                </div>
                <div>
                  <img
                    src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1732426727/ic-card-gb_o9xkk0.png"
                    alt=""
                  />
                  <label htmlFor="">Thẻ Visa: </label>
                  <Checkbox />
                </div>
                <div>
                  <img
                    src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1732426844/MoMo_Logo_gpdcf9.png"
                    alt=""
                  />
                  <label htmlFor="">Ví MOMO</label>

                  <Checkbox />
                </div>
              </div>
            </div>
            {/*  */}
            <div className="time_out">
              <div>
                <span>Vui lòng kiểm tra lại thông tin</span> <br /> <br />
                <span>* Vé mua rồi không trả lại được dưới mọi hình thức</span>
              </div>

              <div>
                <h2>Thời gian còn lại: </h2>
                <Timeout />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="col2">
            <h1>Thông tin vé</h1>
            <div className="detail_movie">
              <Ticket_Detail seat_name={selectSeatName} />
              <Link to="/payment">
                <button>Tiếp tục</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
